'use client'

import { cn } from '@/lib/utils'
import { themes } from '@/lib/themes'

interface ThemeSelectorProps {
  selectedTheme: string
  onThemeChange: (themeId: string) => void
}

export function ThemeSelector({ selectedTheme, onThemeChange }: ThemeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {themes.map((theme) => {
        const isSelected = selectedTheme === theme.id
        return (
          <button
            key={theme.id}
            data-testid={`theme-btn-${theme.id}`}
            onClick={() => onThemeChange(theme.id)}
            className={cn(
              'px-3 py-2 text-sm rounded-lg border transition-all',
              isSelected
                ? 'border-zinc-900 bg-zinc-900 text-white'
                : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-400'
            )}
          >
            {theme.name}
          </button>
        )
      })}
    </div>
  )
}
