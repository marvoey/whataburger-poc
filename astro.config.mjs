// @ts-check
import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: netlify(),
  vite: {
    resolve: {
      alias: {
        '@styles': fileURLToPath(new URL('./src/styles', import.meta.url)),
      },
    },
    server: {
      headers: {
        'Content-Security-Policy': "script-src 'self' 'unsafe-inline' https://app-epsamoeydevva227p001.cms.optimizely.com;",
      },
    },
  },
});