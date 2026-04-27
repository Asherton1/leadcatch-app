/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // Allow cross-origin POST from tracking script on any client site
        source: '/api/track',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'POST, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
    ]
  },
  async redirects() {
    return [
      {
        source: '/test-form',
        destination: '/demo',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
