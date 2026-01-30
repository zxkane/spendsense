'use client'

import { forwardRef, useMemo } from 'react'
import ReactMarkdown from 'react-markdown'
import { themes } from '@/lib/themes'

interface PreviewCardProps {
  markdown: string
  themeId: string
}

function getBackgroundStyle(background: string): React.CSSProperties {
  if (background.includes('gradient')) {
    return { background }
  }
  return { backgroundColor: background }
}

export const PreviewCard = forwardRef<HTMLDivElement, PreviewCardProps>(
  function PreviewCard({ markdown, themeId }, ref) {
    const theme = useMemo(() => {
      const found = themes.find((t) => t.id === themeId)
      if (!found) {
        console.warn(
          `Theme with id "${themeId}" not found. Falling back to default theme "${themes[0].id}".`
        )
        return themes[0]
      }
      return found
    }, [themeId])

    // Fresh date on each render to avoid stale dates on exported cards
    const today = new Date().toISOString().split('T')[0]

    const isGlowTheme = themeId === 'cyber-taoist'

    const glowTextShadow = isGlowTheme
      ? `0 0 10px ${theme.styles.textPrimary}`
      : undefined
    const glowTextShadowSmall = isGlowTheme
      ? `0 0 8px ${theme.styles.textPrimary}`
      : undefined

    return (
      <div
        ref={ref}
        data-testid="preview-card"
        className="w-full max-w-md rounded-xl p-8 shadow-lg"
        style={{
          ...getBackgroundStyle(theme.styles.background),
          borderWidth: theme.styles.border !== 'transparent' ? '2px' : '0',
          borderStyle: 'solid',
          borderColor: theme.styles.border,
          fontFamily: theme.styles.fontFamily,
          boxShadow: isGlowTheme
            ? `0 0 20px ${theme.styles.border}40, inset 0 0 20px ${theme.styles.border}10`
            : undefined,
        }}
      >
        <div
          className="prose prose-sm max-w-none"
          style={{
            '--tw-prose-body': theme.styles.textSecondary,
            '--tw-prose-headings': theme.styles.textPrimary,
            '--tw-prose-bold': theme.styles.textPrimary,
            '--tw-prose-bullets': theme.styles.accent,
            '--tw-prose-quotes': theme.styles.textSecondary,
            '--tw-prose-code': theme.styles.accent,
          } as React.CSSProperties}
        >
          <ReactMarkdown
            components={{
              h1: ({ children }) => (
                <h1
                  style={{
                    color: theme.styles.textPrimary,
                    fontFamily: theme.styles.headingFontFamily,
                    textShadow: glowTextShadow,
                  }}
                  className="text-2xl font-bold mb-4"
                >
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2
                  style={{
                    color: theme.styles.textPrimary,
                    fontFamily: theme.styles.headingFontFamily,
                    textShadow: glowTextShadowSmall,
                  }}
                  className="text-xl font-semibold mb-3"
                >
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3
                  style={{
                    color: theme.styles.textPrimary,
                    fontFamily: theme.styles.headingFontFamily,
                  }}
                  className="text-lg font-semibold mb-2"
                >
                  {children}
                </h3>
              ),
              p: ({ children }) => (
                <p style={{ color: theme.styles.textSecondary }} className="mb-3">
                  {children}
                </p>
              ),
              strong: ({ children }) => (
                <strong style={{ color: theme.styles.textPrimary }}>{children}</strong>
              ),
              em: ({ children }) => (
                <em style={{ color: theme.styles.textSecondary }}>{children}</em>
              ),
              blockquote: ({ children }) => (
                <blockquote
                  style={{
                    borderLeftColor: theme.styles.accent,
                    color: theme.styles.textSecondary,
                  }}
                  className="border-l-4 pl-4 italic my-4"
                >
                  {children}
                </blockquote>
              ),
              ul: ({ children }) => (
                <ul className="list-disc pl-5 mb-4 space-y-1">{children}</ul>
              ),
              li: ({ children }) => (
                <li style={{ color: theme.styles.textSecondary }}>{children}</li>
              ),
              code: ({ children }) => (
                <code
                  style={{
                    color: theme.styles.accent,
                    backgroundColor:
                      themeId === 'cyber-taoist' ? '#1A1F35' : 'rgba(0,0,0,0.05)',
                  }}
                  className="px-1.5 py-0.5 rounded text-sm font-mono"
                >
                  {children}
                </code>
              ),
            }}
          >
            {markdown}
          </ReactMarkdown>
        </div>

        {/* Footer */}
        <div
          className="mt-6 pt-4 flex items-center justify-between text-xs"
          style={{
            borderTopWidth: '1px',
            borderTopStyle: 'solid',
            borderTopColor:
              theme.styles.border !== 'transparent'
                ? theme.styles.border
                : theme.styles.textSecondary + '30',
            color: theme.styles.textSecondary,
            opacity: 0.7,
          }}
        >
          <span>{today}</span>
          <span>墨卡 · 由 AI 驱动</span>
        </div>
      </div>
    )
  }
)
