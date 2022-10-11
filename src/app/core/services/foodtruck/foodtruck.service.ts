import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../../config/constant'

@Injectable({
  providedIn: 'root'
})
export class FoodTruckService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  addFoodTruck(data: any, options?: any) {
    return this.http.post(this.apiUrl + Constants.FOODTRUCK_SERVICE_ADD, data, options)
  }

  updateFoodTruck(data: any, options?: any) {
    return this.http.post(this.apiUrl + Constants.FOODTRUCK_SERVICE_UPDATE, data, options)
  }

  deleteFoodTruck(data: any, options?: any) {
    return this.http.post(this.apiUrl + Constants.FOODTRUCK_SERVICE_DELETE, data, options)
  }

  getAllFoodTrucks() {
    return this.http.get(this.apiUrl + Constants.FOODTRUCK_SERVICE_GETAll);
  }
}
