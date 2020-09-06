import { Component, OnInit } from '@angular/core';
import { BaseService } from 'src/common/services/base-service';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { AlertService } from 'ngx-alerts';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.css'] 
})
export class StoreListComponent implements OnInit {
  items:Array<object>;
  constructor(
    private baseService:BaseService,
    private router: Router,
    private sanitizer:DomSanitizer,
    private alertService: AlertService
  ) {
    //this.numbers = Array(10).fill(Array(5).map((x,i)=>i)).map((x,i)=>i); // [0,1,2,3,4]
    //this.numbers = Array(5).fill(4); // [4,4,4,4,4]
    ///console.log("Numbers is",this.numbers);
  }

  ngOnInit() {
    this.getInventroryItems();
  }
  getInventroryItems(id?:number){ // method to get all inventory items from DB
    this.baseService.get().subscribe((res)=>{
      console.log("items are",res);
      if(res.status == 200){
        this.items =res.items;
      }else{

      }
    },(error)=>{
    })
  }
  addItem(){
    this.router.navigate(['/add']); 
  }
  deleteItem(item:object){ // Delete object from list method
    if(item['id'] !=undefined){
      this.baseService.delete(item).subscribe(res=>{
        if(res.status == 200){
          this.getInventroryItems();
          this.alertService.success(res.message)
        }
      },err=>{
        console.log("Error");
      })
    }
  }
  editItem(item:object){ // edit object in list method
   
  }
  transform(image){
    return this.sanitizer.bypassSecurityTrustResourceUrl(image);
}
}
