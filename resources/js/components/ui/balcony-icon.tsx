import { createLucideIcon } from 'lucide-react';

const Balcony = createLucideIcon('Balcony', [
  // Main balcony structure (rounded top, wider bottom)
  ['path', { 
    d: 'M5 8C5 6.89543 5.89543 6 7 6H17C18.1046 6 19 6.89543 19 8V18C19 19.1046 18.1046 20 17 20H7C5.89543 20 5 19.1046 5 18V8Z',
    key: 'balcony-main'
  }],
  
  // Glass door panels
  ['line', { x1: '12', y1: '8', x2: '12', y2: '18', key: 'door-divider' }],
  ['line', { x1: '8', y1: '8', x2: '8', y2: '18', key: 'left-panel' }],
  ['line', { x1: '16', y1: '8', x2: '16', y2: '18', key: 'right-panel' }],
  
  // Balcony railing details
  ['line', { x1: '4', y1: '18', x2: '20', y2: '18', key: 'railing' }],
  ['line', { x1: '6', y1: '16', x2: '6', y2: '20', key: 'left-post' }],
  ['line', { x1: '18', y1: '16', x2: '18', y2: '20', key: 'right-post' }],
  
]);

export default Balcony;