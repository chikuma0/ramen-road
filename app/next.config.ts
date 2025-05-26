/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  // Disable React strict mode temporarily
  reactStrictMode: false,
  
  // Enhanced webpack config to handle browser-only modules
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    // Provide fallbacks for browser environment on client-side
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        os: false,
      };
    }
    
    // Add @ alias
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': __dirname,
      '@components': `${__dirname}/src/components`,
      '@hooks': `${__dirname}/src/hooks`,
    };
    
    return config;
  },
  
  // Use standalone output
  output: 'standalone',
  
  // FIXED: Removed conflicting redirects to allow Pages Router pages to work
  // This allows our /pages/journey/* routes to function properly
  async redirects() {
    return [];
  },
  
  // Experimental features to improve client component handling
  experimental: {
    // We don't need optimizePackageImports since we're using dynamic imports
  },
  
  eslint: {
    // Disable ESLint during development to speed up troubleshooting
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
