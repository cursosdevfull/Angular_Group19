export type ResultPage<T> = {
  data: T[];
  total: number;
  pageSize: number;
  currentPage: number;
  totalPages: number;
};
