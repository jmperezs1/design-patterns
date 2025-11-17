import React from "react";

/**
 * Representa el producto construido por el Builder: una tarjeta configurable.
 * Todas las propiedades son opcionales y pueden establecerse de forma incremental
 * mediante el `CardBuilder`.
 */
export type CardProduct = {
  title?: string;
  subtitle?: string;
  mediaUrl?: string;
  body?: React.ReactNode;
  footer?: React.ReactNode;
};

/**
 * Componente visual de tarjeta que renderiza un `CardProduct`.
 *
 * No aplica lógica de construcción; únicamente presenta las propiedades
 * recibidas con un estilo básico.
 */
export const Card: React.FC<CardProduct> = ({
  title,
  subtitle,
  mediaUrl,
  body,
  footer,
}) => {
  return (
    <div
      style={{
        border: "1px solid #e5e7eb",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 1px 3px rgba(0,0,0,.06)",
        background: "white",
        minWidth: 280,
      }}
    >
      {mediaUrl && (
        <img
          src={mediaUrl}
          alt=""
          style={{ width: "100%", height: 160, objectFit: "cover" }}
        />
      )}

      {(title || subtitle) && (
        <div style={{ padding: 12 }}>
          {title && <div style={{ fontWeight: 700 }}>{title}</div>}
          {subtitle && (
            <div style={{ color: "#6b7280", fontSize: 13, marginTop: 2 }}>
              {subtitle}
            </div>
          )}
        </div>
      )}

      {body && <div style={{ padding: 12 }}>{body}</div>}

      {footer && (
        <div style={{ borderTop: "1px solid #e5e7eb", padding: 12 }}>
          {footer}
        </div>
      )}
    </div>
  );
};