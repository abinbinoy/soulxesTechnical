"use client";
import { useState } from "react";
import Filters from "./Filters";
import Results from "./Results";
import SideBarAd from "./SideBarAd";
import flightData from "../data/flightData.json";
import { Flight } from "../types/FlightDataTypes";

const allFlights = flightData.flights as Flight[];

type FilterState = {
  stops: number[];
  airlines: string[];
  departureTime: [number, number];
  arrivalTime: [number, number];
};

type SearchCriteria = {
  airline: string;
  travelClass: string;
  from: string;
  to: string;
  departure?: Date;
  return?: Date;
};

const parseDate = (dateStr: string): Date => {
  const parts = dateStr.split(", ")[1];
  const [day, month, year] = parts.split(" ");
  const monthMap: { [key: string]: number } = {
    Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
    Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
  };
  return new Date(parseInt(year), monthMap[month], parseInt(day));
};

const Container = ({ search }: { search?: SearchCriteria }) => {
  const [filters, setFilters] = useState<FilterState>({
    stops: [],
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
      if (search.departure) {
        const searchDepDate = new Date(search.departure);
        searchDepDate.setHours(0, 0, 0, 0);
        results = results.filter(flight => {
          const flightDate = parseDate(flight.departure.date);
          flightDate.setHours(0, 0, 0, 0);
          return flightDate.getTime() === searchDepDate.getTime();
        });
      }
      if (search.return && search.departure) {
        const searchRetDate = new Date(search.return);
        searchRetDate.setHours(0, 0, 0, 0);
        results = results.filter(flight => {
          if (!flight.returnFlight) return false;
          const returnFlightDate = parseDate(flight.returnFlight.departure.date);
          returnFlightDate.setHours(0, 0, 0, 0);
          return returnFlightDate.getTime() === searchRetDate.getTime();
        });
      }
    }

    if (filters.stops.length > 0) {
      results = results.filter(flight => {
        if (filters.stops.includes(2) && flight.stops >= 2) {
          return true;
        }
        return filters.stops.includes(flight.stops);
      });
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