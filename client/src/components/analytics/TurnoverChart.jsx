import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function TurnoverChart({ data }) {
  if (!data) return null;

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Turnover Rate (x times per year)',
        data: data.rates,
        backgroundColor: '#10b981',
        borderRadius: 4,
        barThickness: 'flex',
        maxBarThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1a1a24',
        titleColor: '#f4f4f5',
        bodyColor: '#a1a1aa',
        borderColor: 'rgba(255,255,255,0.06)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 10,
        callbacks: {
          label: (ctx) => ` Turnover: ${ctx.parsed.y}x`,
        },
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { color: '#a1a1aa', font: { size: 11, family: 'Inter' } }, border: { display: false } },
      y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#52525b', font: { size: 11 } }, border: { display: false } },
    },
  };

  return (
    <div className="glass-card" style={{ padding: '20px 24px', height: '100%' }}>
      <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px' }}>Inventory Turnover by Category</h3>
      <div style={{ height: 'calc(100% - 40px)', minHeight: '260px' }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
