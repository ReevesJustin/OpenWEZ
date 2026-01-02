import { useMemo } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ProbabilityChartProps {
  pHitByRange: Record<number, number>;
}

export function ProbabilityChart({ pHitByRange }: ProbabilityChartProps) {
  const chartData = useMemo(() => {
    const ranges = Object.keys(pHitByRange).sort((a, b) => Number(a) - Number(b));
    const probabilities = ranges.map((r) => (pHitByRange[Number(r)] * 100).toFixed(1));

    return {
      labels: ranges,
      datasets: [
        {
          label: 'Probability of Hit (%)',
          data: probabilities,
          borderColor: 'rgb(75, 192, 192)',
          backgroundColor: 'rgba(75, 192, 192, 0.5)',
          tension: 0.1,
        },
      ],
    };
  }, [pHitByRange]);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Hit Probability vs Range',
      },
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        title: {
          display: true,
          text: 'P(hit) %',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Range (yards)',
        },
      },
    },
  };

  return <Line options={options} data={chartData} />;
}
