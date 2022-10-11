import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../../config/constant'

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  addMenu(data: any, options?: any) {
    return this.http.post(this.apiUrl + Constants.MENU_SERVICE_ADD, data, options)
  }

  updateMenu(data: any, options?: any) {
    return this.http.post(this.apiUrl + Constants.MENU_SERVICE_UPDATE, data, options)
  }

  deleteMenu(data: any, options?: any) {
    return this.http.post(this.apiUrl + Constants.MENU_SERVICE_UPDATE, data, options)
  }
  getMenu() {
    return this.http.get(this.apiUrl + Constants.MENU_SERVICE_GET);
  }

}
