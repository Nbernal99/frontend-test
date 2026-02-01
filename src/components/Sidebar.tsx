'use client';

import Link from "next/link";
import { Mail, Folder, Settings, LogOut } from "lucide-react";
import Cookies from "js-cookie";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-blue-900 text-white flex flex-col">
      <div className="h-18 flex items-center px-4 font-bold">
        Menú
      </div>

      <nav className="flex-1 p-2 space-y-1">
        <Link
          href="/dashboard/inbox"
          className="flex items-center gap-2 p-2 rounded-md hover:bg-blue-800 transition"
        >
          <Mail size={18} /> Chats
        </Link>

        <Link
          href="/dashboard/users"
          className="flex items-center gap-2 p-2 rounded-md hover:bg-blue-800 transition"
        >
          <Folder size={18} /> Usuarios
        </Link>

        <Link
          href="/dashboard/settings"
          className="flex items-center gap-2 p-2 rounded-md hover:bg-blue-800 transition"
        >
          <Settings size={18} /> Configuración
        </Link>
      </nav>

      <div className="p-4">
        <button
          onClick={() => {
            Cookies.remove("auth");
            window.location.href = "/login";
          }}
          className="flex items-center gap-2 p-2 rounded-md hover:bg-blue-800 transition"
        >
          <LogOut size={18} /> Cerrar sesión
        </button>
      </div>
    </aside>
  );
}
