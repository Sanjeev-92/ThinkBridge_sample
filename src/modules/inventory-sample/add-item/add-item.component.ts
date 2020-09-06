import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BaseService } from 'src/common/services/base-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,private baseService:BaseService, private router: Router) { }

  ngOnInit() {
      this.registerForm = this.formBuilder.group({
          name: ['', Validators.required],
          price: [, Validators.required],
          description: ['', [Validators.required, Validators.maxLength(500)]],
         // avatar:[File, [Validators.required]],
      });
  }
  onFileChange(event) { 
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.registerForm.controls['avatar'].patchValue({
          tso: reader.result
        });
      };
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }

  onSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.registerForm.invalid) { 
          return;
      }else{
        console.log("form value is",this.registerForm.value);
        this.baseService.post(this.registerForm.value).subscribe((res)=>{
          console.log("Res",res);
          if(res.status == 200){
            this.registerForm.reset();
            this.router.navigate(['/list']);
          }
        },(err)=>{
          console.log("err is",err);
        })
      }
      console.log('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value))
  }
  backToList(){ // Redirecting to list page
    this.router.navigate(['./list'])
  }

}

