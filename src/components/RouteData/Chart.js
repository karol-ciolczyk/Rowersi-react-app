import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  CartesianGrid,
} from "recharts";

export const Chart = function (props) {
  const { manageMarker, removeMarker } = props;

  return (
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart
        data={props.routeData.chartData}
        onMouseMove={manageMarker}
        onMouseLeave={removeMarker}
      >
        <defs>
          <linearGradient id="color" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2451B7" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#2451B7" stopOpacity={0.1} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="elevation"
          stroke="#2451B7"
          fill="url(#color)"
        />
        <XAxis
          dataKey="distance"
          axisLine={false}
          tickLine={false}
          // tickFormatter={(number) => `${number} m`}
        />
        <YAxis
          dataKey="elevation"
          axisLine={false}
          tickLine={false}
          tickCount={10}
          // tickFormatter={(number) => `${number} m`}
        />
        {/* <Tooltip content={<CustomTooltip />} /> */}
        <Tooltip />
        <CartesianGrid opacity={0.2} vertical={false} />
      </AreaChart>
    </ResponsiveContainer>
  );
};
