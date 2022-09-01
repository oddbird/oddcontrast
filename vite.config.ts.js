'use strict';

// vite.config.ts
import { sveltekit } from '@sveltejs/kit/vite';
import path from 'path';
import { defineConfig } from 'vite';
var vite_config_default = defineConfig({
  resolve: {
    alias: {
      $src: path.resolve('./src'),
      $test: path.resolve('./test/js'),
    },
  },
  plugins: [sveltekit()],
  test: {
    include: ['./test/js/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    globals: true,
    environment: 'jsdom',
    watch: false,
    setupFiles: './test/js/setup.js',
    clearMocks: true,
    reporters: 'dot',
    coverage: {
      enabled: true,
      reporter: ['text-summary', 'html'],
      include: ['src/**/*.{js,ts,svelte}'],
      exclude: [
        'src/**/*.d.ts',
        'src/routes/docs/**/*',
        'src/routes/+layout.*',
      ],
      all: true,
      skipFull: true,
    },
  },
});
export { vite_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwidml0ZXN0XCIgLz5cbi8vLyA8cmVmZXJlbmNlIHR5cGVzPVwiQHN2ZWx0ZWpzL2tpdC90eXBlc1wiIC8+XG5cbmltcG9ydCB7IHN2ZWx0ZWtpdCB9IGZyb20gJ0BzdmVsdGVqcy9raXQvdml0ZSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICRzcmM6IHBhdGgucmVzb2x2ZSgnLi9zcmMnKSxcbiAgICAgICR0ZXN0OiBwYXRoLnJlc29sdmUoJy4vdGVzdC9qcycpLFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IFtzdmVsdGVraXQoKV0sXG4gIC8qKlxuICAgKiBAc2VlIGh0dHBzOi8vdml0ZXN0LmRldi9jb25maWcvI2NvbmZpZ3VyYXRpb25cbiAgICovXG4gIHRlc3Q6IHtcbiAgICBpbmNsdWRlOiBbJy4vdGVzdC9qcy8qKi8qLnt0ZXN0LHNwZWN9LntqcyxtanMsY2pzLHRzLG10cyxjdHMsanN4LHRzeH0nXSxcbiAgICBnbG9iYWxzOiB0cnVlLFxuICAgIGVudmlyb25tZW50OiAnanNkb20nLFxuICAgIHdhdGNoOiBmYWxzZSxcbiAgICBzZXR1cEZpbGVzOiAnLi90ZXN0L2pzL3NldHVwLmpzJyxcbiAgICBjbGVhck1vY2tzOiB0cnVlLFxuICAgIHJlcG9ydGVyczogJ2RvdCcsXG4gICAgY292ZXJhZ2U6IHtcbiAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICByZXBvcnRlcjogWyd0ZXh0LXN1bW1hcnknLCAnaHRtbCddLFxuICAgICAgaW5jbHVkZTogWydzcmMvKiovKi57anMsdHMsc3ZlbHRlfSddLFxuICAgICAgZXhjbHVkZTogW1xuICAgICAgICAnc3JjLyoqLyouZC50cycsXG4gICAgICAgICdzcmMvcm91dGVzL2RvY3MvKiovKicsXG4gICAgICAgICdzcmMvcm91dGVzLytsYXlvdXQuKicsXG4gICAgICBdLFxuICAgICAgYWxsOiB0cnVlLFxuICAgICAgc2tpcEZ1bGw6IHRydWUsXG4gICAgfSxcbiAgfSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7O0FBR0E7QUFDQTtBQUNBO0FBRUEsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsTUFBTSxLQUFLLFFBQVEsT0FBTztBQUFBLE1BQzFCLE9BQU8sS0FBSyxRQUFRLFdBQVc7QUFBQSxJQUNqQztBQUFBLEVBQ0Y7QUFBQSxFQUNBLFNBQVMsQ0FBQyxVQUFVLENBQUM7QUFBQSxFQUlyQixNQUFNO0FBQUEsSUFDSixTQUFTLENBQUMsNERBQTREO0FBQUEsSUFDdEUsU0FBUztBQUFBLElBQ1QsYUFBYTtBQUFBLElBQ2IsT0FBTztBQUFBLElBQ1AsWUFBWTtBQUFBLElBQ1osWUFBWTtBQUFBLElBQ1osV0FBVztBQUFBLElBQ1gsVUFBVTtBQUFBLE1BQ1IsU0FBUztBQUFBLE1BQ1QsVUFBVSxDQUFDLGdCQUFnQixNQUFNO0FBQUEsTUFDakMsU0FBUyxDQUFDLHlCQUF5QjtBQUFBLE1BQ25DLFNBQVM7QUFBQSxRQUNQO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBQUEsTUFDQSxLQUFLO0FBQUEsTUFDTCxVQUFVO0FBQUEsSUFDWjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
