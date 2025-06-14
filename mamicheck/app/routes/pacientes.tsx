import { useLoaderData, useNavigate } from '@remix-run/react';
import { useState } from 'react';
import SidebarLayout from '~/components/SidebarLayout';
import Histogram from '~/components/Histogram';

type Paciente = {
  id: number;
  nombre: string;
  edad: number;
  genero: string;
};

type Registro = {
  id: number;
  pacienteId: number;
  Age: number;
  FechaRegistro?: string;
  SystolicBP: number;
  DiastolicBP: number;
  BS: number;
  BodyTemp: number;
  HeartRate: number;
};

const getRiskLevel = (registro: Registro) => {
  if (registro.SystolicBP > 140 || registro.DiastolicBP > 90 || registro.BS > 7) {
    return 'HighRisk';
  } else if (registro.SystolicBP > 120 || registro.DiastolicBP > 80 || registro.BS > 6) {
    return 'MidRisk';
  }
  return 'LowRisk';
};

export const loader = async () => {
  const pacientes: Paciente[] = [
    { id: 1, nombre: 'Rosa Pérez', edad: 30, genero: 'Masculino' },
    { id: 2, nombre: 'Ana Gómez', edad: 25, genero: 'Femenino' },
    { id: 3, nombre: 'Carla Ruiz', edad: 40, genero: 'Masculino' },
    { id: 4, nombre: 'Laura Sánchez', edad: 35, genero: 'Femenino' },
  ];

  const registros: Registro[] = [
    { id: 1, pacienteId: 1, Age: 30, FechaRegistro: "25-05-2025", SystolicBP: 140, DiastolicBP: 90, BS: 6.2, BodyTemp: 98.4, HeartRate: 72 },
    { id: 2, pacienteId: 1, Age: 30, FechaRegistro: "26-05-2025", SystolicBP: 135, DiastolicBP: 88, BS: 6.5, BodyTemp: 98.6, HeartRate: 74 },
    { id: 3, pacienteId: 1, Age: 30, FechaRegistro: "27-05-2025", SystolicBP: 120, DiastolicBP: 80, BS: 5.9, BodyTemp: 98.2, HeartRate: 70 },
    { id: 4, pacienteId: 1, Age: 30, FechaRegistro: "28-05-2025", SystolicBP: 150, DiastolicBP: 100, BS: 7.5, BodyTemp: 98.7, HeartRate: 80 },
  ];

  return { pacientes, registros };
};

export default function Dashboard() {
  const { pacientes, registros } = useLoaderData<{ pacientes: Paciente[]; registros: Registro[] }>();
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const navigate = useNavigate();

  const registrosFiltrados = selectedId
    ? registros.filter((r) => r.pacienteId === selectedId).map((reg) => ({
      ...reg,
      RiskLevel: getRiskLevel(reg),
    }))
    : [];

  const pacienteSeleccionado = pacientes.find((p) => p.id === selectedId);

  return (
    <SidebarLayout>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="col-span-3 flex flex-col gap-6 h-[680px]">
          <div className="bg-white p-6 rounded-lg shadow-lg overflow-auto flex-1">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-blue-700">
                Registros {pacienteSeleccionado ? `de la gestante ${pacienteSeleccionado.nombre}` : ''}
              </h2>
              {/* Aquí se eliminó el botón "Ver más registros" */}
            </div>
            <table className="w-full text-sm text-left border-separate border-spacing-0.5">
              <thead className="bg-gray-100 text-gray-700 border-b">
                <tr>
                  <th className="px-3 py-3 text-base">#</th>
                  <th className="px-3 py-3 text-base">Fecha de Registro</th>
                  <th className="px-3 py-3 text-base">Presion Sistólica</th>
                  <th className="px-3 py-3 text-base">Presion Diastólica</th>
                  <th className="px-3 py-3 text-base">Nivel de Glucosa(BS)</th>
                  <th className="px-3 py-3 text-base">Temp. Corporal</th>
                  <th className="px-3 py-3 text-base">Frecuencia Cardíaca</th>
                  <th className="px-3 py-3 text-base">Nivel de Riesgo</th>
                </tr>
              </thead>
              <tbody>
                {registrosFiltrados.length > 0 ? (
                  registrosFiltrados.map((reg, idx) => (
                    <tr key={reg.id} className="border-t hover:bg-blue-50">
                      <td className="px-3 py-2">{idx + 1}</td>
                      <td className="px-3 py-2">{reg.FechaRegistro}</td>
                      <td className="px-3 py-2">{reg.SystolicBP}</td>
                      <td className="px-3 py-2">{reg.DiastolicBP}</td>
                      <td className="px-3 py-2">{reg.BS}</td>
                      <td className="px-3 py-2">{reg.BodyTemp}</td>
                      <td className="px-3 py-2">{reg.HeartRate}</td>
                      <td className="px-3 py-2">
                        <span
                          className={`text-white px-2 py-1 rounded-lg ${reg.RiskLevel === 'HighRisk'
                              ? 'bg-red-500'
                              : reg.RiskLevel === 'MidRisk'
                                ? 'bg-yellow-500'
                                : 'bg-green-500'
                            }`}
                        >
                          {reg.RiskLevel}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={8} className="px-3 py-4 text-center text-gray-400">
                      No hay registros para mostrar.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>


        <div className="col-span-1 bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Pacientes</h2>
          <ul className="space-y-3">
            {pacientes.map((p) => (
              <li
                key={p.id}
                className={`cursor-pointer p-4 rounded-lg border-2 border-transparent ${selectedId === p.id
                  ? 'bg-blue-200 border-blue-500'
                  : 'hover:bg-blue-50'}`}
                onClick={() => setSelectedId(p.id)}
              >
                <div className="text-lg font-medium text-blue-700">{p.nombre}</div>
                <div className="text-sm text-gray-500">Edad: {p.edad} años</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </SidebarLayout>
  );
}
