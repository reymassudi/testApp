import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./utils/i18n/request.js');

/** @type {import('next').NextConfig} */
/** test */

const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  env: {
    BASE_URL: process.env.BASE_URL,
  },
  images: {
    remotePatterns: [
      {
        hostname: process.env.HOSTNAME,
      },
    ],
  },
};

export default withNextIntl(nextConfig);
