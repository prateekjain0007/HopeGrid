import React from "react";
import ReportList from "../components/ReportList";

const Alerts = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-blue-800 mb-6">Live Disaster Alerts</h1>
        <ReportList />
      </div>
    </div>
  );
};

export default Alerts;
