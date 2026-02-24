export interface Flight {
  id: string;
  airline: string;
  airlineCode: string;
  travelClass: "Economy" | "Business" | "First Class";
  departure: {
    time: string;
    date: string;
    airport: string;
    city: string;
    country: string;
  };
  arrival: {
    time: string;
    date: string;
    airport: string;
    city: string;
    country: string;
  };
  duration: string;
  stops: number;
  price: number;
  seatsRemaining: number;
  refundable: "non-refundable" | "partially-refundable" | "fully-refundable";
  returnFlight?: {
    departure: {
      time: string;
      date: string;
      airport: string;
      city: string;
      country: string;
    };
    arrival: {
      time: string;
      date: string;
      airport: string;
      city: string;
      country: string;
    };
    duration: string;
  };
}

export interface Airline {
  name: string;
  code: string;
  price: number;
}

export interface StopOption {
  label: string;
  value: number;
  price: number;
  count: number;
}

export const airlines: Airline[] = [
  { name: "ABC Air Technologies", code: "AAT", price: 203 },
  { name: "ABC Airlines", code: "ABC", price: 160 },
  { name: "XYZ Airways", code: "XYZ", price: 212 },
  { name: "BOP Links", code: "BOP", price: 129 },
  { name: "EDF Express", code: "EDF", price: 190 },
];

export const stopOptions: StopOption[] = [
  { label: "Nonstop", value: 0, price: 110, count: 23 },
  { label: "1 Stop", value: 1, price: 324, count: 4 },
  { label: "2+ Stops", value: 2, price: 349, count: 2 },
];