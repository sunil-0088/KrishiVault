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
