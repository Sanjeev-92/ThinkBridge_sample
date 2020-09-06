import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoreListComponent } from 'src/modules/inventory-sample/store-list/store-list.component';
import { AddItemComponent } from 'src/modules/inventory-sample/add-item/add-item.component';
import { P404Component } from 'src/common/components/p404/p404.component';
import { P500Component } from 'src/common/components/p500/p500.component';


const routes: Routes = [
  { path: '', pathMatch: 'full' ,component: StoreListComponent},
  { path: 'list', pathMatch: 'full' ,component: StoreListComponent},
  { path: 'add', pathMatch: 'full', component: AddItemComponent},
  { path: '404', component: P404Component },
  { path: '500', component: P500Component },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
