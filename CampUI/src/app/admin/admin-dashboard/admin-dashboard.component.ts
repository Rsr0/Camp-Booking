import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CampsService } from 'src/app/services/camps.service';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  collection: any = [];

  POSTS: any;
  page: number = 1;
  count: number = 0;
  tableSize: number = 7;
  tableSizes: any = [3, 6, 9, 12];

  constructor(private campService: CampsService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.fetchCamps();
  }

  fetchCamps() {
    this.campService.getAllCamps().subscribe(
      //   data=>{
      //   console.warn("Camp data",data)
      // })
      {
        next: (data: any) => {
          // console.log(data);
          this.collection = data;
          console.log(this.collection);

        },
        error: (response: any) => {
          console.log(response);

        }

      })
  }

  onTableDataChange(event: any) {
    this.page = event;
    this.fetchCamps();
  }
  onTableSizeChange(event: any): void {
    this.tableSize = event.target.value;
    this.page = 1;
    this.fetchCamps();
  }

  logout(){      
    this.campService.logout(); 
    this.router.navigate(['/dashboard']);  
  }  
}
