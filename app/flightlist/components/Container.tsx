"use client";
import { useState } from "react";
import Filters from "./Filters";
import Results from "./Results";
import SideBarAd from "./SideBarAd";
import flightData from "../data/flightData.json";
import { Flight } from "../types/FlightDataTypes";

const allFlights = flightData.flights as Flight[];

type FilterState = {
  airlines: string[];
  departureTime: [number, number];
  arrivalTime: [number, number];
};

type SearchCriteria = {
  airline: string;
  travelClass: string;
  from: string;
  to: string;
};

const Container = ({ search }: { search?: SearchCriteria }) => {
  const [filters, setFilters] = useState<FilterState>({
    airlines: [],
    departureTime: [0, 24],
    arrivalTime: [0, 24],
  });

  const getFlights = () => {
    let results = allFlights;

    if (search) {
      if (search.airline) {
        results = results.filter(flight => flight.airlineCode === search.airline);
      }
      if (search.travelClass) {
        results = results.filter(flight => flight.travelClass === search.travelClass);
      }
      if (search.from) {
        const from = search.from.toLowerCase();
        results = results.filter(flight =>
          flight.departure.city.toLowerCase().includes(from) ||
          flight.departure.airport.toLowerCase().includes(from)
        );
      }
      if (search.to) {
        const to = search.to.toLowerCase();
        results = results.filter(flight =>
          flight.arrival.city.toLowerCase().includes(to) ||
          flight.arrival.airport.toLowerCase().includes(to)
        );
      }
    }

    if (filters.airlines.length > 0) {
      results = results.filter(flight => filters.airlines.includes(flight.airlineCode));
    }

    if (filters.departureTime[0] > 0 || filters.departureTime[1] < 24) {
      results = results.filter(flight => {
        const hour = parseInt(flight.departure.time.split(":")[0]);
        return hour >= filters.departureTime[0] && hour <= filters.departureTime[1];
      });
    }

    if (filters.arrivalTime[0] > 0 || filters.arrivalTime[1] < 24) {
      results = results.filter(flight => {
        const hour = parseInt(flight.arrival.time.split(":")[0]);
        return hour >= filters.arrivalTime[0] && hour <= filters.arrivalTime[1];
      });
    }
    return results;
  };

  const flights = getFlights();

  return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 p-4 lg:p-6 bg-gray-100 min-h-screen items-start">
      <div className="w-full lg:w-auto">
        <Filters onFilterChange={setFilters} />
      </div>
      <Results flights={flights} />
      <div className="hidden xl:block">
        <SideBarAd />
      </div>
    </div>
  );
}
export default Container;