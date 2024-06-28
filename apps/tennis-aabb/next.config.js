/** @type {import('next').NextConfig} */
const nextConfig = {
    logging : {
        fetches: {
            fullUrl: true
        }
    },
    transpilePackages: ["@repo/ui"],
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'firebasestorage.googleapis.com',
          },
        ],
      },
    // distDir: 'build',
    // output: 'export',
    // trailingSlash: true,
    // images: {
    //     loader: "custom",
    //     loaderFile: './imageLoader.js',
    //     remotePatterns: [
    //         {
    //           protocol: 'https',
    //           hostname: '**.example.com',
    //         },
    //       ],
    //   },
}

module.exports = nextConfig
