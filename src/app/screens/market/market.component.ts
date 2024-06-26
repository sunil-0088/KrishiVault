import { Component, OnInit } from '@angular/core';
import { CommodityService } from './services/commodity.service';
import { Commodity } from './model/commodity';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
  CommodityAreas,
  District,
  Market,
  State,
} from './model/commodity-areas';
import { MarketData } from './model/market-data';

@Component({
  selector: 'app-market',
  templateUrl: './market.component.html',
  styleUrls: ['./market.component.scss'],
})
export class MarketComponent implements OnInit {
  commodities: Commodity[] = [];
  areas: CommodityAreas | undefined;
  agForm: FormGroup;

  states: State[] = [];
  districts: District[] = [];
  markets: Market[] = [];

  selectedState?: State;
  selectedDistrict?: District;

  marketData: MarketData = {
    state: 1, // Example state ID
    district: 101, // Example district ID
    market: 1001, // Example market ID
    prices: [
      {
        date: '2024-06-01',
        min_price: 10,
        max_price: 15,
        modal_price: 12,
      },
      {
        date: '2024-06-02',
        min_price: 11,
        max_price: 16,
        modal_price: 13,
      },
      {
        date: '2024-06-03',
        min_price: 12,
        max_price: 18,
        modal_price: 15,
      },
      {
        date: '2024-06-04',
        min_price: 13,
        max_price: 19,
        modal_price: 16,
      },
      {
        date: '2024-06-05',
        min_price: 14,
        max_price: 20,
        modal_price: 17,
      },
      {
        date: '2024-06-06',
        min_price: 15,
        max_price: 21,
        modal_price: 18,
      },
      {
        date: '2024-06-07',
        min_price: 16,
        max_price: 22,
        modal_price: 19,
      },
      {
        date: '2024-06-08',
        min_price: 17,
        max_price: 23,
        modal_price: 20,
      },
      {
        date: '2024-06-09',
        min_price: 18,
        max_price: 24,
        modal_price: 21,
      },
      {
        date: '2024-06-10',
        min_price: 19,
        max_price: 25,
        modal_price: 22,
      },
      {
        date: '2024-06-11',
        min_price: 20,
        max_price: 26,
        modal_price: 23,
      },
      {
        date: '2024-06-12',
        min_price: 21,
        max_price: 27,
        modal_price: 24,
      },
      {
        date: '2024-06-13',
        min_price: 22,
        max_price: 28,
        modal_price: 25,
      },
      {
        date: '2024-06-14',
        min_price: 23,
        max_price: 29,
        modal_price: 26,
      },
      {
        date: '2024-06-15',
        min_price: 24,
        max_price: 30,
        modal_price: 27,
      },
    ],
  };
  constructor(
    private commodityService: CommodityService,
    private fb: FormBuilder
  ) {
    this.agForm = this.fb.group({
      commodity: [null],
      state: [null],
      district: [null],
      market: [null],
    });
  }
  ngOnInit(): void {
    this.commodityService.fetchCommodities().subscribe((data) => {
      this.commodities = data;
      console.log(this.commodities);
    });

    this.agForm.get('commodity')?.valueChanges.subscribe((selectedValue) => {
      this.states = [];
      this.commodityService
        .fetchCommodityAreas(selectedValue)
        .subscribe((data) => {
          this.areas = data;
          this.states = this.areas?.states!;
        });
    });
  }

  onStateChange(event: Event) {
    const stateId = (event.target as HTMLSelectElement).value;
    this.selectedState = this.states.find((state) => state.id === +stateId);
    this.districts = this.selectedState?.districts ?? [];
    this.markets = [];
  }

  onDistrictChange(event: Event) {
    const districtId = (event.target as HTMLSelectElement).value;
    this.selectedDistrict = this.districts.find(
      (district) => district.id === +districtId
    );
    this.markets = this.selectedDistrict?.markets ?? [];
  }

  onSearch() {
    console.log(this.agForm.value);
    this.commodityService.GetCommodityPrices(this.agForm.value).subscribe(
      (data) => {
        console.log(data);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
