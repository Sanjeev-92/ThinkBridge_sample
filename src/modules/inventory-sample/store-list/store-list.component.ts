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
  items:Array<object>; // Declaring variable to store values
  constructor( // Listing common services 
    private baseService:BaseService,
    private router: Router,
    private sanitizer:DomSanitizer,
    private alertService: AlertService
  ) {
  }

  ngOnInit() {
    this.getInventroryItems();
  }
  getInventroryItems(id?:number){ // method to get all inventory items from DB
    this.baseService.get().subscribe((res)=>{
      if(res.status == 200){
        this.items =res.items;
      }else{
        //TODO 
      }
    },(error)=>{
      //TODO
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
  details(items:Object){ //  Go to details page
    console.log("Item",items); 
  }
  transform(image){
    return this.sanitizer.bypassSecurityTrustResourceUrl(image);
}
}
