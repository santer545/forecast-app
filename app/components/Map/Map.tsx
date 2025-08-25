'use client';

import dynamic from 'next/dynamic';

// Create a dynamic component that will only load on the client
const DynamicMap = dynamic(() => import('./MapClient'), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

function MyMapComponent() {
  return <DynamicMap />;
}

export default MyMapComponent;
