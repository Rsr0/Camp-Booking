import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCampComponent } from './admin/add-camp/add-camp.component';
import { AdminDashboardComponent } from './admin/admin-dashboard/admin-dashboard.component';
import { LoginComponent } from './admin/login/login.component';
import { UpdateCampComponent } from './admin/update-camp/update-camp.component';
import { AuthGuard } from './auth.guard';
import { BookingComponent } from './booking/booking.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ManageBookingComponent } from './manage-booking/manage-booking.component';

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent
  },
  {
    path: "dashboard",
    component: DashboardComponent
  },
  {
    path: "login",
    component: LoginComponent
  },

  {
    path: "book/:id",
    component: BookingComponent
  },

  {
    path: "manage",
    component: ManageBookingComponent
  },
 

  {
    path: "admin",
    children: [
      {
        path: 'dashboard',
        component: AdminDashboardComponent,
        canActivate: [AuthGuard] 
      },
      {
        path: 'add',
        component: AddCampComponent,
        canActivate: [AuthGuard] 
      },
      {
        path: "edit/:id",
        component: UpdateCampComponent,
        canActivate: [AuthGuard] 
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
