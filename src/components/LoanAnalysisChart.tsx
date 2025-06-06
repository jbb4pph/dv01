import React from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts'
import { GradeTotals } from './TableView';

type Props = {
  totals: GradeTotals
}

export const LoanAnalysisChart = (props: Props) => {

  const data = Object.entries(props.totals).map(([grade, Total]) => {
    return { name: `Grade ${grade}`, Total };
  });

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis label={""} />
        <Tooltip />
        <Legend />
        <Bar dataKey="Total" fill="#8884d7" />
      </BarChart>
    </ResponsiveContainer>
  );
}

