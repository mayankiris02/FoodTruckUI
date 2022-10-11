export class Constants {
    public static API_ENDPOINT_LOCAL: string = 'http://localhost:3000/';
    public static API_ENDPOINT_UAT: string = 'http://localhost:3000/';
    public static API_ENDPOINT_PROD: string = 'http://localhost:3000/';

    public static MENU_SERVICE_ADD: string = 'backend/admin/foodtruck/addMenu';    
    public static MENU_SERVICE_UPDATE: string = 'backend/admin/foodtruck/updateMenu';
    public static MENU_SERVICE_DELETE: string = 'backend/admin/foodtruck/deleteMenu';
    public static MENU_SERVICE_GET: string = 'backend/admin/foodtruck/getMenu';

    public static FOODTRUCK_SERVICE_ADD: string = 'backend/admin/foodtruck/addfoodtruck';
    public static FOODTRUCK_SERVICE_UPDATE: string = 'backend/admin/foodtruck/updatefoodtruck';
    public static FOODTRUCK_SERVICE_DELETE: string = 'backend/admin/foodtruck/deletefoodtruck';
    public static FOODTRUCK_SERVICE_GETAll: string = 'backend/admin/foodtruck/getallfoodtrucks';

    public static SCHEDULE_SERVICE_SAVE: string = 'backend/admin/schedule/saveFoodTruckSchedule';
    public static SCHEDULE_SERVICE_GET: string = 'backend/admin/schedule/getFoodTruckSchedule';
    public static SCHEDULE_SERVICE_TODAYSMENU: string = 'backend/admin/schedule/getFoodTruckScheduleForToday';
    
} 