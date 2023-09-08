import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CampsService } from 'src/app/services/camps.service';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  providers: [DatePipe]
})
export class BookingComponent implements OnInit {

  today = Date.now();
  myDate:any;
  Days:any  
  nextDay:any

  amount=0;
  collection:any=[];
  isConfirm=false;
  response:any=[];
  BRN="";
 
  Book=new FormGroup({
    brn: new FormControl(''),
    campId: new FormControl(''),
    checkIn: new FormControl(this.todayDate(), [Validators.required]),
    checkOut: new FormControl( '', [Validators.required]),
    capacity: new FormControl(1),

    nights: new FormControl(1),
    amount: new FormControl(1),
    address: new FormControl('', Validators.required),
    state: new FormControl('', Validators.required),
    country: new FormControl('', [Validators.required, Validators.pattern(/[a-zA-Z ]*/)]),
    zip: new FormControl( '', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]),
    phone: new FormControl( '', [Validators.required, Validators.minLength(10), Validators.maxLength(10)])
  })
  



  constructor(private campService: CampsService, private route: ActivatedRoute, private router:Router,private datePipe: DatePipe) { }

 
  ngOnInit(): void {
   this.nextDate();
   
    this.route.paramMap.subscribe({
      next:(params)=>{
        const id=params.get('id');
        if(id){
          this.campService.getCamp(id).subscribe({
            next:(Response:any)=>{
              // console.log(Response);
              this.collection=Response;
              // console.log(this.collection);
              this.amount=this.collection.rate;
             return this.collection;
              
            }
          })
        }
      }
    })
  }

  calculateDays(date1:any,date2:any):any{
    const Date1Modified =new Date(date1);
    const Date2Modified =new Date(date2);
   const Time= Date2Modified.getTime()-Date1Modified.getTime();
   this.Days=Time/(1000*3600*24);
   this.Days=this.Days? this.Days:1;
   
   this.amount=this.collection.rate*this.Days;
  
  //  console.log(this.Days);
   return this.Days;
   
   
  }
  
  nextDate(){
  var tomorrow = new Date(this.today);
  tomorrow.setDate(tomorrow.getDate()+1);
  this.nextDay=this.datePipe.transform(tomorrow, 'yyyy-MM-dd');
  // console.log(this.nextDay);
  return this.nextDay;
  
  }
  todayDate(){
    this.myDate=this.datePipe.transform(this.today, 'yyyy-MM-dd');
    // console.log(this.myDate);
    
    return this.myDate;
  }




  bookCamp(){
    this.Book.value.campId=this.collection.id;
   this.Book.value.amount=this.amount; 
   this.Book.value.nights=this.Days; 
   this.Book.value.capacity=this.collection.capacity;
    // console.log(this.Book.value);

    this.isConfirm=true;
    this.response=this.Book.value;
    console.log(this.response)
  
  }

  
randomString(length: number) {
  var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var result = '';
  for ( var i = 0; i < length; i++ ) {
      result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
  }

  // console.log(result);
  
  this.BRN=result;
}

showBRN:any;

  confirmCamp(){
    this.Book.value.brn=this.BRN;

    this.campService.bookingCamp(this.Book.value).subscribe(result=>{
      console.warn("Booking camp returning: ", result);
      this.showBRN=true;

    }); 

  }
  

  copyMessage(val: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }


  get address() {
    return this.Book.get('address');
  }

  get zip() {
    return this.Book.get('zip');
  }

  get phone() {
    return this.Book.get('phone');
  }



  

}
