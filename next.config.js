/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Recommended for the `pages` directory, default in `app`.
  swcMinify: true,
  // experimental: {
  //   // Required: for next 13
  //   appDir: true
  // }
//   i18n: { 
// localeDetection:true
//   },
  images: {
    domains: ["pasteboard.co","adilbaba.net","images.unsplash.com", "s3-alpha-sig.figma.com", "46.202.143.230"]
  }
}

module.exports = nextConfig
