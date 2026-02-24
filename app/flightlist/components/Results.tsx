"use client";
import { useState } from "react";
import { Zap, LucideThumbsUp, CircleDollarSign } from "lucide-react";
import ResultList from "./ResultList";
import { Flight } from "../types/FlightDataTypes";

type SortOption = "recommended" | "fastest" | "cheapest";

const parseDuration = (d: string) => parseInt(d.replace(/[^\d]/g, ""));

const Results = ({ flights }: { flights: Flight[] }) => {
  const [sortBy, setSortBy] = useState<SortOption>("recommended");

  const sortedFlights = [...flights];
  if (sortBy === "fastest") {
    sortedFlights.sort((a, b) => parseDuration(a.duration) - parseDuration(b.duration));
  } else if (sortBy === "cheapest") {
    sortedFlights.sort((a, b) => a.price - b.price);
  }

  const minPrice = flights.length ? Math.min(...flights.map(flight => flight.price)) : 0;
  const minDuration = flights.length
    ? flights.reduce((min, flight) => parseDuration(flight.duration) < parseDuration(min) ? flight.duration : min, flights[0].duration)
    : "0h";

  const tabs = [
    { id: "recommended" as const, label: "Recommended", icon: <LucideThumbsUp className="w-5 h-5" /> },
    { id: "fastest" as const, label: "Fastest", icon: <Zap className="w-5 h-5" /> },
    { id: "cheapest" as const, label: "Cheapest", icon: <CircleDollarSign className="w-5 h-5" /> },
  ];

  return (
    <div className="flex-1 min-w-0 w-full">
      <div className="flex bg-white shadow-md mb-4 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSortBy(tab.id)}
            className={`cursor-pointer flex-1 min-w-25 py-2 sm:py-3 px-2 sm:px-4 flex items-center justify-center gap-1 sm:gap-2 border-b-2 transition-colors ${sortBy === tab.id
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
          >
            <span className={sortBy === tab.id ? "text-primary" : "text-gray-400"}>
              {tab.icon}
            </span>
            <div className="flex flex-col items-start">
              <span className="text-xs sm:text-sm font-medium">{tab.label}</span>
              <span className="text-[10px] sm:text-xs text-gray-400 hidden sm:block">
                ${minPrice.toLocaleString()} - {minDuration}
              </span>
            </div>
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {sortedFlights.map((flight) => (
          <ResultList key={flight.id} flight={flight} />
        ))}
      </div>

      {sortedFlights.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No flights found matching your criteria</p>
        </div>
      )}
    </div>
  );
}
export default Results;