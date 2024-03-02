// Citation for the current file:
// Date: 2/29/2024
// Based on URL: https://nextjs.org/learn/dashboard-app/getting-started
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental:{
    workerThreads: false,
    cpus: 1
  }
};

module.exports = nextConfig;
