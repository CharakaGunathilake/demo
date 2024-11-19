import { NgClass, NgIf } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Modal } from 'bootstrap';
import { createPopper } from '@popperjs/core';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf, NgClass, HttpClientModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  @ViewChild('staticBackdrop') staticBackdrop!: ElementRef
  private baseUrl: String = "http://localhost:8080/";
  protected userDetails: any = {};

  protected formName: String = "";
  protected editablePersonal = false;
  protected editableAccount = false;
  protected editableDiet = false;
  protected editableOngoing = false;
  protected userDietaryInfo: any = {};
  protected userLogin: any = {};
  protected userPlan: any = {};
  protected userId: number = 0;
  protected btnText: string = "Edit";
  protected unitHeight: String = "cm";
  protected unitWeight: String = "kg";

  constructor(private http: HttpClient, private router: Router) { }

  toggleDisable() {
    if (this.formName == "personal") {
      this.editablePersonal = !this.editablePersonal;
      this.btnText = this.btnText == "Save" ? "Edit" : "Save";
    } else if (this.formName == "account") {
      this.editableAccount = !this.editableAccount;
    } else if (this.formName == "diet") {
      this.editableDiet = !this.editableDiet;
    } else if (this.formName == "ongoing diet") {
      this.editableOngoing = !this.editableOngoing;
    } else {
      this.deleteCurrentPlan();
      this.router.navigate(['/modal']);
    }
  }
  deleteCurrentPlan() {
    this.http.delete(`${this.baseUrl}dietary-info/delete-dietary_info-byId/${this.userId}`).subscribe((data) => {
      if (data) {
        alert("plan deleted successfully");
      }
    })
  }
  
  ngOnInit(): void {
    this.userId = JSON.parse(localStorage.getItem("currentUserId") || "0");
    this.getUserDetails(this.userId);
  }

  openModal(name: String) {
    if (this.formName != name) {
      this.formName = name;
      const modal = new Modal(this.staticBackdrop.nativeElement);
      modal.show();
    }else{
      this.toggleDisable();
      this.updateDetails(name);
    }
  }
  updateDetails(name: String) {
    if (name == "personal") {
      this.http.put(`${this.baseUrl}user/update-user`, this.userDetails).subscribe((data) => {
        if (data) {
          alert("updated successfully");
        }
      })
    }
    else if (name == "account") {
      this.http.put(`${this.baseUrl}login/update-login`, this.userLogin).subscribe((data) => {
        if (data) {
          alert("updated successfully");
        }
      })
    }
  }

  private getUserDetails(userId: number): void {
    this.http.get<any>(`${this.baseUrl}user/get-userWithPlan-byId/${userId}`).subscribe((data: any) => {
      console.log(data);
      this.userDetails = data.user;
      this.userDietaryInfo = data.dietaryInfo;
      this.userLogin = data.login;
      this.userPlan = data.dietPlan;
    })
  }

  changeUnitHeight(){
    if(this.unitHeight == "cm"){
      this.unitHeight = "ft";
      this.userDietaryInfo.height /= 30; 
    }else{
      this.unitHeight = "cm";
      this.userDietaryInfo.height *= 30;
    }
  }
  changeUnitWeight(){
    if(this.unitWeight == "kg"){
      this.unitWeight = "lb";
      this.userDietaryInfo.weight *= 2.205;
      this.userDietaryInfo.weight.toFixed(2);
    }else{
      this.unitWeight = "kg";
      this.userDietaryInfo.weight /= 2.205;
    }
  }
}
