import type { MetaFunction } from "@remix-run/node";
import { Link } from '@remix-run/react';
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './dashboard';



export const meta: MetaFunction = () => {
  return [
    { title: "Mamicheck" },
    { name: "description", content: "Welcome to Mamicheck!" },
  ];
};

export default function Index() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="flex h-screen items-center justify-center">
      <div className="flex flex-col items-center ">
        <header className="flex flex-col items-center gap-9">
          <h1 className="leading text-2xl font-bold text-gray-800 dark:text-gray-100">
            Welcome to <span className="sr-only"></span>
          </h1>
          <div className="h-[100px] w-[400px]">
            <img
              src="/logo.png"
              alt="Remix"
              className="block w-full dark:hidden"
            />
          </div>
        </header>
        <nav className="flex flex-col items-center justify-center gap-6 rounded-3xl border border-gray-200 p-6 dark:border-gray-700">
          <p className="leading-3 text-gray-700 dark:text-gray-200">
            
          </p>
          <div className="w-full">
            <label className="block mb-1 text-sm text-gray-700 dark:text-gray-300">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ejemplo@gmail.com"
            />
          </div>
          <div className="w-full">
            <label className="block mb-1 text-sm text-gray-700 dark:text-gray-300">
              Contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="********"
              />
              <button
                type="button"
                onClick={togglePassword}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <Link
            to="/dashboard"
            className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
          >
            Iniciar Sesion
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            ¿Aún no tienes cuenta?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Créala ahora
            </Link>
          </p>
        </nav>
      </div>
    </div>
  );
}

