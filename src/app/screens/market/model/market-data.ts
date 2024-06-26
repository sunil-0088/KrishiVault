export interface Price {
    date: string;
    min_price: number;
    max_price: number;
    modal_price: number;
  }
  
 export interface MarketData {
    state: number;
    district: number;
    market: number;
    prices: Price[];
  }