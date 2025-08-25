import { HomeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

function MainMenu() {
  return (
    // Головне меню
    <nav className="bg-gray-100 dark:bg-gray-900 py-4 shadow-md">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-semibold text-gray-900 dark:text-white"><HomeIcon className="h-5 w-5 mr-1" /></Link>
            <div className="hidden md:flex ml-6">
              <Link href="/week" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md font-medium">Week</Link>
              <Link href="/month" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md font-medium">Month</Link>
            </div>
          </div>
          <div className="md:hidden">
            <button
              className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white focus:outline-none focus:text-gray-900 dark:focus:text-white"
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default MainMenu;