import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { BmicalculatorComponent } from '../../../common/bmicalculator/bmicalculator.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';

Chart.register(...registerables);
@Component({
  selector: 'app-progress',
  standalone: true,
  imports: [BmicalculatorComponent, HttpClientModule],
  templateUrl: './progress.component.html',
  styleUrl: './progress.component.css'
})
export class ProgressComponent implements OnInit {
  weightChart: any;
  waterChart: any;
  caloricChart: any;
  mealHourChart: any;
  stressChart: any;
  private userId: number = 0;
  protected userDetails: any = {};
  protected userDietaryInfo: any = {};
  private baseUrl: String = "http://localhost:8080/";
  protected userPlan: any;

  ngOnInit(): void {
    this.userId = localStorage.getItem("currentUserId") ? JSON.parse(localStorage.getItem("currentUserId") || "0") : 0;
    this.createWeightChart();
    this.createWaterChart();
    this.createCaloricChart();
    this.createMealHourChart();
    this.createStressChart();
    this.getUserDetails(this.userId);
  }

  constructor(private http: HttpClient) { }


  private getUserDetails(userId: number): void {
    
    this.http.get<any>(`${this.baseUrl}user/get-userWithPlan-byId/${userId}`).subscribe((data: any) => {
      this.userDetails = data.user;
      this.userDietaryInfo = data.dietaryInfo;
      this.userPlan = data.dietPlan;
    })
  }

  createWeightChart(): void {
    const labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
    const data = {
      labels: labels,
      datasets: [{
        label: 'Weight',
        data: [65, 59, 80, 81],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };
    const config: any = {
      type: 'line',
      data: data,
    };
    this.weightChart = new Chart("weightChart", config);
  }
  createStressChart(): void {
    const labels = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const data = {
      labels: labels,
      datasets: [{
        label: 'Stress',
        data: [26, 39, 60, 21],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };
    const config: any = {
      type: 'line',
      data: data,
    };
    this.stressChart = new Chart("stressChart", config);
  }
  createWaterChart(): void {
    const labels = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const data = {
      labels: labels,
      datasets: [{
        label: 'Water',
        data: [6, 9, 8, 8, 5, 5, 4],
        backgroundColor: [
          'rgba(54, 162, 235, 0.2)',
        ],
        borderColor: [
          'rgba(54, 162, 235)',
        ],
        borderWidth: 1
      }]
    };
    const config: any = {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    };
    this.waterChart = new Chart("waterChart", config);
  }
  createCaloricChart(): void {
    const labels = [
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday",
      "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    const data = {
      labels: labels,
      datasets: [{
        label: 'Calories',
        data: [6, 9, 8, 8, 5, 5, 4],
        backgroundColor: [
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 159, 64)',
        ],
        borderWidth: 1
      }]
    };
    const config: any = {
      type: 'bar',
      data: data,
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      },
    };
    this.caloricChart = new Chart("caloricChart", config);
  }
  createMealHourChart(): void {
    const labels = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const data = {
      labels: labels,
      datasets: [
        {
          label: 'Breakfast',
          data: [8, 9, 8.5, 7],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        },
        {
          label: 'Lunch',
          data: [13, 12, 15, 0],
          fill: false,
          borderColor: 'rgba(255, 159, 64)',
          tension: 0.1
        },
        {
          label: 'Snack',
          data: [18, 17, 16.8, 16],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 1
        },
        {
          label: 'Dinner',
          data: [21, 20, 22, 21],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        },
      ]
    };
    const config: any = {
      type: 'line',
      data: data,
    };
    this.mealHourChart = new Chart("mealHourChart", config);
  }

}