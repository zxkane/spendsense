import type { Metadata } from "next";
import { Noto_Serif_SC, Noto_Sans_SC } from "next/font/google";
import "./globals.css";

const notoSerifSC = Noto_Serif_SC({
  variable: "--font-noto-serif-sc",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const notoSansSC = Noto_Sans_SC({
  variable: "--font-noto-sans-sc",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "墨卡 MoCard - Markdown 社交卡片生成器",
  description: "让文字，变成艺术。将 Markdown 转化为精美社交卡片，支持五种中国风主题。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body
        className={`${notoSerifSC.variable} ${notoSansSC.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
