export interface IPagination {
  array: number;
  currentPage: number;
  setPage: (value: number) => void;
  setMaxPageLimit: (value: number) => void;
  maxPageLimit: number;
  setMinPageLimit: (value: number) => void;
  minPageLimit: number;
  paginate: (value: number) => void;
}
