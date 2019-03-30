import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { CandidatesRoutingModule } from './candidates-routing.module';
import { AddCandidatesComponent } from './add-candidates/add-candidates.component';
import { CandidatesComponent } from './candidates.component';
import { PageHeaderModule } from '../../shared';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [CommonModule, CandidatesRoutingModule, PageHeaderModule, MaterialModule, FormsModule, ReactiveFormsModule],
    declarations: [CandidatesComponent, AddCandidatesComponent]
})
export class CandidatesModule {}
