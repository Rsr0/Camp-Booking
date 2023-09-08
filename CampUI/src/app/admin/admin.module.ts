import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCampComponent } from './add-camp/add-camp.component';
import { RouterModule } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { LoginComponent } from './login/login.component';
import { UpdateCampComponent } from './update-camp/update-camp.component';
import { ReactiveFormsModule } from '@angular/forms';


// import { routes } from './admin-routing.module';


@NgModule({
  declarations: [AddCampComponent,
    AdminDashboardComponent,
    LoginComponent,
    UpdateCampComponent

  ],
  imports: [
    CommonModule,
    NgxPaginationModule, 
    RouterModule,
    ReactiveFormsModule,
  ],
  exports:[AddCampComponent,
    AdminDashboardComponent,
    LoginComponent,
    UpdateCampComponent
  ]
})
export class AdminModule { }
