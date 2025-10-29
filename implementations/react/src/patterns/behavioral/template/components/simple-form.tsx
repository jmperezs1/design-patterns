import React, { useState } from "react";
import type { FormTemplate } from "../abstract-class";

type Field = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
};

export function SimpleForm({
  flow,
  fields,
  title,
}: {
  flow: FormTemplate;
  fields: Field[];
  title: string;
}) {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );
  const [message, setMessage] = useState<string>("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");

    try {
      const msg = await flow.submit(formData); // <- TEMPLATE METHOD
      setMessage(msg);
      setStatus("done");
    } catch (err) {
      setMessage((err as Error).message);
      setStatus("error");
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      style={{
        width: "100%",
        maxWidth: 360,
        border: "1px solid #ddd",
        borderRadius: "12px",
        padding: "16px",
        display: "grid",
        gap: "12px",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <h2 style={{ margin: 0, fontSize: "1rem", fontWeight: 600 }}>
        {title}
      </h2>

      {fields.map((field) => (
        <label
          key={field.name}
          style={{
            display: "grid",
            gap: "4px",
            fontSize: ".8rem",
            fontWeight: 500,
          }}
        >
          <span>{field.label}</span>
          <input
            type={field.type ?? "text"}
            placeholder={field.placeholder ?? ""}
            value={formData[field.name] ?? ""}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                [field.name]: e.target.value,
              }))
            }
            style={{
              borderRadius: "8px",
              border: "1px solid #ccc",
              fontSize: ".8rem",
              padding: "8px 10px",
            }}
          />
        </label>
      ))}

      <button
        disabled={status === "loading"}
        style={{
          cursor: status === "loading" ? "default" : "pointer",
          backgroundColor: "black",
          color: "white",
          border: "none",
          borderRadius: "8px",
          padding: "8px 10px",
          fontSize: ".8rem",
          fontWeight: 500,
        }}
      >
        {status === "loading" ? "Submitting..." : "Submit"}
      </button>

      {status === "error" && (
        <div style={{ color: "crimson", fontSize: ".75rem" }}>{message}</div>
      )}

      {status === "done" && (
        <div
          style={{
            background: "#f6f6f6",
            borderRadius: "8px",
            padding: "8px 10px",
            fontSize: ".75rem",
            lineHeight: 1.4,
          }}
        >
          <strong>Success:</strong>
          <div>{message}</div>
        </div>
      )}
    </form>
  );
}
