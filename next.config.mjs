/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
// await import("./src/env.js");

/* @type {import("next").NextConfig} */
const config = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "raw.githubusercontent.com",
                port: "",
                pathname: "/**",
            },
        ],
    },
    async rewrites() {
        return [
            {
                source: "/api/rpc",
                destination: "http://140.82.62.189:8545",
            },
        ];
    },
};

export default config;
