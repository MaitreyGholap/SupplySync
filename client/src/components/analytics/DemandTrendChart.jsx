import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function DemandTrendChart({ data }) {
  if (!data) return null;

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: 'Actual Demand',
        data: data.actual,
        borderColor: '#6366f1',
        backgroundColor: '#6366f1',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
      {
        label: 'Predicted Demand',
        data: data.predicted,
        borderColor: '#a78bfa',
        backgroundColor: '#a78bfa',
        borderWidth: 2,
        borderDash: [5, 5],
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: { mode: 'index', intersect: false },
    plugins: {
      legend: {
        position: 'top',
        align: 'end',
        labels: { color: '#a1a1aa', font: { size: 12, family: 'Inter' }, usePointStyle: true, pointStyle: 'rectRounded' },
      },
      tooltip: {
        backgroundColor: '#1a1a24',
        titleColor: '#f4f4f5',
        bodyColor: '#a1a1aa',
        borderColor: 'rgba(255,255,255,0.06)',
        borderWidth: 1,
        padding: 12,
        cornerRadius: 10,
      },
    },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#52525b', font: { size: 11 } }, border: { display: false } },
      y: { grid: { color: 'rgba(255,255,255,0.03)' }, ticks: { color: '#52525b', font: { size: 11 } }, border: { display: false } },
    },
  };

  return (
    <div className="glass-card" style={{ padding: '20px 24px', height: '100%' }}>
      <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px' }}>Demand Forecasting (Actual vs Predicted)</h3>
      <div style={{ height: 'calc(100% - 40px)', minHeight: '260px' }}>
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}
