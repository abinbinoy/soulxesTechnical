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
}

export default function Home() {
  const [search, setSearch] = useState<SearchCriteria>({
    airline: "",
    travelClass: "",
    from: "",
    to: ""
  });

  const handleSearch = (criteria: SearchCriteria) => {
    setSearch(criteria);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <SearchFlight onSearch={handleSearch} />
      <Container search={search} />
    </div>
  );
}
