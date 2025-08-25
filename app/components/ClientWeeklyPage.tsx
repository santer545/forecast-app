'use client';

import { useEffect, useState } from 'react';

export default function ClientWeeklyPage() {
  const [WeeklyHolder, setWeeklyHolder] = useState<React.ComponentType | null>(null);

  useEffect(() => {
    // Only import on the client side
    import('./Weekly/Weekly-holder').then((module) => {
      setWeeklyHolder(() => module.default);
    });
  }, []);

  if (!WeeklyHolder) {
    return (
      <div className="space-y-8">
        <div className="h-8 bg-gradient-to-r from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-600 rounded-lg w-64 animate-pulse"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl h-64 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return <WeeklyHolder />;
}
