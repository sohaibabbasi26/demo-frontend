import React from 'react';
import { PieChart, Pie, Cell, Label, ResponsiveContainer } from 'recharts';

interface DonutChartProps {
  label: string;
  percentage: number;
  colors?: string[]; 
}

const DonutChart: React.FC<DonutChartProps> = ({ label, percentage, colors = ['#BB90F0', '#e0e0e0'] }) => {
  const data = [
    { name: 'Completed', value: percentage },
    { name: 'Remaining', value: 100 - percentage },
  ];

  return (
    <div className="flex flex-col   items-center justify-center">
      <ResponsiveContainer width="90%"  height={120}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={50}
            innerRadius={40}
            startAngle={90}
            endAngle={-270}
            paddingAngle={5}
            stroke="none"
            isAnimationActive={false}
          >
            <Cell key="cell1" fill={colors[0]} />
            <Cell key="cell2" fill={colors[1]} />
            <Label
              value={percentage}
              position="center"
              fontSize={22}
              fontWeight="700"
              fill="#282828"
            />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="text-[22px] mt-4 font-poppins font-[400] text-[#282828]">{label}</div>
    </div>
  );
};

export default DonutChart;
