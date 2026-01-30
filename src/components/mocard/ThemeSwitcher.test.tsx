import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeSwitcher } from './ThemeSwitcher';
import { themes, defaultTheme } from './themes';

describe('ThemeSwitcher', () => {
  it('should render all 5 theme buttons', () => {
    const onThemeChange = vi.fn();
    render(<ThemeSwitcher currentTheme={defaultTheme} onThemeChange={onThemeChange} />);

    themes.forEach(theme => {
      expect(screen.getByTestId(`theme-btn-${theme.id}`)).toBeInTheDocument();
    });
  });

  it('should display theme names in Chinese', () => {
    const onThemeChange = vi.fn();
    render(<ThemeSwitcher currentTheme={defaultTheme} onThemeChange={onThemeChange} />);

    expect(screen.getByText('水墨云烟')).toBeInTheDocument();
    expect(screen.getByText('红运当头')).toBeInTheDocument();
    expect(screen.getByText('赛博修仙')).toBeInTheDocument();
    expect(screen.getByText('复古画报')).toBeInTheDocument();
    expect(screen.getByText('竹林清风')).toBeInTheDocument();
  });

  it('should display theme emojis', () => {
    const onThemeChange = vi.fn();
    render(<ThemeSwitcher currentTheme={defaultTheme} onThemeChange={onThemeChange} />);

    expect(screen.getByText('🍵')).toBeInTheDocument();
    expect(screen.getByText('🧧')).toBeInTheDocument();
    expect(screen.getByText('⚡')).toBeInTheDocument();
    expect(screen.getByText('🔔')).toBeInTheDocument();
    expect(screen.getByText('🌱')).toBeInTheDocument();
  });

  it('should call onThemeChange when a theme is clicked', () => {
    const onThemeChange = vi.fn();
    render(<ThemeSwitcher currentTheme={defaultTheme} onThemeChange={onThemeChange} />);

    const luckyRedBtn = screen.getByTestId('theme-btn-lucky-red');
    fireEvent.click(luckyRedBtn);

    expect(onThemeChange).toHaveBeenCalledTimes(1);
    expect(onThemeChange).toHaveBeenCalledWith(
      expect.objectContaining({ id: 'lucky-red' })
    );
  });

  it('should highlight current theme with ring', () => {
    const onThemeChange = vi.fn();
    render(<ThemeSwitcher currentTheme={defaultTheme} onThemeChange={onThemeChange} />);

    const currentThemeBtn = screen.getByTestId(`theme-btn-${defaultTheme.id}`);
    expect(currentThemeBtn.className).toContain('ring-2');
  });

  it('should apply correct background color to each theme button', () => {
    const onThemeChange = vi.fn();
    render(<ThemeSwitcher currentTheme={defaultTheme} onThemeChange={onThemeChange} />);

    themes.forEach(theme => {
      const btn = screen.getByTestId(`theme-btn-${theme.id}`);
      expect(btn).toHaveStyle({ backgroundColor: theme.bgColor });
    });
  });
});
