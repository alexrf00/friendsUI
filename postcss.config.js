// postcss.config.js
require('ts-node').register({ transpileOnly: true, files: true })

/** @type {import('postcss').ProcessOptions} */
module.exports = {
  plugins: {
    // Use the new “@tailwindcss/postcss” plugin instead of “tailwindcss”
    '@tailwindcss/postcss': { config: './tailwind.config.ts' },
    autoprefixer: {},
  },
}
