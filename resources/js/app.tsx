import { createRoot } from 'react-dom/client';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Dynamic imports
Promise.all([
  import('@inertiajs/react'),
  import('laravel-vite-plugin/inertia-helpers'),
  import('./hooks/use-appearance')
]).then(([
  { createInertiaApp },
  { resolvePageComponent },
  { initializeTheme }
]) => {
  createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(
      `./pages/${name}.tsx`,
      import.meta.glob('./pages/**/*.tsx', { eager: false })
    ),
    setup({ el, App, props }) {
      const root = createRoot(el);
      root.render(<App {...props} />);
    },
    progress: {
      color: '#4B5563',
      delay: 250
    },
  });

  initializeTheme();
});

// Critical CSS only
import '../css/app.css';