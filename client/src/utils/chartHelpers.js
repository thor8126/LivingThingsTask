export const calculateAverages = (data, key) => {
  if (!data || !data.length) return 0;
  const sum = data.reduce((acc, item) => acc + (item[key] || 0), 0);
  return (sum / data.length).toFixed(2);
};

export const findMinMax = (data, key) => {
  if (!data || !data.length) return { min: 0, max: 0 };

  const values = data.map((item) => item[key] || 0);
  return {
    min: Math.min(...values),
    max: Math.max(...values),
  };
};

export const aggregateDataByDate = (data, key) => {
  if (!data || !data.length) return [];

  const aggregated = data.reduce((acc, item) => {
    const date = item.createdAt.split("T")[0];
    if (!acc[date]) {
      acc[date] = {
        date,
        total: 0,
        count: 0,
      };
    }
    acc[date].total += item[key] || 0;
    acc[date].count += 1;
    return acc;
  }, {});

  return Object.values(aggregated).map((item) => ({
    date: item.date,
    value: (item.total / item.count).toFixed(2),
  }));
};

export const generateChartColors = (count) => {
  const colors = [
    "#8884d8",
    "#82ca9d",
    "#ffc658",
    "#ff7300",
    "#0088fe",
    "#00c49f",
    "#ffbb28",
    "#ff8042",
  ];

  const result = [];
  for (let i = 0; i < count; i++) {
    result.push(colors[i % colors.length]);
  }
  return result;
};

export const formatChartValue = (value, unit = "", decimals = 2) => {
  if (typeof value !== "number") return value;

  const formatted = Number(value).toFixed(decimals);
  return unit ? `${formatted} ${unit}` : formatted;
};

export const calculatePercentageChange = (current, previous) => {
  if (!previous) return null;
  return (((current - previous) / previous) * 100).toFixed(2);
};

export const smoothData = (data, key, windowSize = 3) => {
  if (!data || data.length < windowSize) return data;

  return data.map((item, index) => {
    const window = data.slice(
      Math.max(0, index - Math.floor(windowSize / 2)),
      Math.min(data.length, index + Math.floor(windowSize / 2) + 1)
    );

    const smoothedValue =
      window.reduce((sum, curr) => sum + (curr[key] || 0), 0) / window.length;

    return {
      ...item,
      [key]: Number(smoothedValue.toFixed(2)),
    };
  });
};
