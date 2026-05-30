/** @type {import('next').NextConfig} */
const nextConfig = {
    compiler: {
        styledComponents: true,
    },
    reactStrictMode: false,
    poweredByHeader: false,
    experimental: {
        optimizePackageImports: ['@clerk/nextjs', 'lucide-react', 'react-icons'],
    },
    webpack: (config, { dev, isServer }) => {
        if (dev && !isServer) {
            config.watchOptions = {
                ignored: ['**/node_modules', '**/.next'],
            };
            config.optimization.minimize = false;
        }
        return config;
    },
};

export default nextConfig;
