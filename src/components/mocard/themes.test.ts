import { describe, it, expect } from 'vitest';
import { themes, defaultTheme } from './themes';

describe('themes', () => {
  it('should have exactly 5 themes', () => {
    expect(themes).toHaveLength(5);
  });

  it('should have all required theme IDs', () => {
    const themeIds = themes.map(t => t.id);
    expect(themeIds).toContain('ink-smoke');
    expect(themeIds).toContain('lucky-red');
    expect(themeIds).toContain('cyber-taoist');
    expect(themeIds).toContain('retro-shanghai');
    expect(themeIds).toContain('bamboo-green');
  });

  it('should have correct ink-smoke theme colors', () => {
    const inkSmoke = themes.find(t => t.id === 'ink-smoke');
    expect(inkSmoke).toBeDefined();
    expect(inkSmoke?.bgColor).toBe('#F7F7F2');
    expect(inkSmoke?.textPrimary).toBe('#2C2C2C');
    expect(inkSmoke?.accentColor).toBe('#B22222');
  });

  it('should have correct lucky-red theme colors', () => {
    const luckyRed = themes.find(t => t.id === 'lucky-red');
    expect(luckyRed).toBeDefined();
    expect(luckyRed?.bgColor).toBe('#C41E3A');
    expect(luckyRed?.textPrimary).toBe('#FFD700');
  });

  it('should have correct cyber-taoist theme with glow effect', () => {
    const cyberTaoist = themes.find(t => t.id === 'cyber-taoist');
    expect(cyberTaoist).toBeDefined();
    expect(cyberTaoist?.bgColor).toBe('#0F172A');
    expect(cyberTaoist?.textPrimary).toBe('#00FFFF');
    expect(cyberTaoist?.glowEffect).toBeDefined();
  });

  it('should have correct retro-shanghai theme colors', () => {
    const retroShanghai = themes.find(t => t.id === 'retro-shanghai');
    expect(retroShanghai).toBeDefined();
    expect(retroShanghai?.bgColor).toBe('#F0E6D2');
    expect(retroShanghai?.textPrimary).toBe('#1E3A8A');
  });

  it('should have correct bamboo-green theme colors', () => {
    const bambooGreen = themes.find(t => t.id === 'bamboo-green');
    expect(bambooGreen).toBeDefined();
    expect(bambooGreen?.bgColor).toBe('#F0FFF4');
    expect(bambooGreen?.textPrimary).toBe('#14532D');
  });

  it('should have defaultTheme as ink-smoke', () => {
    expect(defaultTheme.id).toBe('ink-smoke');
  });

  it('all themes should have required properties', () => {
    themes.forEach(theme => {
      expect(theme.id).toBeDefined();
      expect(theme.name).toBeDefined();
      expect(theme.emoji).toBeDefined();
      expect(theme.bgColor).toBeDefined();
      expect(theme.textPrimary).toBeDefined();
      expect(theme.textSecondary).toBeDefined();
      expect(theme.accentColor).toBeDefined();
      expect(theme.borderColor).toBeDefined();
      expect(theme.fontFamily).toBeDefined();
    });
  });

  it('all themes should have Chinese names', () => {
    const chineseNames = ['水墨云烟', '红运当头', '赛博修仙', '复古画报', '竹林清风'];
    themes.forEach(theme => {
      expect(chineseNames).toContain(theme.name);
    });
  });
});
