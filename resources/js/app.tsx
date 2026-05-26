import { createRoot } from 'react-dom/client';
import type { Appearance } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

// Dynamic imports
Promise.all([
  import('@inertiajs/react'),
  import('laravel-vite-plugin/inertia-helpers'),
  import('./hooks/use-appearance')
]).then(([
  { createInertiaApp, router },
  { resolvePageComponent },
  { initializeTheme, applyTheme }
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
  
  router.on('navigate', (event) => {
    if (event.detail.page.component.startsWith('site/')) {
        document.documentElement.classList.remove('dark');
    } else {
        const savedAppearance = (localStorage.getItem('appearance') as Appearance) || 'system';
        applyTheme(savedAppearance);
    }
  });
});

// Critical CSS only
import '../css/app.css';