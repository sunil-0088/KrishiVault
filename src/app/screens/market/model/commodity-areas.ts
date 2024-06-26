export interface Market {
  id: number;
  name: string;
}

export interface District {
  id: number;
  name: string;
  markets: Market[];
}

export interface State {
  id: number;
  name: string;
  districts: District[];
}

export interface CommodityAreas {
  commodity: number;
  states: State[];
}
