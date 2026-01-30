export interface Theme {
  id: string;
  name: string;
  emoji: string;
  bgColor: string;
  bgGradient?: string;
  textPrimary: string;
  textSecondary: string;
  accentColor: string;
  borderColor: string;
  fontFamily: string;
  glowEffect?: string;
}

export const themes: readonly Theme[] = [
  {
    id: 'ink-smoke',
    name: '水墨云烟',
    emoji: '🍵',
    bgColor: '#F7F7F2',
    bgGradient: 'linear-gradient(to bottom, #F7F7F2, #E5E5E0)',
    textPrimary: '#2C2C2C',
    textSecondary: '#4A4A4A',
    accentColor: '#B22222',
    borderColor: '#D4D4D4',
    fontFamily: '"Noto Serif SC", "Songti SC", "SimSun", serif',
  },
  {
    id: 'lucky-red',
    name: '红运当头',
    emoji: '🧧',
    bgColor: '#C41E3A',
    bgGradient: 'linear-gradient(135deg, #C41E3A, #8B0000)',
    textPrimary: '#FFD700',
    textSecondary: '#FFFFFF',
    accentColor: '#FFD700',
    borderColor: '#FFD700',
    fontFamily: '"Noto Sans SC", "Microsoft YaHei", "PingFang SC", sans-serif',
  },
  {
    id: 'cyber-taoist',
    name: '赛博修仙',
    emoji: '⚡',
    bgColor: '#0F172A',
    textPrimary: '#00FFFF',
    textSecondary: '#94A3B8',
    accentColor: '#FF00FF',
    borderColor: '#00FFFF',
    fontFamily: '"Noto Sans SC", "Microsoft YaHei", sans-serif',
    glowEffect: '0 0 10px currentColor',
  },
  {
    id: 'retro-shanghai',
    name: '复古画报',
    emoji: '🔔',
    bgColor: '#F0E6D2',
    textPrimary: '#1E3A8A',
    textSecondary: '#4A4A4A',
    accentColor: '#8B4513',
    borderColor: '#C4A574',
    fontFamily: '"Noto Sans SC", "Microsoft YaHei", Impact, sans-serif',
  },
  {
    id: 'bamboo-green',
    name: '竹林清风',
    emoji: '🌱',
    bgColor: '#F0FFF4',
    bgGradient: 'linear-gradient(to bottom, #FFFFFF, #F0FFF4)',
    textPrimary: '#14532D',
    textSecondary: '#166534',
    accentColor: '#22C55E',
    borderColor: '#86EFAC',
    fontFamily: '"Noto Sans SC", "Microsoft YaHei", "PingFang SC", sans-serif',
  },
];

export const defaultTheme = themes[0];
