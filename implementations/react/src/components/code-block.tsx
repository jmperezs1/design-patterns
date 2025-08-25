export function CodeBlock({ code, title = 'factory.tsx' }: { code: string; title?: string }) {
  return (
    <div className="rounded-xl border bg-zinc-950 text-zinc-100">
      <div className="flex items-center justify-between border-b border-zinc-800 px-3 py-2">
        <span className="text-xs font-medium">{title}</span>
      </div>
      <pre className="overflow-x-auto p-4 text-xs leading-relaxed">
        <code>{code}</code>
      </pre>
    </div>
  )
}
