import React, { lazy } from "react";

const WidgetsBrand = lazy(() => import("../widgets/WidgetsBrand.js"));
const Widgets = lazy(() => import("../widgets/Widgets"));
const Dashboard = () => {
  return (
    <>
      <WidgetsBrand withCharts />
      <Widgets withCharts />
    </>
  );
};

export default Dashboard;
