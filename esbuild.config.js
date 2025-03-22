import * as esbuild from 'esbuild';

await esbuild.build({
  entryPoints: ['server/index.ts'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  outdir: 'dist',
  external: [
    'express',
    'vite',
    '@vitejs/*',
    'fs',
    'path',
    'url',
    'http',
    'crypto',
    'buffer',
    'stream',
    'zlib',
    'util',
    'net',
    'tls',
    'events',
  ],
  plugins: [{
    name: 'native-node-modules',
    setup(build) {
      build.onResolve({ filter: /\.node$/ }, args => ({
        path: args.path,
        external: true,
      }))
    },
  }],
})

