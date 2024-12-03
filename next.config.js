
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com', 'cdn.connectplug.com.br'],
    },
    // webpack(config) {
    //     config.module.rules.push({
    //         test: /\.svg$/,
    //         use: ['@svgr/webpack'],
    //     });

    //     return config;
    // },
    async headers() {
        return [
            {
                source: '/_next/static/:path*',
                headers: [
                    { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
                ],
            },
        ];
    },
};

module.exports = nextConfig;
