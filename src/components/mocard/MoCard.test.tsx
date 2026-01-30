import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MoCard } from './MoCard';
import { toPng } from 'html-to-image';

// Mock html-to-image
vi.mock('html-to-image', () => ({
  toPng: vi.fn(() => Promise.resolve('data:image/png;base64,mock')),
}));

const mockedToPng = vi.mocked(toPng);

describe('MoCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  // TC-MOCARD-001: Page Render Test
  describe('TC-MOCARD-001: Page Render Test', () => {
    it('should render markdown input textarea', () => {
      render(<MoCard />);
      const textarea = screen.getByTestId('markdown-input');
      expect(textarea).toBeInTheDocument();
    });

    it('should render preview card', () => {
      render(<MoCard />);
      const previewCard = screen.getByTestId('preview-card');
      expect(previewCard).toBeInTheDocument();
    });

    it('should render all 5 theme buttons', () => {
      render(<MoCard />);
      expect(screen.getByTestId('theme-btn-ink-smoke')).toBeInTheDocument();
      expect(screen.getByTestId('theme-btn-lucky-red')).toBeInTheDocument();
      expect(screen.getByTestId('theme-btn-cyber-taoist')).toBeInTheDocument();
      expect(screen.getByTestId('theme-btn-retro-shanghai')).toBeInTheDocument();
      expect(screen.getByTestId('theme-btn-bamboo-green')).toBeInTheDocument();
    });

    it('should render download button', () => {
      render(<MoCard />);
      const downloadBtn = screen.getByTestId('download-btn');
      expect(downloadBtn).toBeInTheDocument();
    });

    it('should have default markdown content in textarea', () => {
      render(<MoCard />);
      const textarea = screen.getByTestId('markdown-input') as HTMLTextAreaElement;
      expect(textarea.value).toContain('欢迎使用墨卡');
    });
  });

  // TC-MOCARD-002: Markdown Input Real-time Rendering
  describe('TC-MOCARD-002: Markdown Input Real-time Rendering', () => {
    it('should update preview when markdown changes', () => {
      render(<MoCard />);
      const textarea = screen.getByTestId('markdown-input');

      fireEvent.change(textarea, { target: { value: '# 你好 Agent' } });

      const previewCard = screen.getByTestId('preview-card');
      expect(previewCard.textContent).toContain('你好 Agent');
    });
  });

  // TC-MOCARD-011: Card Footer Content
  describe('TC-MOCARD-011: Card Footer Content', () => {
    it('should display brand text in footer', () => {
      render(<MoCard />);
      const previewCard = screen.getByTestId('preview-card');
      expect(previewCard.textContent).toContain('墨卡 · 由 AI 驱动');
    });

    it('should display current date in footer', () => {
      render(<MoCard />);
      const today = new Date().toISOString().split('T')[0];
      const previewCard = screen.getByTestId('preview-card');
      expect(previewCard.textContent).toContain(today);
    });
  });

  // Theme switching tests
  describe('Theme Switching', () => {
    it('should change theme when clicking theme button', () => {
      render(<MoCard />);
      const luckyRedBtn = screen.getByTestId('theme-btn-lucky-red');

      fireEvent.click(luckyRedBtn);

      const previewCard = screen.getByTestId('preview-card');
      // Check that the background style changed to the lucky-red gradient (rgb values)
      expect(previewCard.style.background).toContain('rgb(196, 30, 58)');
    });
  });

  // Header and branding
  describe('Header and Branding', () => {
    it('should display app name', () => {
      render(<MoCard />);
      expect(screen.getByText('墨卡')).toBeInTheDocument();
    });

    it('should display app slogan', () => {
      render(<MoCard />);
      // Use getAllByText since the slogan appears in both header and default content
      const sloganElements = screen.getAllByText('让文字，变成艺术');
      expect(sloganElements.length).toBeGreaterThan(0);
    });
  });

  // Export error handling tests
  describe('Export Error Handling', () => {
    it('should display error message when export fails', async () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      mockedToPng.mockRejectedValueOnce(new Error('Canvas tainted'));

      render(<MoCard />);
      const downloadBtn = screen.getByTestId('download-btn');

      fireEvent.click(downloadBtn);

      await waitFor(() => {
        expect(screen.getByRole('alert')).toBeInTheDocument();
      });

      expect(consoleSpy).toHaveBeenCalled();
      consoleSpy.mockRestore();
    });

    it('should reset button state after export failure', async () => {
      vi.spyOn(console, 'error').mockImplementation(() => {});
      mockedToPng.mockRejectedValueOnce(new Error('Export failed'));

      render(<MoCard />);
      const downloadBtn = screen.getByTestId('download-btn');

      fireEvent.click(downloadBtn);

      await waitFor(() => {
        expect(downloadBtn).not.toBeDisabled();
        expect(downloadBtn).toHaveTextContent('下载 PNG');
      });
    });

    it('should show specific error message for cross-origin issues', async () => {
      vi.spyOn(console, 'error').mockImplementation(() => {});
      mockedToPng.mockRejectedValueOnce(new Error('Canvas is tainted by cross-origin data'));

      render(<MoCard />);
      fireEvent.click(screen.getByTestId('download-btn'));

      await waitFor(() => {
        expect(screen.getByRole('alert').textContent).toContain('外部图片');
      });
    });
  });
});
