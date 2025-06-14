import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Link } from "@remix-run/react";

export default function Register() {
  const [nombre, setNombre] = useState("");
  const [hospital, setHospital] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Datos de registro:", { nombre, hospital, correo, password });
    alert("Registro enviado (simulado)");
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="flex flex-col items-center">
        <header className="flex flex-col items-center gap-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
            Unete a <span className="sr-only"></span>
          </h1>
          <div className="h-[100px] w-[400px]">
            <img
              src="/logo.png"
              alt="Remix"
              className="block w-full dark:hidden"
            />
          </div>
        </header>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-center justify-center gap-6 w-full max-w-md rounded-3xl border border-gray-200 p-6 dark:border-gray-700 bg-white shadow"
        >
          <div className="w-full">
            <label className="block mb-1 text-sm text-gray-700 dark:text-gray-300">
              Nombre
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Tu nombre completo"
              required
            />
          </div>

          <div className="w-full">
            <label className="block mb-1 text-sm text-gray-700 dark:text-gray-300">
              Hospital
            </label>
            <input
              type="text"
              value={hospital}
              onChange={(e) => setHospital(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Nombre del hospital"
              required
            />
          </div>

          <div className="w-full">
            <label className="block mb-1 text-sm text-gray-700 dark:text-gray-300">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="ejemplo@gmail.com"
              required
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
                required
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

          <button
            type="submit"
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 transition"
          >
            Registrarse
          </button>

          <p className="text-sm text-gray-600 dark:text-gray-300">
            ¿Ya tienes una cuenta?{" "}
            <Link
              to="/"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Inicia sesión
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
