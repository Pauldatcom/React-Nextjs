import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  devIndicators: {
    position: "bottom-right", // prevent conflicts with our custom legend
  },
  images: {
    domains: ["mars.nasa.gov"], // autorise les images Mars Rover
  },
}

export default nextConfig
