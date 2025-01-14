/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
      // ビルド時のESLintチェックを無効化
      ignoreDuringBuilds: true,
    },
    // その他の既存の設定がある場合は保持
    // 例：
    // reactStrictMode: true,
    // swcMinify: true,
  }
  
  module.exports = nextConfig