import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from '../../../../shared/components/dialog-box/dialog-box.component'
import { FoodTruckService } from '../../../../core/services'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { FoodTrucksData } from '../../../../core/interface';


const ELEMENT_DATA: FoodTrucksData[] = [
  { _id: 1560608769632, name: 'Artificial Intelligence' },
  { _id: 1560608796014, name: 'Machine Learning' },
  { _id: 1560608787815, name: 'Robotic Process Automation' },
  { _id: 1560608805101, name: 'Blockchain' }
];

@Component({
  selector: 'app-foodtruck',
  templateUrl: './foodtruck.component.html',
  styleUrls: ['./foodtruck.component.css'],
  providers: []
})
export class FoodTruckComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'action'];
  dataSource = new MatTableDataSource<FoodTrucksData>();
  subscriptions: Subscription[] = [];

  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;
  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(public dialog: MatDialog, private foodTruckService: FoodTruckService) { }

  ngOnInit(): void {
    //debugger
    var foodTruckGetSubscription = this.foodTruckService.getAllFoodTrucks().subscribe((data: any) => {
      this.dataSource.data = data
    }); debugger
    this.subscriptions.push(foodTruckGetSubscription);
  }

  ngAfterViewInit() {
    //this.dataSource = new MatTableDataSource(this.EmpData);
    this.dataSource.paginator = this.paginator;
  }

  openDialog(action: any, obj: any) {
    obj.action = action;
    const dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '300px',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event == 'Add') {
        this.addRowData(result.data);
      } else if (result.event == 'Update') {
        this.updateRowData(result.data);
      } else if (result.event == 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(row_obj: FoodTrucksData) {

    var data = { "name": row_obj.name }
    var foodTruckAddSubscription = this.foodTruckService.addFoodTruck(data).subscribe((result: any) => {
      this.dataSource.data.push({
        _id: result._id,
        name: result.name
      });
      this.table.renderRows();
    });
    debugger
    this.subscriptions.push(foodTruckAddSubscription);

  }

  updateRowData(row_obj: FoodTrucksData) {
    var data = { _id: row_obj._id, "name": row_obj.name };

    var foodTruckUpdateSubscription = this.foodTruckService.updateFoodTruck(data).subscribe((result: any) => {

      this.dataSource.data = this.dataSource.data.filter((value, key) => {
        if (value._id == row_obj._id) {
          value.name = row_obj.name;
        }
        return true;
      });

    });
    this.subscriptions.push(foodTruckUpdateSubscription);


  }

  deleteRowData(row_obj: FoodTrucksData) {

    var data = { _id: row_obj._id };

    var foodTruckDeleteSubscription = this.foodTruckService.deleteFoodTruck(data).subscribe((result: any) => {

      this.dataSource.data = this.dataSource.data.filter((value, key) => {
        return value._id != row_obj._id;
      });

    });
    this.subscriptions.push(foodTruckDeleteSubscription);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
