export const transformDbDataToTableChart = (dbData, groupByField) => {
    if (!dbData || dbData.length === 0 || !groupByField) return { columns: [], rows: [] };
  
    const monthMap = {};
  
    dbData.forEach((item) => {
      const month = item.USAGE_DATE?.substring(0, 7) || "Unknown Month";
      if (!monthMap[month]) {
        monthMap[month] = {};
      }
      const groupValue = item[groupByField] || "Unknown";
      monthMap[month][groupValue] = (monthMap[month][groupValue] || 0) + (item.TOTAL_USAGE_COST || 0);
    });
  
    const allGroups = Array.from(new Set(
      dbData.map((item) => item[groupByField] || "Unknown")
    ));
  
    const categories = Object.keys(monthMap).map((month) => ({ label: month }));
  
    const columns = [
      { key: "service", label: "Service" },
      ...categories.map(cat => ({
        key: cat.label,
        label: cat.label,
      })),
      { key: "total", label: "Total" }
    ];
  
    const rows = allGroups.map(group => {
      let total = 0;
      const row = {
        service: group,
      };
  
      categories.forEach(({ label }) => {
        const value = monthMap[label]?.[group] || 0;
        row[label] = `$${value.toFixed(2)}`;
        total += value;
      });
  
      row.total = `$${total.toFixed(2)}`;
  
      return row;
    });
  
    return { columns, rows };
  };
  