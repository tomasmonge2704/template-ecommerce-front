/** @type {import('next').NextConfig} */
require("dotenv").config

const nextConfig = {
  env:{
    NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
    CLAVE_TOKEN: process.env.CLAVE_TOKEN
  }
}

module.exports = nextConfig