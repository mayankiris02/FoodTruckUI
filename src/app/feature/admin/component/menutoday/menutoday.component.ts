import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ScheduleService } from '../../../../core/services'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { TodaysMenu } from '../../../../core/interface/';

@Component({
  selector: 'app-menutoday',
  templateUrl: './menutoday.component.html',
  styleUrls: ['./menutoday.component.css']
})
export class MenuTodayComponent implements OnInit {

  displayedColumns: string[] = ['position', 'foodTruckName', 'menuItemName', 'menuItemPrice', 'action'];
  dataSource = new MatTableDataSource<TodaysMenu>();
  subscriptions: Subscription[] = [];

  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;
  @ViewChild('paginator') paginator!: MatPaginator;

  constructor(public dialog: MatDialog, private scheduleService: ScheduleService) { }

  ngOnInit(): void {

    var todayMenuSubscription = this.scheduleService.getFoodTruckScheduleForToday().subscribe((data: any) => {
      this.dataSource.data = data
    });
    this.subscriptions.push(todayMenuSubscription);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
