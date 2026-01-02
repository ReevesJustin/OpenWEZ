import { useMemo } from 'react';
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  ChartOptions,
} from 'chart.js';
import { Scatter } from 'react-chartjs-2';
import type { ImpactPoint } from '../../types';

ChartJS.register(
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface ImpactScatterPlotProps {
  impactPoints: ImpactPoint[];
  targetWidth: number;
  targetHeight: number;
  meanX: number;
  meanY: number;
  maxRange?: number;
  pHitAtMaxRange?: number;
}

export function ImpactScatterPlot({
  impactPoints,
  targetWidth,
  targetHeight,
  meanX,
  meanY,
  maxRange,
  pHitAtMaxRange,
}: ImpactScatterPlotProps) {
  const { chartData, axisLimit } = useMemo(() => {
    // Center all impacts relative to mean point (so MPI is at origin)
    // This shows the dispersion pattern centered on the target
    const impacts = impactPoints.map((p) => ({
      x: p.x - meanX,
      y: p.y - meanY
    }));

    // Create target rectangle outline centered at origin
    const halfW = targetWidth / 2;
    const halfH = targetHeight / 2;
    const targetOutline = [
      { x: -halfW, y: halfH },
      { x: halfW, y: halfH },
      { x: halfW, y: -halfH },
      { x: -halfW, y: -halfH },
      { x: -halfW, y: halfH },
    ];

    // Mean point of impact is now at origin (0, 0)
    const mpi = [{ x: 0, y: 0 }];

    // Calculate the maximum extent of all data points (impacts + target)
    const allX = [...impacts.map(p => Math.abs(p.x)), halfW];
    const allY = [...impacts.map(p => Math.abs(p.y)), halfH];
    const maxX = Math.max(...allX);
    const maxY = Math.max(...allY);

    // Use the larger dimension for both axes to maintain 1:1 aspect ratio
    // Add 20% padding for visual clarity
    const axisLimit = Math.max(maxX, maxY) * 1.2;

    return {
      chartData: {
        datasets: [
          {
            label: 'Target Outline',
            data: targetOutline,
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.1)',
            showLine: true,
            fill: false,
            pointRadius: 0,
            borderWidth: 2,
          },
          {
            label: 'Impact Points',
            data: impacts,
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            borderColor: 'rgba(53, 162, 235, 0.8)',
            pointRadius: 3,
            pointHoverRadius: 5,
          },
          {
            label: 'Mean Point of Impact',
            data: mpi,
            backgroundColor: 'rgb(255, 206, 86)',
            borderColor: 'rgb(255, 159, 64)',
            pointRadius: 15,
            pointStyle: 'crossRot',
            pointHoverRadius: 18,
            borderWidth: 4,
          },
        ],
      },
      axisLimit,
    };
  }, [impactPoints, targetWidth, targetHeight, meanX, meanY]);

  const options: ChartOptions<'scatter'> = {
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: maxRange && pHitAtMaxRange !== undefined
          ? `Impact Distribution at ${maxRange} yards - P(hit) = ${(pHitAtMaxRange * 100).toFixed(1)}%`
          : 'Impact Distribution at Target',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            if (context.dataset.label === 'Impact Points' && context.parsed.x !== null && context.parsed.y !== null) {
              return `(${context.parsed.x.toFixed(1)}", ${context.parsed.y.toFixed(1)}")`;
            }
            return context.dataset.label || '';
          }
        }
      },
    },
    scales: {
      x: {
        type: 'linear' as const,
        position: 'bottom' as const,
        min: -axisLimit,
        max: axisLimit,
        title: {
          display: true,
          text: 'Horizontal Displacement (inches)',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
      y: {
        type: 'linear' as const,
        min: -axisLimit,
        max: axisLimit,
        title: {
          display: true,
          text: 'Vertical Displacement (inches)',
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
        },
      },
    },
  };

  return <Scatter options={options} data={chartData} />;
}
