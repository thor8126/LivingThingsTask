import React from "react";
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Thermometer, Clock } from "lucide-react";
import { Card } from "../common/Card";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ChartTooltip } from "../charts/ChartTooltip";
import { chartTheme } from "../../theme";

export const ACRunHoursChart = ({ data, loading }) => {
  if (loading) {
    return (
      <Card title="AC Run Hours & Temperature" icon={Thermometer}>
        <div className="h-[400px] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </Card>
    );
  }

  return (
    <Card title="AC Run Hours & Temperature" icon={Clock}>
      <div className="h-[400px] w-full">
        <ResponsiveContainer>
          <ComposedChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <defs>
              <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={chartTheme.primaryColor}
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor={chartTheme.primaryColor}
                  stopOpacity={0.2}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={chartTheme.gridColor}
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tickFormatter={(value) =>
                new Date(value).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }
              angle={-45}
              textAnchor="end"
              tick={{ fill: chartTheme.textColor, fontSize: 12 }}
              tickLine={{ stroke: chartTheme.gridColor }}
            />
            <YAxis
              yAxisId="left"
              tick={{ fill: chartTheme.textColor, fontSize: 12 }}
              tickLine={{ stroke: chartTheme.gridColor }}
              axisLine={{ stroke: chartTheme.gridColor }}
              label={{
                value: "Running Hours",
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle", fill: chartTheme.textColor },
              }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tick={{ fill: chartTheme.textColor, fontSize: 12 }}
              tickLine={{ stroke: chartTheme.gridColor }}
              axisLine={{ stroke: chartTheme.gridColor }}
              label={{
                value: "Temperature (°C)",
                angle: -90,
                position: "insideRight",
                style: { textAnchor: "middle", fill: chartTheme.textColor },
              }}
            />
            <Tooltip content={<ChartTooltip />} />
            <Legend
              wrapperStyle={{
                paddingTop: "20px",
                fontSize: "12px",
              }}
            />
            <Bar
              yAxisId="left"
              dataKey="runningHours"
              fill="url(#barGradient)"
              name="AC Run Hours"
              radius={[4, 4, 0, 0]}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="temperature.max"
              stroke={chartTheme.secondaryColor}
              name="Max Temperature (°C)"
              strokeWidth={2}
              dot={{ fill: chartTheme.secondaryColor, strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="temperature.min"
              stroke={chartTheme.tertiaryColor}
              name="Min Temperature (°C)"
              strokeWidth={2}
              dot={{ fill: chartTheme.tertiaryColor, strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
