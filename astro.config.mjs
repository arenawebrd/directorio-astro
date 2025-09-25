import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
// https://astro.build/config
export default defineConfig({
  output: 'static',
  site: 'https://www.directoriord.com', // Replace with your actual domain
  integrations: [tailwind(), sitemap()],
});
