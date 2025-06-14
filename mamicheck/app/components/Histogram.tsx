import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type Registro = {
  id: number;
  SystolicBP: number;
  DiastolicBP: number;
  BS: number;
  RiskLevel: string;
};

type HistogramProps = {
  data: { nombre: string; edad: number; registros: Registro[] };
};

// Función para convertir el nivel de riesgo a un valor numérico (para graficar)
const getRiskValue = (riskLevel: string) => {
  switch (riskLevel) {
    case 'LowRisk':
      return 'LowRisk';
    case 'MidRisk':
      return 'MidRisk';
    case 'HighRisk':
      return 'HighRisk';
    default:
      return 'Unknown';
  }
};

// Función para convertir el texto a valores numéricos para graficar
const riskValueToNumeric = (riskValue: string) => {
  switch (riskValue) {
    case 'LowRisk':
      return 1;
    case 'MidRisk':
      return 2;
    case 'HighRisk':
      return 3;
    default:
      return 0;
  }
};

export default function Histogram({ data }: HistogramProps) {
  // Mapear los registros para convertir los niveles de riesgo en texto
  const chartData = data.registros.map((reg) => ({
    name: `Medición ${reg.id}`,
    riskValue: riskValueToNumeric(reg.RiskLevel), // Convertir el nivel de riesgo a un valor numérico para el gráfico
    riskLevelText: reg.RiskLevel, // Mantener el texto del riesgo
  }));

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line type="monotone" dataKey="riskValue" stroke="#8884d8" dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}

// Componente personalizado para el tooltip
const CustomTooltip = ({ payload, label }: any) => {
  if (!payload || payload.length === 0) return null;

  const riskText = payload[0].payload.riskLevelText;

  return (
    <div className="tooltip">
      <p>{`Medición: ${label}`}</p>
      <p>{`RiskLevel: ${riskText}`}</p>
    </div>
  );
};
