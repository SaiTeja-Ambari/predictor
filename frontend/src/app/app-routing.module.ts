import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CollegeComponent } from './college/college.component';
import { RankComponent } from './rank/rank.component';

const routes: Routes = [
  { path : 'college', component : CollegeComponent},
  { path : 'rank', component : RankComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
