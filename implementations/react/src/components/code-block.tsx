import { Editor } from "@monaco-editor/react";

export function CodeBlock({ code, title = 'factory.tsx' }: { code: string; title?: string }) {
  return (
    <div className="rounded-xl border bg-zinc-950 text-zinc-100 w-full">
      <div className="flex items-center justify-between border-b border-zinc-800 px-3 py-2">
        <span className="text-xs font-medium">{title}</span>
      </div>
      <pre className="overflow-x-auto p-4 text-xs leading-relaxed">
        <Editor theme="vs-dark" value={code} language="javascript" options={{ readOnly: true }} height="90vh"  />
      </pre>
    </div>
  )
}
