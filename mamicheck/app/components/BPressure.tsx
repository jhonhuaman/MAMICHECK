import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registra los componentes necesarios de Chart.js
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

type PressureChartProps = {
  data: { date: string; systolic: number; diastolic: number }[]; // Tipo de datos que recibimos
};

const BPressure: React.FC<PressureChartProps> = ({ data }) => {
  // Preparamos los datos para el gráfico
  const chartData = {
    labels: data.map(item => item.date), // Las fechas de los registros
    datasets: [
      {
        label: 'Presión Sistólica',
        data: data.map(item => item.systolic), // Los valores de la presión sistólica
        borderColor: 'rgba(255, 99, 132, 1)', // Color de la línea
        backgroundColor: 'rgba(255, 99, 132, 0.2)', // Color del fondo de la línea
        fill: true, // Rellenar el área bajo la línea
      },
      {
        label: 'Presión Diastólica',
        data: data.map(item => item.diastolic), // Los valores de la presión diastólica
        borderColor: 'rgba(54, 162, 235, 1)', // Color de la línea
        backgroundColor: 'rgba(54, 162, 235, 0.2)', // Color del fondo de la línea
        fill: true, // Rellenar el área bajo la línea
      }
    ]
  };

  return (
    <div>
      <h3 className="text-lg font-semibold text-blue-700">Variación de la Presión Arterial</h3>
      <Line data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
    </div>
  );
};

export default BPressure;
