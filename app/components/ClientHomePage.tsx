'use client';

import { useEffect, useState } from 'react';

export default function ClientHomePage() {
  const [WidgetHolder, setWidgetHolder] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    // Only import on the client side
    import('./Widget/Widget-holder').then((module) => {
      setWidgetHolder(() => module.default);
    });
  }, []);

  if (!WidgetHolder) {
    return (
      <div className="w-full flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return <WidgetHolder />;
}
