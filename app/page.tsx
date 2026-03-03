"use client";

import { useState } from "react";
import Navbar from "./flightlist/components/Navbar";
import SearchFlight from "./flightlist/components/SearchFlight";
import Container from "./flightlist/components/Container";

interface SearchCriteria {
  airline: string;
  travelClass: string;
  from: string;
  to: string;
  departureDate?: Date;
  returnDate?: Date;
  trip: string;
  travellers:string;
}

export default function Home() {
  const [search, setSearch] = useState<SearchCriteria>({
    airline: "",
    travelClass: "",
    from: "",
    to: "",
    departureDate: undefined,
    returnDate: undefined,
    trip: "",
    travellers:""
  });

  const handleSearch = (criteria: SearchCriteria) => {
    setSearch(criteria);
  };

  const handleReset = () => {
    setSearch({
      airline: "",
      travelClass: "",
      from: "",
      to: "",
      departureDate: undefined,
      returnDate: undefined,
      trip: "",
      travellers:""
    });
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <SearchFlight onSearch={handleSearch} resetFunction={handleReset}/>
      <Container search={search} />
    </div>
  );
}
