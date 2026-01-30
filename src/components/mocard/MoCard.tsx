'use client';

import { useState, useRef, useCallback } from 'react';
import { Download } from 'lucide-react';
import { toPng } from 'html-to-image';
import { ThemeSwitcher } from './ThemeSwitcher';
import { MarkdownPreview } from './MarkdownPreview';
import { defaultTheme, type Theme } from './themes';

const DEFAULT_MARKDOWN = `# 🎨 欢迎使用墨卡

> 让文字，变成艺术

### 功能特性
- **实时预览** - 所见即所得
- **国风主题** - 水墨、故宫、赛博修仙...
- **一键导出** - 下载高清 PNG 图片

*墨卡 · 由 AI 驱动*`;

export function MoCard() {
  const [markdown, setMarkdown] = useState(DEFAULT_MARKDOWN);
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [isExporting, setIsExporting] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const handleExport = useCallback(async () => {
    if (!previewRef.current) return;

    setIsExporting(true);
    try {
      const dataUrl = await toPng(previewRef.current, {
        quality: 1,
        pixelRatio: 2,
      });

      const link = document.createElement('a');
      link.download = `mocard-${theme.id}-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  }, [theme.id]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gray-900 rounded-md" />
            <span className="text-xl font-bold text-gray-900">墨卡</span>
            <span className="text-sm text-gray-500">MoCard</span>
          </div>
          <span className="text-sm text-gray-400">让文字，变成艺术</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-8">
        <div className="flex gap-8 h-[calc(100vh-140px)]">
          {/* Editor Panel */}
          <div className="w-[480px] flex-shrink-0 bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-6">
            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-4">
                Markdown 编辑器
              </h2>
              <textarea
                data-testid="markdown-input"
                value={markdown}
                onChange={(e) => setMarkdown(e.target.value)}
                className="w-full h-64 p-4 bg-gray-50 border border-gray-200 rounded-lg resize-none font-mono text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="输入 Markdown 内容..."
              />
            </div>

            <div>
              <h2 className="text-base font-semibold text-gray-900 mb-4">
                选择主题风格
              </h2>
              <ThemeSwitcher currentTheme={theme} onThemeChange={setTheme} />
            </div>
          </div>

          {/* Preview Panel */}
          <div className="flex-1 bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-4">
            <h2 className="text-base font-semibold text-gray-900">
              实时预览
            </h2>

            <div ref={previewRef} className="flex-1 min-h-0">
              <MarkdownPreview content={markdown} theme={theme} />
            </div>

            <button
              data-testid="download-btn"
              onClick={handleExport}
              disabled={isExporting}
              className="w-full py-3 bg-gray-900 text-white rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-5 h-5" />
              {isExporting ? '导出中...' : '下载 PNG'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
