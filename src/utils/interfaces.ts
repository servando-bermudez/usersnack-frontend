import { Pizza } from "@/backend-api";

export interface Pagination {
  page: number;
  rowsPerPage: number;
}

export interface Pizzas {
  pizzas: Pizza[];
  count: number;
}

export interface ExtrasOption {
  label: string;
  value: string;
  [k: string]: any;
}