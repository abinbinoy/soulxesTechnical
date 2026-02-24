"use client";
import { useState } from "react";
import { PlaneTakeoff, PlaneLanding, ArrowLeftRight, CalendarIcon, Users, Search, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import flightData from "../data/flightData.json";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface SearchCriteria {
    airline: string;
    travelClass: string;
    from: string;
    to: string;
    departureDate?: Date;
    returnDate?: Date;
}

interface FlightSearchProps {
    onSearch?: (criteria: SearchCriteria) => void;
}

const SearchFlight = ({ onSearch }: FlightSearchProps) => {
    const [selectedAirline, setSelectedAirline] = useState("");
    const [travelClass, setTravelClass] = useState("");
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [departureDate, setDepartureDate] = useState<Date | undefined>(undefined);
    const [returnDate, setReturnDate] = useState<Date | undefined>(undefined);

    const travelClasses = [...new Set(flightData.flights.map(flight => flight.travelClass))];

    const airlines = flightData.flights
        .map(flight => ({ code: flight.airlineCode, name: flight.airline }))
        .filter((airline, index, self) =>
            index === self.findIndex(item => item.code === airline.code)
        );

    const handleFromTo = () => {
        const temp = from;
        setFrom(to);
        setTo(temp);
    };

    const handleSearch = () => {
        if (onSearch) {
            onSearch({
                airline: selectedAirline,
                travelClass,
                from,
                to,
                departureDate,
                returnDate
            });
        }
    };

    return (
        <div className="w-full bg-white py-6 px-4 md:py-8 md:px-8 border-b border-gray-200">
            <div className="max-w-5xl mx-auto">
                <div className="flex flex-wrap gap-3 md:gap-4 mb-4">
                    <div className="relative w-full sm:w-auto">
                        <select
                            value={selectedAirline}
                            onChange={(e) => setSelectedAirline(e.target.value)}
                            className="appearance-none w-full bg-white border border-gray-300 rounded-sm px-4 py-2 pr-8 text-gray-600 text-sm focus:outline-none focus:ring-1 cursor-pointer"
                        >
                            <option value="">Select Flight</option>
                            {airlines.map((airline) => (
                                <option key={airline.code} value={airline.code}>{airline.name}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    </div>
                    <div className="relative w-full sm:w-auto">
                        <select
                            value={travelClass}
                            onChange={(e) => setTravelClass(e.target.value)}
                            className="appearance-none w-full bg-white border border-gray-300 rounded-sm px-4 py-2 pr-8 text-gray-600 text-sm focus:outline-none focus:ring-1 cursor-pointer"
                        >
                            <option value="">Select Class</option>
                            {travelClasses.map((cls) => (
                                <option key={cls} value={cls}>{cls}</option>
                            ))}
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    </div>
                    <div className="relative w-full sm:w-auto">
                        <select
                            className="appearance-none w-full bg-white border border-gray-300 rounded-sm px-4 py-2 pr-8 text-gray-600 text-sm focus:outline-none focus:ring-1 cursor-pointer"
                        >
                            <option value="">Select Trip</option>
                            <option value="domestic">Domestic</option>
                            <option value="international">International</option>
                        </select>
                        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row gap-3 md:gap-4 items-stretch lg:items-center">
                    <div className="flex flex-col sm:flex-row gap-2">
                        <div className="relative flex-1 lg:w-40">
                            <PlaneTakeoff className="absolute text-gray-500 left-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
                            <input
                                type="text"
                                value={from}
                                onChange={(e) => setFrom(e.target.value)}
                                placeholder="From"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1"
                            />
                        </div>
                        <button
                            onClick={handleFromTo}
                            className="p-2 cursor-pointer bg-gray-100 rounded-sm text-primary hover:bg-primary-dark hover:text-white transition-colors self-center"
                        >
                            <ArrowLeftRight className="w-5 h-5" />
                        </button>
                        <div className="relative flex-1 lg:w-40">
                            <PlaneLanding className="absolute text-gray-500 left-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
                            <input
                                type="text"
                                value={to}
                                onChange={(e) => setTo(e.target.value)}
                                placeholder="To"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 flex-1 lg:flex-none">
                        <Popover>
                            <PopoverTrigger asChild>
                                <button
                                    className={cn(
                                        "cursor-pointer relative flex-1 lg:w-64 w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm text-left focus:outline-none focus:ring-1",
                                        !departureDate && !returnDate ? "text-gray-400" : "text-gray-700"
                                    )}
                                >
                                    <CalendarIcon className="absolute text-gray-500 left-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
                                    {departureDate && returnDate
                                        ? `${format(departureDate, "MMM dd")} - ${format(returnDate, "MMM dd")}`
                                        : departureDate
                                        ? `${format(departureDate, "MMM dd")} - Returning`
                                        : "Departing - Returning"}
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <div className="flex flex-col sm:flex-row gap-4 p-3">
                                    <div>
                                        <p className="text-sm font-medium mb-2 text-gray-700">Departing</p>
                                        <Calendar
                                            mode="single"
                                            selected={departureDate}
                                            onSelect={setDepartureDate}
                                            disabled={(date) => date < new Date()}
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium mb-2 text-gray-700">Returning</p>
                                        <Calendar
                                            mode="single"
                                            selected={returnDate}
                                            onSelect={setReturnDate}
                                            disabled={(date) =>
                                                date < new Date() || (departureDate ? date < departureDate : false)
                                            }
                                        />
                                    </div>
                                </div>
                            </PopoverContent>
                        </Popover>
                        <div className="relative flex-1 lg:w-45">
                            <Users className="absolute text-gray-500 left-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none" />
                            <input
                                type="text"
                                placeholder="Travellers"
                                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-1"
                            />
                        </div>
                    </div>
                    <button
                        onClick={handleSearch}
                        className="flex items-center justify-center cursor-pointer gap-2 px-6 py-2 bg-primary text-white rounded-sm hover:bg-primary-dark transition-colors font-medium w-full lg:w-auto"
                    >
                        <Search className="w-5 h-5" />
                        Search
                    </button>
                </div>
            </div>
        </div>
    );
}
export default SearchFlight;