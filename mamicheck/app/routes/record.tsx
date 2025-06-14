import SidebarLayout from '~/components/SidebarLayout';
import { json } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { useSearchParams } from '@remix-run/react';



type Registro = {
  id: number;
  pacienteId: number;
  Age: number;
  SystolicBP: number;
  DiastolicBP: number;
  BS: number;
  BodyTemp: number;
  HeartRate: number;
};

export const loader = async () => {
  const registros: Registro[] = [
    { id: 1, pacienteId: 1, Age: 30, SystolicBP: 140, DiastolicBP: 90, BS: 6.2, BodyTemp: 98.4, HeartRate: 72 },
    { id: 2, pacienteId: 1, Age: 31, SystolicBP: 130, DiastolicBP: 85, BS: 5.9, BodyTemp: 98.6, HeartRate: 75 },
    { id: 3, pacienteId: 2, Age: 25, SystolicBP: 120, DiastolicBP: 80, BS: 5.5, BodyTemp: 98.2, HeartRate: 70 },
    { id: 4, pacienteId: 3, Age: 40, SystolicBP: 150, DiastolicBP: 95, BS: 7.8, BodyTemp: 99.1, HeartRate: 85 },
  ];

  return json({ registros });
};


export default function TodosLosRegistros() {
  const { registros } = useLoaderData<{ registros: Registro[] }>();
  const [searchParams] = useSearchParams();
  const pacienteId = searchParams.get('pacienteId');

  const registrosFiltrados = pacienteId
    ? registros.filter((r) => r.pacienteId === Number(pacienteId))
    : registros;

  return (
    <SidebarLayout>
      <div className="p-6 grid grid-cols-[2fr_1fr] gap-6 h-[680px]">
        {/* Panel Izquierdo: Tabla */}
        <div className="bg-white rounded-lg shadow-md p-4 overflow-auto ">
          <h1 className="text-2xl font-bold text-blue-700 mb-4">
            Registros {pacienteId ? `de la gestante #${pacienteId}` : 'de todos los pacientes'}
          </h1>
          <table className="w-full border text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Paciente ID</th>
                <th className="border px-4 py-2">Edad</th>
                <th className="border px-4 py-2">Sistólica</th>
                <th className="border px-4 py-2">Diastólica</th>
                <th className="border px-4 py-2">BS</th>
                <th className="border px-4 py-2">Temperatura</th>
                <th className="border px-4 py-2">Frecuencia</th>
              </tr>
            </thead>
            <tbody>
              {registrosFiltrados.map((r) => (
                <tr key={r.id} className="text-center hover:bg-blue-50">
                  <td className="border px-4 py-2">{r.id}</td>
                  <td className="border px-4 py-2">{r.pacienteId}</td>
                  <td className="border px-4 py-2">{r.Age}</td>
                  <td className="border px-4 py-2">{r.SystolicBP}</td>
                  <td className="border px-4 py-2">{r.DiastolicBP}</td>
                  <td className="border px-4 py-2">{r.BS}</td>
                  <td className="border px-4 py-2">{r.BodyTemp}</td>
                  <td className="border px-4 py-2">{r.HeartRate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Panel Derecho: Panel 2 y 3 en columna */}
        <div className="flex flex-col gap-6">
          {/* Panel 2 */}
          <div className="flex-1 bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">Panel 2</h2>
            <p className="text-gray-600">Contenido adicional o visualización aquí.</p>
          </div>

          {/* Panel 3 */}
          <div className="flex-1 bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold text-blue-700 mb-2">Panel 3</h2>
            <p className="text-gray-600">Otro tipo de análisis, gráfico o contenido.</p>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}



