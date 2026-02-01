"use client";

import { Search } from "lucide-react";

export default function Header() {
  const userEmail = "admin@prueba.com";
  const initial = userEmail.charAt(0).toUpperCase();

  return (
    <header className="h-12 bg-white flex items-center px-4 border-b border-gray-200">
      <div className="flex-1 flex justify-center">
        <div className="flex items-center bg-gray-100 rounded-md px-2 py-1 w-64">
          <Search size={16} className="text-gray-500" />
          <input
            type="text"
            placeholder="Buscar..."
            className="ml-2 flex-1 text-sm bg-transparent outline-none"
          />
        </div>
      </div>

      <div className="w-8 h-8 rounded-full bg-blue-900 flex items-center justify-center text-white font-bold">
        {initial}
      </div>
    </header>
  );
}
