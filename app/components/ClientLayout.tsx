'use client';

import MyMapComponent from './Map/Map';

export default function ClientLayout() {
  return (
    <div className="sticky top-24">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Location</h3>
        </div>
        <MyMapComponent />
      </div>
    </div>
  );
}
