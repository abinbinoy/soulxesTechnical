  "use client";
  import { useState } from "react";
  import {
    Globe,
    Plane,
    Ticket,
    Building2,
    UserRound,
    Briefcase,
    Monitor,
    Wifi,
    BatteryCharging,
    Info,
  } from "lucide-react";
  import { Button } from "@/components/ui/button";
  import { Card, CardFooter, CardHeader } from "@/components/ui/card";
  import { Flight } from "../types/FlightDataTypes";

  type FlightPoint = {
    time: string;
    date: string;
    airport: string;
    city: string;
    country: string;
  };

  const FlightRow = ({ departure, arrival, duration, showDate = true }: {
    departure: FlightPoint;
    arrival: FlightPoint;
    duration: string;
    showDate?: boolean;
  }) => {
    return (
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
        <div className="min-w-0 sm:min-w-25">
          <p className="text-lg sm:text-xl font-bold">{departure.time}</p>
          {showDate && <p className="text-xs text-muted-foreground">{departure.date}</p>}
          <p className="text-xs text-muted-foreground truncate">{departure.airport}, {departure.city}</p>
          <p className="text-xs text-muted-foreground">{departure.country}</p>
        </div>
        <div className="flex flex-col items-center flex-1 w-full sm:max-w-40">
          <span className="text-sm text-muted-foreground mb-1">{duration}</span>
          <div className="flex items-center w-full">
            <div className="flex-1 h-px bg-gray-300 relative">
              <Plane className="w-4 h-4 text-muted-foreground absolute left-1/2 -translate-x-1/2 -top-2 rotate-90" />
            </div>
          </div>
        </div>
        <div className="min-w-0 sm:min-w-30">
          <p className="text-lg sm:text-xl font-bold">{arrival.time}</p>
          {showDate && <p className="text-xs text-muted-foreground">{arrival.date}</p>}
          <p className="text-xs text-muted-foreground truncate">{arrival.airport}, {arrival.city}</p>
          <p className="text-xs text-muted-foreground">{arrival.country}</p>
        </div>
      </div>
    );
  }

  const FlightRowWithExtras = ({ departure, arrival, duration, withBackground = false }: {
    departure: FlightPoint;
    arrival: FlightPoint;
    duration: string;
    withBackground?: boolean;
  }) => {
    return (
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className={`flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 flex-1 ${withBackground ? 'bg-[#FFF1E4] p-4 rounded' : ''}`}>
          <div className="min-w-0 sm:min-w-25">
            <p className="text-lg sm:text-xl font-bold">{departure.time}</p>
            <p className="text-xs text-muted-foreground">{departure.date}</p>
            <p className="text-xs text-muted-foreground truncate">{departure.airport}, {departure.city}</p>
            <p className="text-xs text-muted-foreground">{departure.country}</p>
          </div>

          <div className="flex flex-col items-center flex-1 w-full sm:max-w-40">
            <span className="text-sm text-muted-foreground mb-1">{duration}</span>
            <div className="flex items-center w-full">
              <div className="flex-1 h-px bg-gray-300 relative">
                <Plane className="w-4 h-4 text-muted-foreground absolute left-1/2 -translate-x-1/2 -top-2 rotate-90" />
              </div>
            </div>
          </div>
          <div className="min-w-0 sm:min-w-30">
            <p className="text-lg sm:text-xl font-bold">{arrival.time}</p>
            <p className="text-xs text-muted-foreground">{arrival.date}</p>
            <p className="text-xs text-muted-foreground truncate">{arrival.airport}, {arrival.city}</p>
            <p className="text-xs text-muted-foreground">{arrival.country}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-muted-foreground">
          <Monitor className="w-4 h-4" />
          <Wifi className="w-4 h-4" />
          <BatteryCharging className="w-4 h-4" />
          <Briefcase className="w-4 h-4" />
          <Info className="w-4 h-4" />
        </div>
      </div>
    );
  }

  const ResultList = ({ flight }: { flight: Flight }) => {
    const [expanded, setExpanded] = useState(false);
    const [activeTab, setActiveTab] = useState("flight-info");

    const tabs = [
      { id: "flight-info", label: "Flight Information" },
      { id: "fare-detail", label: "Fare Detail" },
      { id: "baggage-rules", label: "Baggage Rules" },
      { id: "cancellation", label: "Cancellation Rules" },
    ];

    return (
      <Card className="overflow-hidden rounded-[5px]">
        <CardHeader className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-4">
          <div className="flex items-center gap-2">
            <Globe className="w-5 h-5 text-primary" />
            <span className="text-sm font-medium">{flight.airline}</span>
          </div>
          <span className="text-sm text-muted-foreground">
            Travel Class: <span className="font-medium text-foreground">{flight.travelClass}</span>
          </span>
        </CardHeader>
        <div className="flex flex-col sm:flex-row">
          <div className="flex-1 bg-[#FFF1E4] mx-4 sm:ml-4 sm:mr-0 rounded sm:rounded-none">
            <div className="px-4 py-4">
              {!flight.returnFlight && (
                <p className="text-xs text-muted-foreground mb-3">{flight.departure.date}</p>
              )}
              <FlightRow
                departure={flight.departure}
                arrival={flight.arrival}
                duration={flight.duration}
                showDate={!!flight.returnFlight}
              />
            </div>
            {flight.returnFlight && (
              <div className="px-4 py-4 border-t-4 border-white">
                <FlightRow
                  departure={flight.returnFlight.departure}
                  arrival={flight.returnFlight.arrival}
                  duration={flight.returnFlight.duration}
                  showDate={true}
                />
              </div>
            )}
          </div>
          <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center px-4 sm:px-6 py-4 bg-white">
            <p className="text-xl sm:text-2xl font-bold">${flight.price.toLocaleString()}</p>
            <Button className="sm:mt-2">Book Now</Button>
          </div>
        </div>
        <CardFooter className="flex flex-col items-stretch p-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 px-4 py-3">
            <div className="flex flex-wrap items-center gap-3 sm:gap-6">
              <span className="text-sm text-muted-foreground">
                {flight.seatsRemaining} seats remaining
              </span>
              <span className={`text-sm ${
                flight.refundable === "fully-refundable" ? "text-green-500" :
                flight.refundable === "partially-refundable" ? "text-orange-500" : "text-red-500"
              }`}>
                {flight.refundable === "fully-refundable" ? "Fully Refundable" :
                 flight.refundable === "partially-refundable" ? "Partially Refundable" : "Non-refundable"}
              </span>
            </div>
            <Button
              variant="link"
              onClick={() => setExpanded(!expanded)}
              className="text-sm p-0 h-auto text-primary cursor-pointer"
            >
              View flight details
            </Button>
          </div>
          {!flight.returnFlight && (
            <div className="py-4 pt-3 border-t px-4">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs">
                <div className="flex items-center gap-1">
                  <Ticket className="w-4 h-4 shrink-0" />
                  <span>Separate tickets booked together</span>
                </div>
                <div className="flex items-center gap-1">
                  <Building2 className="w-4 h-4 shrink-0" />
                  <span>Change of Terminal</span>
                </div>
                <div className="flex items-center gap-1">
                  <UserRound className="w-4 h-4 shrink-0" />
                  <span>Self Transfer</span>
                </div>
                <div className="flex items-center gap-1">
                  <Briefcase className="w-4 h-4 shrink-0" />
                  <span>7kg</span>
                </div>
              </div>
            </div>
          )}
          {expanded && (
            <div className="border-t">
              <div className="flex overflow-x-auto border-b">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`cursor-pointer px-3 sm:px-4 py-2 text-xs sm:text-sm whitespace-nowrap transition-colors ${activeTab === tab.id
                      ? "text-foreground border-b-2 border-primary -mb-px"
                      : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
              {activeTab === "flight-info" && (
                <div className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">{flight.airline}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {flight.arrival.country.split(",")[0]} -&gt; {flight.departure.country.split(",")[0]}
                    </span>
                  </div>
                  <FlightRowWithExtras
                    departure={flight.departure}
                    arrival={flight.arrival}
                    duration={flight.duration}
                    withBackground={true}
                  />
                  {flight.returnFlight && (
                    <>
                      <div className="flex items-center gap-3 py-3">
                        <div className="flex-1 h-px bg-gray-300"></div>
                        <span className="text-xs ">
                          Change of Terminal • Change of planes • 3 h 45 m Layover in Dubai
                        </span>
                        <div className="flex-1 h-px bg-gray-300"></div>
                      </div>
                      <FlightRowWithExtras
                        departure={flight.returnFlight.departure}
                        arrival={flight.returnFlight.arrival}
                        duration={flight.returnFlight.duration}
                        withBackground={true}
                      />
                    </>
                  )}
                </div>
              )}

              {activeTab === "fare-detail" && (
                <div className="p-4">
                  <p className="text-sm text-muted-foreground">No Data</p>
                </div>
              )}
              {activeTab === "baggage-rules" && (
                <div className="p-4">
                  <p className="text-sm text-muted-foreground">No Data</p>
                </div>
              )}
              {activeTab === "cancellation" && (
                <div className="p-4">
                  <p className="text-sm text-muted-foreground">No Data</p>
                </div>
              )}
            </div>
          )}
        </CardFooter>
      </Card>
    );
  }
  export default ResultList;