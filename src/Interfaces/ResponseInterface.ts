export interface ResponseInterface {
  tokens: {
    refresh: string;
    access: string;
  } | null;
}
