declare global {
  interface Window {
    API_URL: string;
    gapi: any;
    fbAsyncInit: () => void;
  }
}

export {};
