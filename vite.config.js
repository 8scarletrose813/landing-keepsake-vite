import { defineConfig } from 'vite';
import vituum from 'vituum';
import pug from '@vituum/vite-plugin-pug';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/landing-keepsake-vite/' : '/',
  plugins: [
    vituum({
      pages: {
        dir: './src/pages',
      },
    }),
    pug({
      root: './src',
    }),
  ],
}));
