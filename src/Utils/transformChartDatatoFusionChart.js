export const transformDbDataToFusionChart = (dbData, groupByField) => {
  if (!dbData || dbData.length === 0) return { categories: [], dataset: [] };

  const monthMap = {};

  dbData.forEach((item) => {
    const month = item.USAGE_DATE.substring(0, 7);
    if (!monthMap[month]) {
      monthMap[month] = {};
    }

    const groupValue = item[groupByField] || "Unknown";
    monthMap[month][groupValue] = (monthMap[month][groupValue] || 0) + (item.TOTAL_USAGE_COST || 0);
  });

  // 1. Find total cost per group
  const groupTotals = {};
  dbData.forEach(item => {
    const groupValue = item[groupByField] || "Unknown";
    groupTotals[groupValue] = (groupTotals[groupValue] || 0) + (item.TOTAL_USAGE_COST || 0);
  });

  // 2. Sort groups by total cost descending
  const sortedGroups = Object.keys(groupTotals).sort((a, b) => groupTotals[b] - groupTotals[a]);

  // 3. Take top 5 groups, others become "Others"
  const topGroups = sortedGroups.slice(0, 5);
  const otherGroups = sortedGroups.slice(5);

  // 4. Build categories (months)
  const categories = Object.keys(monthMap).map((month) => ({
    label: month,
  }));

  // 5. Build dataset
  const dataset = [];

  topGroups.forEach((group) => {
    dataset.push({
      seriesname: group,
      data: Object.keys(monthMap).map((month) => ({
        value: monthMap[month][group] || 0,
      })),
    });
  });

  // 6. Build "Others" dataset
  const othersData = Object.keys(monthMap).map((month) => {
    let othersTotal = 0;
    otherGroups.forEach((group) => {
      othersTotal += monthMap[month][group] || 0;
    });
    return { value: othersTotal };
  });

  if (othersData.some(point => point.value > 0)) {
    dataset.push({
      seriesname: "Others",
      data: othersData,
    });
  }

  return { categories, dataset };
};
