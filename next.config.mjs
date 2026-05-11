/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_SUPABASE_URL: 'https://pmolmwwtuamwcvznwecm.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBtb2xtd3d0dWFtd2N2em53ZWNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg1MTQxMDgsImV4cCI6MjA5NDA5MDEwOH0.nEBydpZnd8YnRo4xt1jKyI43e8Wx0iRruHECB3dbCfQ',
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
