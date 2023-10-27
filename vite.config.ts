/// <reference types="vitest" />
import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import dts from 'vite-plugin-dts';
import { execSync } from 'node:child_process';

export default defineConfig({
  build: {
    cssMinify: true,
    minify: true,
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/MyClass.ts'),
      name: 'MyClass', // for iife and umd
      // the proper extensions will be added
      fileName: 'myclass',
      formats: ['iife', 'cjs', 'es', 'umd'],
    },
  },
  plugins: [
    dts({
      insertTypesEntry: true,
      //   rollupTypes: true // uncomment If you want to merge all declarations into one file
    }),
    {
      name: 'postbuild-commands', // the name of your custom plugin. Could be anything.
      closeBundle: async () => {
        console.log('Build docs...');
        execSync('npm run build:docs'); // run during closeBundle hook. https://rollupjs.org/guide/en/#closebundle
        console.log('Docs build !');
      },
    },
  ],
  resolve: {
    alias: {
      find: '~',
      replacement: resolve(__dirname, 'src'),
    },
  },
  test: {
    environment: 'jsdom',
    threads: false,
    // For this config, check https://github.com/vitest-dev/vitest/issues/740
    environmentOptions: {
      jsdom: {
        resources: 'usable',
      },
    },
    exclude: [
      '**/node_modules/**',
      '**/dist/**',
      '**/cypress/**',
      '**/.{idea,git,cache,output,temp}/**',
      '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
      '**/e2e/**',
    ],
  },
});
