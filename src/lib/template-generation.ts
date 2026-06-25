interface CustomerInterface {
  id: string;
  name: string;
  color: string;
}

export const customers: CustomerInterface[] = [
  { id: "keralty", name: "Keralty", color: "bg-primary" },
  { id: "general", name: "General Customer", color: "bg-accent" },
];

export interface Phase {
  id: string;
  name: string;
}
