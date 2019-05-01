import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResultRoutingModule } from './result-routing.module';
import { ResultComponent } from './result.component';
import { PageHeaderModule } from '../../shared';

@NgModule({
    imports: [CommonModule, ResultRoutingModule, PageHeaderModule, MaterialModule, FormsModule, ReactiveFormsModule],
    declarations: [ResultComponent]
})
export class ResultModule {}
