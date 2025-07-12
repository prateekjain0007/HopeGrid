import React, { useState, useEffect } from "react";

const ReportList = () => {
  const [reports, setReports] = useState([]);
  const [filteredReports, setFilteredReports] = useState([]);
  const [severityFilter, setSeverityFilter] = useState("");

  const API_BASE = process.env.REACT_APP_API_URL;

  useEffect(() => {
    fetch(`${API_BASE}/reports`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch reports");
        return res.json();
      })
      .then((data) => {
        setReports(data);
        setFilteredReports(data);
      })
      .catch((err) => {
        console.error("Error fetching reports:", err);
      });
  }, [API_BASE]);

  useEffect(() => {
    if (severityFilter === "") {
      setFilteredReports(reports);
    } else {
      setFilteredReports(
        reports.filter(
          (r) => r.severity?.toLowerCase() === severityFilter.toLowerCase()
        )
      );
    }
  }, [severityFilter, reports]);

  const getIcon = (type) => {
    switch (type) {
      case "Flood": return "🌊";
      case "Earthquake": return "🌎";
      case "Fire": return "🔥";
      case "Cyclone": return "🌀";
      case "Landslide": return "⛰️";
      case "Other": return "⚠️";
      default: return "❓";
    }
  };

  return (
    <div className="p-6 bg-gradient-to-b from-white via-blue-50 to-white min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6 animate-fadeIn">
          <h2 className="text-2xl font-bold text-blue-800">Disaster Reports</h2>
          <div className="flex items-center space-x-2">
            <label className="font-semibold text-blue-600">Severity:</label>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="border border-blue-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="">All</option>
              <option value="Low">Low</option>
              <option value="Moderate">Moderate</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
          {filteredReports.length > 0 ? (
            filteredReports.map((report) => {
              const disaster = report.disasterType || report.type || "Other";
              return (
                <div
                  key={report._id}
                  className={`p-5 bg-white shadow-lg border-l-4 rounded-lg transition transform hover:scale-[1.02] ${
                    report.severity === "High"
                      ? "border-red-500"
                      : report.severity === "Moderate"
                      ? "border-yellow-500"
                      : "border-green-500"
                  }`}
                >
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {getIcon(disaster)} {disaster}
                  </h3>
                  <p className="text-gray-600 mb-1">{report.description}</p>
                  <p className="text-sm">
                    <strong className="text-gray-700">Severity:</strong>{" "}
                    <span
                      className={`font-semibold ${
                        report.severity === "High"
                          ? "text-red-600"
                          : report.severity === "Moderate"
                          ? "text-yellow-600"
                          : "text-green-600"
                      }`}
                    >
                      {report.severity}
                    </span>
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Location:</strong> {report.location}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Date:</strong>{" "}
                    {new Date(report.date).toLocaleString()}
                  </p>
                </div>
              );
            })
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No reports available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportList;




