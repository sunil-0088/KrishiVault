import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-buyout',
  templateUrl: './buyout.component.html',
  styleUrls: ['./buyout.component.scss'],
})
export class BuyoutComponent implements OnInit {
  columns = ['Column 1', 'Column 2', 'Column 3', 'Column 4', 'Column 5'];
  rows: Array<any[]> = [];

  constructor(private firestore: AngularFirestore) {}

  ngOnInit(): void {
    this.loadData();
  }

  addRow() {
    this.rows.push(Array(this.columns.length).fill(''));
  }

  saveData() {
    this.firestore.collection('spreadsheetData').add({ data: this.rows });
  }

  loadData() {
    this.firestore
      .collection('spreadsheetData')
      .valueChanges()
      .subscribe((data: any) => {
        if (data && data.length > 0) {
          this.rows = data[0].data;
        } else {
          this.addRow(); // Ensure at least one row exists
        }
      });
  }
}

