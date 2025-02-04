import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import jsconfigPaths from 'vite-jsconfig-paths';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  base: '/', // Base do site, ajuste para subdiretórios, ex.: '/garbo'
  plugins: [
    react(),
    jsconfigPaths(),
    viteStaticCopy({
      targets: [
        {
          src: '_redirects', // O arquivo na raiz do projeto
          dest: '.' // Será copiado para a raiz do diretório `dist`
        }
      ]
    })
  ],
  define: {
    global: 'window'
  },
  resolve: {
    alias: [
      {
        find: /^~(.+)/,
        replacement: path.join(process.cwd(), 'node_modules/$1')
      },
      {
        find: /^src(.+)/,
        replacement: path.join(process.cwd(), 'src/$1')
      },
      {
        // Corrigir o caminho do longFormatters
        find: 'date-fns/_lib/format/longFormatters',
        replacement: 'date-fns/esm/_lib/format/longFormatters/index.js'
      }
    ]
  },
  server: {
    open: true,
    port: 3000
  },
  preview: {
    open: true,
    port: 3000
  },
  build: {
    outDir: 'dist' // Diretório de saída do build
  }
});
