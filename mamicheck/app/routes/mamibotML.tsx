import { useState } from "react";
import SidebarLayout from "~/components/SidebarLayout";


export default function MamibotML() {
  const [formData, setFormData] = useState({
    Age: 25,
    SystolicBP: 140,
    DiastolicBP: 80,
    BS: 6.7,
    BodyTemp: 98,
    HeartRate: 70,
  });

  const [result, setResult] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: Number(e.target.value),
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('/predict', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Esperamos la respuesta y la mostramos en el estado
      const text = await response.text();
      setResult(text);
    } catch (error) {
      setResult("Error al conectar con la API.");
    }
  };

  return (
    <SidebarLayout>
    <div className="p-6 bg-white rounded shadow max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-pink-700">Testeo MAMIBOT</h2>
      <div className="space-y-4">
        {Object.entries(formData).map(([key, value]) => (
          <div key={key} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700">{key}</label>
            <input
              type="number"
              name={key}
              value={value}
              onChange={handleChange}
              className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>
        ))}
        <button
          onClick={handleSubmit}
          className="bg-pink-300 text-white font-semibold px-4 py-2 rounded hover:bg-pink-400 transition"
        >
          Calcular Riesgo
        </button>
        {result && (
          <div className="absolute top-4 right-4 bg-pink-100 text-pink-700 px-4 py-2 rounded shadow">
            {result}
          </div>
        )}
      </div>
    </div>
    </SidebarLayout>
  );
}
