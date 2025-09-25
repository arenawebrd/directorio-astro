import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: netlify(),
  site: 'https://www.directoriord.com', // Replace with your actual domain
  integrations: [tailwind(), sitemap()],
});
