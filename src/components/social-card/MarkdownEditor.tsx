'use client'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
}

export function MarkdownEditor({ value, onChange }: MarkdownEditorProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-zinc-800">Markdown 编辑器</h2>
        <span className="text-xs px-2 py-1 bg-zinc-200 rounded text-zinc-600">
          支持 Markdown
        </span>
      </div>
      <textarea
        data-testid="markdown-input"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="flex-1 w-full p-4 font-mono text-sm bg-white border border-zinc-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-zinc-400"
        placeholder="输入 Markdown 内容..."
      />
    </div>
  )
}
