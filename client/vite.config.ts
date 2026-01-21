import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import mkcert from 'vite-plugin-mkcert';
import path from 'path';

export default defineConfig({
  plugins: [react(), mkcert()],
  envDir: path.resolve(__dirname, '..'),
  server: {
    port: 3000,
  },
});
