import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtServiceService {
  private baseUrl: String = "http://localhost:8080/"
  private headers: HttpHeaders | undefined;
  private userId: number | undefined;
  constructor(
    private http: HttpClient
  ) {
    if (localStorage.getItem("token") || sessionStorage.getItem("token")) {
      const token = localStorage.getItem("token") || sessionStorage.getItem("token") || "";
      this.userId = JSON.parse(sessionStorage.getItem("currentUserId") || "0");
      this.headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      });
      this.getUserData(this.userId || 0);
    }
  }

  validLogin(login: any) {
    return this.http.post<any>(`${this.baseUrl}login`, login);
  }

  getUserData(id: number): any {
    return this.http.get(this.baseUrl + "user/byPlanId/" + id, { headers: this.headers })
  }

  getSelectedMeals(userId: number,date: String): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}meal-info/mealsById?id=${userId}&date=${date}`, { headers: this.headers })
  }

  addMealsForDay(mealArray: any[]) {
    mealArray.forEach(mealObj => {
      mealObj.userId = this.userId;
      this.http.post<boolean>(`${this.baseUrl}meal-info/add-meal-info`, mealObj, { headers: this.headers });
    });
  }

  setMealCompleted(mealName: string, timeCompleted: string): boolean {
    let bool = false;
    this.http.get<boolean>(`${this.baseUrl}meal-Info/mealCompleted?status=${true}&userId=${this.userId}&mealName=${mealName}&timeCompleted=${timeCompleted}`).subscribe((data) => {
      bool = data
    });
    return bool;
  }
}
