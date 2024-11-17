import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Zap } from "lucide-react";
import { Card } from "../common/Card";
import { LoadingSpinner } from "../common/LoadingSpinner";
import { ChartTooltip } from "../charts/ChartTooltip";
import { chartTheme } from "../../theme";

export const EnergyConsumptionChart = ({ data, loading }) => {
  if (loading) {
    return (
      <Card title="Energy Consumption" icon={Zap}>
        <div className="h-[400px] flex items-center justify-center">
          <LoadingSpinner />
        </div>
      </Card>
    );
  }

  return (
    <Card title="Energy Consumption" icon={Zap}>
      <div className="h-[400px] w-full">
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
          >
            <defs>
              <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor={chartTheme.primaryColor}
                  stopOpacity={0.2}
                />
                <stop
                  offset="95%"
                  stopColor={chartTheme.primaryColor}
                  stopOpacity={0}
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
              tick={{ fill: chartTheme.textColor, fontSize: 12 }}
              tickLine={{ stroke: chartTheme.gridColor }}
              axisLine={{ stroke: chartTheme.gridColor }}
              label={{
                value: "Energy Consumption (kWh)",
                angle: -90,
                position: "insideLeft",
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
            <Line
              type="monotone"
              dataKey="energy_consumption"
              stroke={chartTheme.primaryColor}
              strokeWidth={2}
              name="Energy Consumption (kWh)"
              dot={{ fill: chartTheme.primaryColor, strokeWidth: 2 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
