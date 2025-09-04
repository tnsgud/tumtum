import type { NextConfig } from 'next'

export const nextConfig: NextConfig = {
  allowedDevOrigins: [
    'http://macbookpro.tail2e04c4.ts.net:3000',
    'http://macbookpro.tail2e04c4.ts.net:8080',
    'http://bagsunhyeong-ui-macbookpro.netbird.cloud:3000'
  ],
  crossOrigin: 'anonymous',
}
