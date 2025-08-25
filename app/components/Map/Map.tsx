'use client';

import { useEffect, useState } from 'react';

function MyMapComponent() {
  const [MapClient, setMapClient] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    // Only import on the client side
    import('./MapClient').then((module) => {
      setMapClient(() => module.default);
    });
  }, []);

  if (!MapClient) {
    return (
      <div className="w-full h-64 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg">
        <div className="text-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-300 text-sm">Loading map...</p>
        </div>
      </div>
    );
  }

  return <MapClient />;
}

export default MyMapComponent;
