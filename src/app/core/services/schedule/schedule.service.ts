import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../../config/constant'

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  saveFoodTruckSchedule(data: any, options?: any) {
    return this.http.post(this.apiUrl + Constants.SCHEDULE_SERVICE_SAVE, data, options)
  }

  getFoodTruckSchedule(year: number, month: number) {
    return this.http.get(this.apiUrl + Constants.SCHEDULE_SERVICE_GET + '?year=' + year.toString() + '&month=' + month.toString())
  }

  getFoodTruckScheduleForToday()
  {
    return this.http.get(this.apiUrl + Constants.SCHEDULE_SERVICE_TODAYSMENU)
  }

}
