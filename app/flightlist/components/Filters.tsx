"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import flightData from "../data/flightData.json";

interface FilterState {
  stops: number[];
  airlines: string[];
  baggage: string[];
  departureTime: [number, number];
  arrivalTime: [number, number];
}

interface FlightFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
}
const airlines = flightData.flights
  .map(flight => ({
    code: flight.airlineCode,
    name: flight.airline,
    price: Math.min(...flightData.flights
      .filter(flgt => flgt.airlineCode === flight.airlineCode)
      .map(flgt => flgt.price))
  }))
  .filter((airline, index, self) =>
    index === self.findIndex(item => item.code === airline.code)
  );

const stopOptions = [
  { label: "Nonstop", value: 0, price: 110, count: 23 },
  { label: "1 Stop", value: 1, price: 324, count: 4 },
  { label: "2+ Stops", value: 2, price: 349, count: 2 },
];
const baggageOptions = [
  { label: "Carry-on bag", price: 129 },
  { label: "Checked bag", price: 99 },
];

const Filters = ({ onFilterChange }: FlightFiltersProps) => {
  const [selectedStops, setSelectedStops] = useState<number[]>([]);
  const [selectedAirlines, setSelectedAirlines] = useState<string[]>([]);
  const [selectedBaggage, setSelectedBaggage] = useState<string[]>([]);
  const [departureTime, setDepartureTime] = useState<[number, number]>([0, 24]);
  const [arrivalTime, setArrivalTime] = useState<[number, number]>([0, 24]);

  const handleStopChange = (value: number, checked: boolean) => {
    if (checked) {
      setSelectedStops([...selectedStops, value]);
    } else {
      setSelectedStops(selectedStops.filter(stop => stop !== value));
    }
  };

  const handleAirlineChange = (code: string, checked: boolean) => {
    let updatedAirlines: string[];

    if (checked) {
      updatedAirlines = [...selectedAirlines, code];
    } else {
      updatedAirlines = selectedAirlines.filter(airline => airline !== code);
    }

    setSelectedAirlines(updatedAirlines);

    if (onFilterChange) {
      onFilterChange({
        stops: selectedStops,
        airlines: updatedAirlines,
        baggage: selectedBaggage,
        departureTime: departureTime,
        arrivalTime: arrivalTime,
      });
    }
  };

  const handleBaggageChange = (label: string, checked: boolean) => {
    if (checked) {
      setSelectedBaggage([...selectedBaggage, label]);
    } else {
      setSelectedBaggage(selectedBaggage.filter(bag => bag !== label));
    }
  };

  const handleDepTime = (value: number[]) => {
    const newDepartureTime = value as [number, number];
    setDepartureTime(newDepartureTime);

    if (onFilterChange) {
      onFilterChange({
        stops: selectedStops,
        airlines: selectedAirlines,
        baggage: selectedBaggage,
        departureTime: newDepartureTime,
        arrivalTime: arrivalTime,
      });
    }
  };

  const handleTime = (value: number[]) => {
    const newArrivalTime = value as [number, number];
    setArrivalTime(newArrivalTime);

    if (onFilterChange) {
      onFilterChange({
        stops: selectedStops,
        airlines: selectedAirlines,
        baggage: selectedBaggage,
        departureTime: departureTime,
        arrivalTime: newArrivalTime,
      });
    }
  };

  const formatTime = (hour: number) => {
    const h = Math.floor(hour);
    const period = h >= 12 ? "PM" : "AM";
    const displayHour = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return `${displayHour}:00 ${period}`;
  };

  const handleReset = () => {
    setSelectedStops([]);
    setSelectedAirlines([]);
    setSelectedBaggage([]);
    setDepartureTime([0, 24]);
    setArrivalTime([0, 24]);

    if (onFilterChange) {
      onFilterChange({
        stops: [],
        airlines: [],
        baggage: [],
        departureTime: [0, 24],
        arrivalTime: [0, 24],
      });
    }
  };

  const handleApply = () => {
    if (onFilterChange) {
      onFilterChange({
        stops: selectedStops,
        airlines: selectedAirlines,
        baggage: selectedBaggage,
        departureTime: departureTime,
        arrivalTime: arrivalTime,
      });
    }
  };

  return (
    <Card className="w-full lg:w-56 h-fit rounded-[5px] gap-2!">
      <CardHeader className="pb-2!important">
        <CardTitle className="text-base">Filter By</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Stop</h3>
            <span className="text-sm font-medium">From</span>
          </div>
          <div className="space-y-2">
            {stopOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedStops.includes(option.value)}
                    onCheckedChange={(checked) => handleStopChange(option.value, checked as boolean)}
                    className="cursor-pointer"
                  />
                  <span className="text-sm">
                    {option.label}({option.count})
                  </span>
                </div>
                <span className="text-sm">${option.price}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Airlines</h3>
            <span className="text-sm font-medium">From</span>
          </div>
          <div className="space-y-2">
            {airlines.map((airline) => (
              <label
                key={airline.code}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedAirlines.includes(airline.code)}
                    onCheckedChange={(checked) => handleAirlineChange(airline.code, checked as boolean)}
                    className="cursor-pointer"
                  />
                  <span className="text-sm">{airline.name}</span>
                </div>
                <span className="text-sm">${airline.price}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium">Travel and Baggage</h3>
            <span className="text-sm font-medium">From</span>
          </div>
          <div className="space-y-2">
            {baggageOptions.map((option) => (
              <label
                key={option.label}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedBaggage.includes(option.label)}
                    onCheckedChange={(checked) => handleBaggageChange(option.label, checked as boolean)}
                    className="cursor-pointer"
                  />
                  <span className="text-sm">{option.label}</span>
                </div>
                <span className="text-sm">${option.price}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-1">Departure Time</h3>
          <p className="text-xs mb-3">
            {formatTime(departureTime[0])} - {formatTime(departureTime[1])}
          </p>
          <Slider
            min={0}
            max={24}
            step={1}
            value={departureTime}
            onValueChange={handleDepTime}
            className="cursor-pointer"
          />
        </div>
        <div>
          <h3 className="text-sm font-medium mb-1">Arrival Time</h3>
          <p className="text-xs mb-3">
            {formatTime(arrivalTime[0])} - {formatTime(arrivalTime[1])}
          </p>
          <Slider
            min={0}
            max={24}
            step={1}
            value={arrivalTime}
            onValueChange={handleTime}
            className="cursor-pointer"
          />
        </div>
        <div className="flex gap-2 pt-2">
          <Button variant="outline" className="flex-1 border-none text-primary shadow-none cursor-pointer" onClick={handleReset}>
            Reset
          </Button>
          <Button className="flex-1 rounded-sm cursor-pointer" onClick={handleApply}>
            Apply Filters
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
export default Filters;