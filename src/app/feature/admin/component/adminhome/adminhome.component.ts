import { Component, OnInit, ViewChild } from '@angular/core';
import { DayPilot, DayPilotMonthComponent } from '@daypilot/daypilot-lite-angular';
import { DayPilotModule } from "@daypilot/daypilot-lite-angular";
import { FoodTruckService, ScheduleService } from '../../../../core/services'
import { Subscription } from 'rxjs';
import { FoodTrucksData } from '../../../../core/interface/foodtrucksdata.interface';
import * as moment from 'moment';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminHomeComponent implements OnInit {

  foodTruckData: any = [];
  form = [{ name: "Select Food Truck", id: "truckName", options: this.foodTruckData }];
  data = { truckName: "" };


  config: DayPilot.MonthConfig = {
    locale: "en-us",
    timeRangeSelectedHandling: "Enabled",
    onTimeRangeSelected: async (args) => {
      await this.addFoodTruckSchedule(args)
    },
    eventDeleteHandling: "Update",
    onEventDeleted: (args) => {
      //args.control.message("Event deleted: " + args.e.text());
    },
    eventMoveHandling: "Update",
    onEventMoved: (args) => {
      //args.control.message("Event moved: " + args.e.text());
    },
    eventResizeHandling: "Update",
    onEventResized: (args) => {
      //args.control.message("Event resized: " + args.e.text());
    },
    eventClickHandling: "Enabled",
    onEventClicked: (args) => {
      //args.control.message("Event clicked: " + args.e.text());
    },
    /*eventHoverHandling: "Bubble",
    bubble: new DayPilot.Bubble({
      onLoad: (args) => {
        // if event object doesn't specify "bubbleHtml" property 
        // this onLoad handler will be called to provide the bubble HTML
        args.html = "Event details";
      }
    }),*/

    contextMenu: new DayPilot.Menu({
      items: [
        { text: "Delete", onClick: (args) => { const dp = args.source.calendar; dp.events.remove(args.source); } }
      ]
    }),
  }

  events: any = [


  ]
  tempEvents: any = [

  ]

  @ViewChild("calendar")
  calendar!: DayPilotMonthComponent;

  subscriptions: Subscription[] = [];

  constructor(private foodTruckService: FoodTruckService, private scheduleSerive: ScheduleService) {
    this.calenderConfig();
  }

  ngOnInit(): void {


    var foodTruckGetSubscription = this.foodTruckService.getAllFoodTrucks().subscribe((result: any) => {
      this.prepareData(result);
      
    });

    var getFoodTruckScheduleSubscription = this.scheduleSerive.getFoodTruckSchedule(moment().year(),
      moment().month() + 1).subscribe((result: any) => {
        debugger
        this.prepareEventData(result);       
       
      });
    this.subscriptions.push(getFoodTruckScheduleSubscription);

    this.subscriptions.push(foodTruckGetSubscription);
  }

  prepareEventData(result: any) {
    debugger
    var dataObj = result.data.map((item: any) => {
      return {
        start: item.scheduledDate,
        end: item.scheduledDate,
        id: DayPilot.guid(),
        text: item.foodTruckId.name,
        name: item.foodTruckId.name,
        scheduledDate: item.scheduledDate,
        foodTruckId: item.foodTruckId._id
      }
    });
    
    this.events = this.events.concat(dataObj);
  }

  prepareData(result: FoodTrucksData[]) {
    result.forEach(element => {
      var obj = { name: element.name, id: element.name, _id: element._id }
      this.foodTruckData.push(obj);
    });
  }

  message() {
    //this.calendar.control.message.("Welcome!");
  }

  async addFoodTruckSchedule(args: any) {

    const modal = await DayPilot.Modal.form(this.form, this.data)
    const dp = args.control;
    dp.clearSelection();
    if (modal.canceled) { return; }

    var startDate = moment(new Date(args.start)).format("YYYY-MM-DD")
    var item = this.events.find((x: any) => x.name == modal.result.truckName && (x.scheduledDate == startDate || x.start == startDate));


    if (item == null) {
      dp.events.add({
        start: startDate,
        end: startDate,
        id: DayPilot.guid(),
        text: modal.result.truckName,
        name: modal.result.truckName,
        scheduledDate: startDate,
        foodTruckId: this.getFoodTruckId(modal.result.truckName)
      });
    }
  }

  getFoodTruckId(foodTruckName: String) {
    var obj = this.foodTruckData.find((x: any) => x.name == foodTruckName)
    return obj._id;
  }

  saveData() {
    var payload = this.prepareSaveData();

    var saveFoodTruckScheduleSubscription = this.scheduleSerive.saveFoodTruckSchedule(payload).subscribe((result: any) => {
      this.prepareData(result);
    });
    this.subscriptions.push(saveFoodTruckScheduleSubscription);
  }

  prepareSaveData() {

    var dataObj = this.events.map((event: any) => {
      return {
        name: event.name,
        scheduledDate: event.scheduledDate,
        foodTruckId: event.foodTruckId
      }
    });

    var payload = {
      year: moment().year(),
      month: moment().month() + 1,
      data: dataObj
    }

    return payload;
  }

  ngAfterViewInit(): void {

    const from = this.calendar.control.visibleStart();
    const to = this.calendar.control.visibleEnd();   

  }

  calenderConfig() {

  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => {
      if (!x.closed) {
        x.unsubscribe();
      }
    });
  }
}
