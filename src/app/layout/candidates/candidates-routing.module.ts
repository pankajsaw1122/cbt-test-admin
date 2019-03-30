import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandidatesComponent } from './candidates.component';
import { AddCandidatesComponent } from './add-candidates/add-candidates.component';

const routes: Routes = [
    {
        path: '', component: CandidatesComponent
    },
    {
      path: 'add-candidates', component: AddCandidatesComponent
  },
  {
    path: 'edit-candidates/:id', component: AddCandidatesComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandidatesRoutingModule { }
