import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MarkdownPreview } from './MarkdownPreview';
import { themes } from './themes';

describe('MarkdownPreview', () => {
  const defaultTheme = themes[0]; // ink-smoke

  describe('Basic Rendering', () => {
    it('should render preview card with test id', () => {
      render(<MarkdownPreview content="Test" theme={defaultTheme} />);
      expect(screen.getByTestId('preview-card')).toBeInTheDocument();
    });

    it('should render markdown content', () => {
      render(<MarkdownPreview content="# Hello World" theme={defaultTheme} />);
      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });
  });

  describe('TC-MOCARD-010: Markdown Syntax Support', () => {
    it('should render H1 heading', () => {
      render(<MarkdownPreview content="# Heading 1" theme={defaultTheme} />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveTextContent('Heading 1');
    });

    it('should render H2 heading', () => {
      render(<MarkdownPreview content="## Heading 2" theme={defaultTheme} />);
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('Heading 2');
    });

    it('should render H3 heading', () => {
      render(<MarkdownPreview content="### Heading 3" theme={defaultTheme} />);
      const heading = screen.getByRole('heading', { level: 3 });
      expect(heading).toHaveTextContent('Heading 3');
    });

    it('should render bold text', () => {
      render(<MarkdownPreview content="**bold text**" theme={defaultTheme} />);
      const bold = screen.getByText('bold text');
      expect(bold.tagName).toBe('STRONG');
    });

    it('should render italic text', () => {
      render(<MarkdownPreview content="*italic text*" theme={defaultTheme} />);
      const italic = screen.getByText('italic text');
      expect(italic.tagName).toBe('EM');
    });

    it('should render unordered list', () => {
      render(<MarkdownPreview content={'- item 1\n- item 2'} theme={defaultTheme} />);
      const list = screen.getByRole('list');
      expect(list).toBeInTheDocument();
      expect(list.querySelectorAll('li')).toHaveLength(2);
    });

    it('should render blockquote', () => {
      render(<MarkdownPreview content="> This is a quote" theme={defaultTheme} />);
      const quote = screen.getByText('This is a quote');
      expect(quote.closest('blockquote')).toBeInTheDocument();
    });

    it('should render inline code', () => {
      render(<MarkdownPreview content="`code`" theme={defaultTheme} />);
      const code = screen.getByText('code');
      expect(code.tagName).toBe('CODE');
    });
  });

  describe('TC-MOCARD-011: Card Footer Content', () => {
    it('should display brand text', () => {
      render(<MarkdownPreview content="Test" theme={defaultTheme} />);
      expect(screen.getByText('墨卡 · 由 AI 驱动')).toBeInTheDocument();
    });

    it('should display current date', () => {
      render(<MarkdownPreview content="Test" theme={defaultTheme} />);
      const today = new Date().toISOString().split('T')[0];
      expect(screen.getByText(today)).toBeInTheDocument();
    });
  });

  describe('TC-MOCARD-008: Chinese Character Rendering', () => {
    it('should render Chinese characters correctly', () => {
      render(<MarkdownPreview content={'# 你好世界\n\n这是中文内容'} theme={defaultTheme} />);
      expect(screen.getByText('你好世界')).toBeInTheDocument();
      expect(screen.getByText('这是中文内容')).toBeInTheDocument();
    });

    it('should render Chinese in all themes', () => {
      themes.forEach(theme => {
        const { unmount } = render(
          <MarkdownPreview content="# 测试中文" theme={theme} />
        );
        expect(screen.getByText('测试中文')).toBeInTheDocument();
        unmount();
      });
    });
  });

  describe('Theme Styling', () => {
    it('should apply theme background color', () => {
      render(<MarkdownPreview content="Test" theme={defaultTheme} />);
      const card = screen.getByTestId('preview-card');
      // Check that the card has a background style applied (gradient or solid color)
      expect(card.style.background).toBeTruthy();
    });

    it('should apply theme font family', () => {
      render(<MarkdownPreview content="Test" theme={defaultTheme} />);
      const card = screen.getByTestId('preview-card');
      expect(card).toHaveStyle({
        fontFamily: defaultTheme.fontFamily,
      });
    });

    it('should apply glow effect for cyber-taoist theme', () => {
      const cyberTheme = themes.find(t => t.id === 'cyber-taoist')!;
      render(<MarkdownPreview content="# Test" theme={cyberTheme} />);
      const heading = screen.getByRole('heading', { level: 1 });
      expect(heading).toHaveStyle({ textShadow: cyberTheme.glowEffect });
    });
  });
});
