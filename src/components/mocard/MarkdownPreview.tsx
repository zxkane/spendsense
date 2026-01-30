'use client';

import { type Theme } from './themes';
import Markdown from 'react-markdown';

interface MarkdownPreviewProps {
  content: string;
  theme: Theme;
}

export function MarkdownPreview({ content, theme }: MarkdownPreviewProps) {
  const today = new Date().toISOString().split('T')[0];

  const headingStyle = {
    color: theme.textPrimary,
    fontFamily: theme.fontFamily,
    textShadow: theme.glowEffect,
  };

  const codeBackgroundColor = theme.id === 'cyber-taoist' ? '#1E293B' : 'rgba(0,0,0,0.05)';
  const footerTextStyle = { color: theme.textSecondary, opacity: 0.7 };

  return (
    <div
      data-testid="preview-card"
      className="flex flex-col justify-between h-full rounded-xl p-8 overflow-hidden"
      style={{
        background: theme.bgGradient || theme.bgColor,
        fontFamily: theme.fontFamily,
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      }}
    >
      <div
        className="prose prose-sm max-w-none flex-1 overflow-auto"
        style={{
          '--tw-prose-body': theme.textSecondary,
          '--tw-prose-headings': theme.textPrimary,
          '--tw-prose-bold': theme.textPrimary,
          '--tw-prose-quotes': theme.textSecondary,
          '--tw-prose-quote-borders': theme.accentColor,
          '--tw-prose-code': theme.accentColor,
          '--tw-prose-bullets': theme.accentColor,
          '--tw-prose-counters': theme.accentColor,
          textShadow: theme.glowEffect || 'none',
        } as React.CSSProperties}
      >
        <Markdown
          components={{
            h1: ({ children }) => <h1 style={headingStyle}>{children}</h1>,
            h2: ({ children }) => <h2 style={headingStyle}>{children}</h2>,
            h3: ({ children }) => <h3 style={headingStyle}>{children}</h3>,
            p: ({ children }) => (
              <p style={{ color: theme.textSecondary }}>{children}</p>
            ),
            strong: ({ children }) => (
              <strong style={{ color: theme.textPrimary }}>{children}</strong>
            ),
            em: ({ children }) => (
              <em style={{ color: theme.textSecondary }}>{children}</em>
            ),
            blockquote: ({ children }) => (
              <blockquote
                style={{
                  borderLeftColor: theme.accentColor,
                  color: theme.textSecondary,
                }}
              >
                {children}
              </blockquote>
            ),
            ul: ({ children }) => (
              <ul style={{ color: theme.textSecondary }}>{children}</ul>
            ),
            ol: ({ children }) => (
              <ol style={{ color: theme.textSecondary }}>{children}</ol>
            ),
            li: ({ children }) => (
              <li style={{ color: theme.textSecondary }}>{children}</li>
            ),
            code: ({ children, className }) => {
              const isBlock = className?.includes('language-');
              if (isBlock) {
                return (
                  <code
                    className={className}
                    style={{
                      backgroundColor: codeBackgroundColor,
                      color: theme.accentColor,
                      display: 'block',
                      padding: '1rem',
                      borderRadius: '0.5rem',
                      overflowX: 'auto',
                    }}
                  >
                    {children}
                  </code>
                );
              }
              return (
                <code
                  style={{
                    backgroundColor: codeBackgroundColor,
                    color: theme.accentColor,
                    padding: '0.2rem 0.4rem',
                    borderRadius: '0.25rem',
                  }}
                >
                  {children}
                </code>
              );
            },
          }}
        >
          {content}
        </Markdown>
      </div>

      <div
        className="flex justify-between items-center pt-4 mt-4"
        style={{ borderTop: `1px solid ${theme.borderColor}` }}
      >
        <span className="text-xs" style={footerTextStyle}>
          {today}
        </span>
        <span className="text-xs" style={footerTextStyle}>
          墨卡 · 由 AI 驱动
        </span>
      </div>
    </div>
  );
}
