import { CommonModule, DatePipe } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, Route } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CampsService } from '../services/camps.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [DatePipe]
})


export class DashboardComponent implements OnInit {

today =  new Date();
myDate:any;
  nextDay:any;

  constructor(private campService: CampsService, private authService: AuthService, private router: Router,public datePipe: DatePipe) {
   this.myDate = this.datePipe.transform(this.today, 'yyyy-MM-dd');
  
   }

   ngOnInit(): void {
    this.fetchCamps();
    this.nextDate();
    
   
  }


  SearchBox = new FormGroup({
    checkIn: new FormControl( this.datePipe.transform(this.today, 'yyyy-MM-dd'), [Validators.required]),
    checkOut: new FormControl('', [Validators.required]),
    capacity: new FormControl(1,Validators.required)
  })
  collection: any = [];

  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 3;
  tableSizes: any = [3, 6, 9, 12];

  

  
 nextDate(){
  var tomorrow = new Date(this.today);
  tomorrow.setDate(tomorrow.getDate()+1);
  this.nextDay=this.datePipe.transform(tomorrow, 'yyyy-MM-dd');
  // console.log(this.nextDay);
  return this.nextDay;
  
  }

  fetchCamps() {
    this.campService.filterCamp().subscribe(
      //   data=>{
      //   console.warn("Camp data",data)
      // })
      {
        next: (data: any) => {
          // console.log(data);
          this.collection = data.result;
          console.log(this.collection);

        },
        error: (response: any) => {
          console.log(response);

        }

      })
  }

  onTableDataChange(event: any) {
    this.page = event;
    // this.fetchCamps();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    // this.fetchCamps();
  }

  onSearch(){
    console.warn(this.SearchBox.value);
    if(!this.SearchBox.value.checkOut){
      alert("Please Enter Checkout Date");
      return;
     }
    this.campService.getSearchCamps(this.SearchBox.value).subscribe(
      //   data=>{
      //   console.warn("Camp data",data)
      // })
      {
        next: (data: any) => {
          // console.log(data);
          this.collection = data.result;
          console.log(this.collection);

        },
        error: (response: any) => {
          console.log(response);

        }

      })
    
  }
  
}
