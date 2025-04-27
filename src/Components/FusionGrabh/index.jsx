import React from "react";
import FusionCharts from "fusioncharts";
import Charts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import ReactFusioncharts from "react-fusioncharts";

ReactFusioncharts.fcRoot(FusionCharts, Charts, FusionTheme);

const FusionChartWrapper = ({ chartConfig }) => {
  if (!chartConfig) return <div>Loading Chart...</div>;

  return (
    <ReactFusioncharts
      {...chartConfig}
    />
  );
};

export default FusionChartWrapper;
