import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

export default function TopMovingProducts({ data }) {
  if (!data) return null;

  const chartData = {
    labels: data.map((d) => d.name.length > 20 ? d.name.slice(0, 20) + '…' : d.name),
    datasets: [
      {
        data: data.map((d) => d.velocity),
        backgroundColor: data.map((_, i) => {
          const colors = ['#6366f1', '#8b5cf6', '#a78bfa', '#06b6d4', '#10b981', '#14b8a6', '#f59e0b', '#f97316', '#ef4444', '#ec4899'];
          return colors[i % colors.length];
        }),
        borderRadius: 6,
        barThickness: 18,
      },
    ],
  };

  const options = {
    indexAxis: 'y',
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
          label: (ctx) => ` Movement Score: ${ctx.parsed.x}`,
        },
      },
    },
    scales: {
      x: {
        grid: { color: 'rgba(255,255,255,0.03)' },
        ticks: { color: '#52525b', font: { size: 10 } },
        border: { display: false },
      },
      y: {
        grid: { display: false },
        ticks: { color: '#a1a1aa', font: { size: 11, family: 'Inter' } },
        border: { display: false },
      },
    },
  };

  return (
    <div className="glass-card" style={{ padding: '20px 24px' }}>
      <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px' }}>Top Moving Products</h3>
      <div style={{ height: '280px' }}>
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
}
