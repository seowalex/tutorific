export interface ErrorResponse {
  errors: Error[];
}

interface Error {
  field?: string;
  detail: string[];
}
