import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { CampsService } from 'src/app/services/camps.service';

@Component({
  selector: 'app-add-camp',
  templateUrl: './add-camp.component.html',
  styleUrls: ['./add-camp.component.css']
})
export class AddCampComponent implements OnInit {

  message="";
  imgURL:any="https://placehold.jp/13/1f3f9e/ffffff/250x250.png?text=%3CImage%20Preview%20Here%3E";
  imagePath:any;

  alert=false;
  AddCamp=new FormGroup({
    img: new FormControl(this.imgURL, Validators.required),
    name: new FormControl('', Validators.required),
    rate: new FormControl('', Validators.required),
    capacity: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  })

  
  constructor(private campService: CampsService, private router: Router, public fb: FormBuilder) { 
    
  }

  ngOnInit(): void {
    
  }


  addCamp(){
   
    this.AddCamp.value.img=this.imgURL;
    if(this.imgURL=="https://placehold.jp/13/1f3f9e/ffffff/250x250.png?text=%3CImage%20Preview%20Here%3E"){
      alert("Please add camp image!")
      return;
    }
    // console.log(this.AddCamp.value);
    this.campService.postCamp(this.AddCamp.value).subscribe(result=>{
      console.warn("Posted camp returning: ", result);
      this.router.navigate(['admin/dashboard']);

    });    
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
    
    // console.log(this.imagePath);
    // console.log(this.imgURL);

    
  }

 
  CloseAlert(){
    this.alert=false;
  }
}
