import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CampsService } from '../services/camps.service';

@Component({
  selector: 'app-manage-booking',
  templateUrl: './manage-booking.component.html',
  styleUrls: ['./manage-booking.component.css']
})
export class ManageBookingComponent implements OnInit {


  starRating = 0;
  collection: any;
  camp: any=[];
  alert = false;
  constructor(private campService: CampsService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

  }

  countStar() {
    console.log('Value of star', this.starRating);
  }


  searchBooking(brn: any) {
    if (brn) {
      this.campService.getBookingCamp(brn).subscribe({
        next: (Response: any) => {
          console.log(Response);
          this.collection = Response;
          // console.log(this.collection);
          this.getCampDetails(this.collection.campId);
          this.alert = false
        },
        error: (Response) => {
          console.log(Response);
          this.collection = null;
          this.alert = true;

        }
      })
    }
  }

  cancelBooking(brn: any) {
    var choice = confirm("Do you want to cancel the Booking?");
    if (choice) {
      this.campService.deleteBooking(brn).subscribe({
        next: (Response) => {
          this.router.navigate(['dashboard']);
        }
      })
    }

  }

  getCampDetails(id: any) {

    if (id) {
      this.campService.getCamp(id).subscribe({
        next: (Response: any) => {
          console.log(Response);
          this.camp = Response;
          // console.log(this.camp);


        }
      })
    }
  }

  isVisited(checkIn:any){
    let inDate=new Date(checkIn);
    let today=new Date();
    if(inDate > today){
      return true;
    }
    else{ 
      return false;
    }
  }


}



