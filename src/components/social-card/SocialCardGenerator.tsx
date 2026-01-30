'use client'

import { useState, useRef, useCallback } from 'react'
import { Download, X } from 'lucide-react'
import { toPng } from 'html-to-image'

import { MarkdownEditor } from './MarkdownEditor'
import { ThemeSelector } from './ThemeSelector'
import { PreviewCard } from './PreviewCard'
import { defaultMarkdown } from '@/lib/themes'

export function SocialCardGenerator() {
  const [markdown, setMarkdown] = useState(defaultMarkdown)
  const [themeId, setThemeId] = useState('ink-smoke')
  const [isExporting, setIsExporting] = useState(false)
  const [exportError, setExportError] = useState<string | null>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleExport = useCallback(async () => {
    if (!cardRef.current) return

    setIsExporting(true)
    setExportError(null)
    try {
      const dataUrl = await toPng(cardRef.current, {
        cacheBust: true,
        pixelRatio: 2,
      })

      const link = document.createElement('a')
      link.download = `mocard-${Date.now()}.png`
      link.href = dataUrl
      link.click()
    } catch (err) {
      console.error('Export failed:', err)
      setExportError('导出失败，请重试或尝试简化卡片内容')
    } finally {
      setIsExporting(false)
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#F7F7F2]">
      {/* Header */}
      <header className="border-b border-zinc-200 bg-[#F7F7F2]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-zinc-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-serif text-lg">墨</span>
            </div>
            <span className="text-lg font-semibold text-zinc-800">墨卡 MoCard</span>
          </div>
          <nav className="flex items-center gap-8">
            <a href="#features" className="text-sm text-zinc-600 hover:text-zinc-900">
              功能特性
            </a>
            <a href="#themes" className="text-sm text-zinc-600 hover:text-zinc-900">
              主题风格
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 text-sm text-[#B22222] bg-white border border-zinc-200 rounded-full mb-4">
            ✨ 让文字，变成艺术
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4 font-serif">
            将 Markdown 转化为精美社交卡片
          </h1>
          <p className="text-lg text-zinc-600">
            实时预览 · 中国风主题 · 一键导出高清 PNG
          </p>
        </div>

        {/* Theme Selector */}
        <div id="themes" className="mb-6">
          <h2 className="text-sm font-semibold text-zinc-800 mb-3">选择主题</h2>
          <ThemeSelector selectedTheme={themeId} onThemeChange={setThemeId} />
        </div>

        {/* Editor and Preview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white rounded-2xl border border-zinc-200 p-6 shadow-sm">
          {/* Editor Pane */}
          <div className="min-h-[500px] bg-zinc-50 rounded-xl p-4">
            <MarkdownEditor value={markdown} onChange={setMarkdown} />
          </div>

          {/* Preview Pane */}
          <div className="flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-zinc-800">卡片预览</h2>
              <div className="flex items-center gap-2">
                {exportError && (
                  <div
                    data-testid="export-error"
                    className="flex items-center gap-1 text-red-600 text-sm"
                  >
                    <span>{exportError}</span>
                    <button
                      onClick={() => setExportError(null)}
                      className="p-0.5 hover:bg-red-100 rounded"
                      aria-label="关闭错误提示"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                <button
                  data-testid="download-btn"
                  onClick={handleExport}
                  disabled={isExporting}
                  className="flex items-center gap-2 px-4 py-2 bg-zinc-900 text-white text-sm rounded-lg hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Download className="w-4 h-4" />
                  {isExporting ? '导出中...' : '下载 PNG'}
                </button>
              </div>
            </div>
            <div className="flex-1 flex items-center justify-center bg-zinc-100 rounded-xl p-6">
              <PreviewCard ref={cardRef} markdown={markdown} themeId={themeId} />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 bg-zinc-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-md flex items-center justify-center">
                  <span className="text-zinc-900 font-serif">墨</span>
                </div>
                <span className="font-semibold">墨卡 MoCard</span>
              </div>
              <p className="text-sm text-zinc-400 max-w-xs">
                让文字，变成艺术。
                <br />
                将 Markdown 转化为精美社交卡片。
              </p>
            </div>
            <div className="flex gap-16">
              <div>
                <h3 className="text-xs font-semibold text-white mb-4 tracking-wider">
                  产品
                </h3>
                <ul className="space-y-2 text-sm text-zinc-400">
                  <li>
                    <a href="#" className="hover:text-white">
                      功能特性
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      主题风格
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xs font-semibold text-white mb-4 tracking-wider">
                  资源
                </h3>
                <ul className="space-y-2 text-sm text-zinc-400">
                  <li>
                    <a href="#" className="hover:text-white">
                      使用文档
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-white">
                      GitHub
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-6 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
            <span>© 2026 墨卡 MoCard. 由 AI 驱动.</span>
            <span>Made with ❤️ for developers</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
