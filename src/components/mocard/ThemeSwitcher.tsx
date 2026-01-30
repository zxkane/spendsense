'use client';

import { themes, type Theme } from './themes';

interface ThemeSwitcherProps {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
}

function getThemeBorder(theme: Theme): string {
  switch (theme.id) {
    case 'lucky-red':
      return `2px solid ${theme.borderColor}`;
    case 'cyber-taoist':
      return `1px solid ${theme.borderColor}`;
    default:
      return 'none';
  }
}

export function ThemeSwitcher({ currentTheme, onThemeChange }: ThemeSwitcherProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {themes.map((theme) => (
        <button
          key={theme.id}
          data-testid={`theme-btn-${theme.id}`}
          onClick={() => onThemeChange(theme)}
          className={`
            flex flex-col items-center justify-center
            w-20 h-16 rounded-lg
            transition-all duration-200
            hover:scale-105
            ${currentTheme.id === theme.id ? 'ring-2 ring-offset-2 ring-gray-900' : ''}
          `}
          style={{
            backgroundColor: theme.bgColor,
            color: theme.textPrimary,
            border: getThemeBorder(theme),
          }}
        >
          <span className="text-xl">{theme.emoji}</span>
          <span
            className="text-[10px] font-medium mt-1"
            style={{ color: theme.textPrimary }}
          >
            {theme.name}
          </span>
        </button>
      ))}
    </div>
  );
}
