import { AstMemoryEfficientTransformer } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CampsService } from 'src/app/services/camps.service';

@Component({
  selector: 'app-update-camp',
  templateUrl: './update-camp.component.html',
  styleUrls: ['./update-camp.component.css']
})
export class UpdateCampComponent implements OnInit {

  EditCamp=new FormGroup({
    id:new FormControl('',Validators.required),
    img: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    rate: new FormControl('', Validators.required),
    capacity: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })

  message="";
  imgURL:any="https://placehold.jp/13/1f3f9e/ffffff/250x250.png?text=%3CImage%20Preview%20Here%3E";
  imagePath:any;

  collection:any=[];
  alert=false;
  constructor(private campService: CampsService, private route: ActivatedRoute, private router:Router) { 
    
  }

  ngOnInit(): void {

    this.route.paramMap.subscribe({
      next:(params)=>{
        const id=params.get('id');
        if(id){
          this.campService.getCamp(id).subscribe({
            next:(Response:any)=>{
              // console.log(Response);
              // this.collection=Response;
              // console.log(this.collection);
              this.EditCamp=new FormGroup({
                id:new FormControl(Response['id']),
                img: new FormControl(Response['img']),
                name: new FormControl(Response['name']),
                rate: new FormControl(Response['rate']),
                capacity: new FormControl(Response['capacity']),
                description: new FormControl(Response['description'])
              })
              this.imgURL=Response['img'];
              // console.log(this.EditCamp.value)
            }
          })
        }
      }
    })
  }


  updateCamp(){
    this.EditCamp.value.img=this.imgURL;
    console.warn("On Update",this.EditCamp.value);
    
    this.campService.updateCamp(this.EditCamp.value.id,this.EditCamp.value).subscribe({
      next:(response)=>{
        this.router.navigate(['admin/dashboard']);
      }
    })
    
  }

  deleteCamp(id:any){
    var choice = confirm("Do you want to delete the Camp?");
    if (choice) {
      this.campService.deleteCamp(id).subscribe({
        next:(Response)=>{
          this.router.navigate(['admin/dashboard']);
        }
      })
    }
  }

  preview(file:any){
    if (file.length === 0)
      return;
 
    var mimeType = file[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = "Only images are supported.";
      return;
    }
    this.message="";
 
    var reader = new FileReader();
    this.imagePath = file;
    reader.readAsDataURL(file[0]); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
    console.log(this.imgURL);
  }

  CloseAlert(){
    this.alert=false;
  }

}
