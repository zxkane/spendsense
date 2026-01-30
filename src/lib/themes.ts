export interface Theme {
  id: string
  name: string
  nameEn: string
  description: string
  styles: {
    background: string
    textPrimary: string
    textSecondary: string
    accent: string
    border: string
    fontFamily: string
    headingFontFamily: string
  }
  demoText: string
}

export const themes: Theme[] = [
  {
    id: 'ink-smoke',
    name: '水墨云烟',
    nameEn: 'ink-smoke',
    description: '极简、留白、禅意',
    styles: {
      background: 'linear-gradient(to bottom, #F7F7F2, #E5E5E0)',
      textPrimary: '#2C2C2C',
      textSecondary: '#4A4A4A',
      accent: '#B22222',
      border: '#D4D4D4',
      fontFamily: '"Noto Serif SC", "Songti SC", serif',
      headingFontFamily: '"Noto Serif SC", "Songti SC", serif',
    },
    demoText: '代码如诗 🍵',
  },
  {
    id: 'lucky-red',
    name: '红运当头',
    nameEn: 'lucky-red',
    description: '喜庆、庄重、力量',
    styles: {
      background: 'linear-gradient(135deg, #C41E3A, #8B0000)',
      textPrimary: '#FFD700',
      textSecondary: '#FFFFFF',
      accent: '#FFD700',
      border: '#FFD700',
      fontFamily: '"Noto Sans SC", sans-serif',
      headingFontFamily: '"Noto Sans SC", sans-serif',
    },
    demoText: '🚀 v1.0 正式上线',
  },
  {
    id: 'cyber-taoist',
    name: '赛博修仙',
    nameEn: 'cyber-taoist',
    description: '未来感、故障艺术',
    styles: {
      background: '#0F172A',
      textPrimary: '#00FFFF',
      textSecondary: '#FFFFFF',
      accent: '#FF00FF',
      border: '#00FFFF',
      fontFamily: '"JetBrains Mono", "Noto Sans SC", monospace',
      headingFontFamily: '"Noto Serif SC", serif',
    },
    demoText: '⚡ 赛博修仙指南',
  },
  {
    id: 'retro-shanghai',
    name: '复古画报',
    nameEn: 'retro-shanghai',
    description: '怀旧、粗犷、海报感',
    styles: {
      background: '#F0E6D2',
      textPrimary: '#1E3A8A',
      textSecondary: '#333333',
      accent: '#8B4513',
      border: '#1E3A8A',
      fontFamily: '"Noto Sans SC", sans-serif',
      headingFontFamily: '"Noto Sans SC", sans-serif',
    },
    demoText: '🔔 紧急通知',
  },
  {
    id: 'bamboo-green',
    name: '竹林清风',
    nameEn: 'bamboo-green',
    description: '清新、自然、成长',
    styles: {
      background: 'linear-gradient(to bottom, #F0FFF4, #E6F7ED)',
      textPrimary: '#14532D',
      textSecondary: '#166534',
      accent: '#22C55E',
      border: 'transparent',
      fontFamily: '"Noto Serif SC", serif',
      headingFontFamily: '"Noto Serif SC", serif',
    },
    demoText: '🌱 每日一题：递归',
  },
]

export const defaultMarkdown = `# 🎨 欢迎使用墨卡

> 让文字，变成艺术

### 功能特性
- **实时预览** - 所见即所得
- **国风主题** - 水墨、故宫、赛博修仙...
- **一键导出** - 下载高清 PNG 图片

*墨卡 · 由 AI 驱动*`
