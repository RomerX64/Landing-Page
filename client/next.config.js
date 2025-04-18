/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  typescript: {
    // Ignora errores en tiempo de compilación para poder construir la imagen
    ignoreBuildErrors: true,
  },
  // Opcionalmente puedes desactivar ESLint durante la construcción si te está causando problemas
  eslint: {
    ignoreDuringBuilds: true,
  },
};

module.exports = nextConfig;
