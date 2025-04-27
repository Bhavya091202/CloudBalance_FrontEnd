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


// export const transformDbDataToFusionChart = (dbData) => {
//   if (!dbData || dbData.length === 0) return { categories: [], dataset: [] };

//   const monthMap = {};

//   dbData.forEach((item) => {
//     const month = item.USAGE_DATE.substring(0, 7);
//     if (!monthMap[month]) {
//       monthMap[month] = {};
//     }
//     monthMap[month][item.MYCLOUD_REGIONNAME] = item.TOTAL_USAGE_COST || 0;
//   });

//   // Aggregate Total Usage per service
//   const serviceTotals = dbData.reduce((acc, item) => {
//     acc[item.MYCLOUD_REGIONNAME] = (acc[item.MYCLOUD_REGIONNAME] || 0) + (item.TOTAL_USAGE_COST || 0);
//     return acc;
//   }, {});

//   // Sort services by total cost
//   const sortedServices = Object.entries(serviceTotals)
//     .sort(([, a], [, b]) => b - a)
//     .map(([name]) => name);

//   // Top 5 + "Others"
//   const top5Services = sortedServices.slice(0, 5);
//   const isTop5 = new Set(top5Services);

//   const categories = Object.keys(monthMap).map((month) => ({ label: month }));

//   const datasetMap = {};

//   // Build dataset for Top 5 and Others
//   Object.keys(monthMap).forEach((month) => {
//     Object.entries(monthMap[month]).forEach(([region, cost]) => {
//       const key = isTop5.has(region) ? region : "Others";
//       if (!datasetMap[key]) datasetMap[key] = {};
//       datasetMap[key][month] = (datasetMap[key][month] || 0) + cost;
//     });
//   });

//   const dataset = Object.keys(datasetMap).map((region) => ({
//     seriesname: region,
//     data: categories.map((month) => ({
//       value: datasetMap[region][month.label] || 0,
//     })),
//   }));

//   return { categories, dataset };
// };
