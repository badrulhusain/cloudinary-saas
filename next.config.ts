/** @type {import('next').NextConfig} */
const nextConfig = {
  // Add Next.js config options here if needed
};

export default nextConfig;

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // add other paths as needed
  ],
  plugins: [require('daisyui')],
  daisyui: {
    themes: ["dark"],
    darkTheme: "dark",
  },
};
