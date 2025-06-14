import {
  HomeIcon,
  ChartBarIcon,
   ArrowLeftOnRectangleIcon,
  UserCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-[#2c3e50] text-white flex flex-col justify-between h-screen p-6 shadow-lg">
      <div>
        <div className="mb-8 flex justify-center">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-40 "
          />
        </div>
        <nav>
          <ul className="space-y-4">
            <li>
              <a href="/dashboard" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#48c9b0] transition">
                <HomeIcon className="h-5 w-5 text-gray-300" />
                <span >Dashboard</span>
              </a>
            </li>
            <li>
              <a href="/mamibotML" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#48c9b0] transition">
                <ChartBarIcon className="h-5 w-5 text-gray-300" />
                <span>Test Mamibot</span>
              </a>
            </li>
            <li>
              <a href="/pacientes" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#48c9b0] transition">
                <UserGroupIcon className="h-5 w-5 text-gray-300" />
                <span>Pacientes</span>
              </a>
            </li>
            <li>
              <a href="/" className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-[#48c9b0] transition">
                <ArrowLeftOnRectangleIcon className="h-5 w-5 text-gray-300" />
                <span>Cerrar Sesión</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <div className="border-t border-gray-700 pt-4 flex items-center gap-3">
        <UserCircleIcon className="h-10 w-10 text-gray-400" />
        <div>
          <p className="text-sm font-semibold">Mi Perfil</p>
          <a href="/" className="block hover:underline text-xs text-gray-400 hover:bg-gray-700 transition">
                Ver cuenta
              </a>
        </div>
      </div>
    </aside>
  );
}
