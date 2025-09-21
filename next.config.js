/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {

  experimental: {
    serverActions: {
      allowedOrigins: [
        'localhost:3000',
        'jubilant-giggle-xpggw9xqr6gcp6x4-3000.app.github.dev'
      ]
    }
  }
}

module.exports = nextConfig