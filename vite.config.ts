import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import dts from 'vite-plugin-dts';

import { resolve } from 'path';

export default defineConfig({
    plugins: [
        react(),
        dts({
            tsconfigPath: './tsconfig.build.json',
            include: ['lib']
        })
    ],
    build: {
        copyPublicDir: false,
        lib: {
            entry: resolve(__dirname, 'lib/main.ts'),
            name: 'useResizeObserver',
            formats: ['es', 'umd', 'cjs']
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM'
                }
            }
        }
    }
});
