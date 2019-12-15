import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionsRoutingModule } from './questions-routing.module';
import { QuestionsComponent } from './questions.component';
import { PageHeaderModule } from '../../shared';
import { AddQuestionsComponent } from './add-questions/add-questions.component';
// import { CKEditorModule } from 'ng2-ckeditor';
import { CKEditorModule } from 'ckeditor4-angular';

@NgModule({
    imports: [CommonModule, QuestionsRoutingModule, PageHeaderModule, MaterialModule, FormsModule, ReactiveFormsModule, CKEditorModule],
    declarations: [QuestionsComponent, AddQuestionsComponent]
})
export class QuestionsModule {}
