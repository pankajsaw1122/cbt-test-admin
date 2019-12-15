import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'candidates', loadChildren: './candidates/candidates.module#CandidatesModule' },
            { path: 'exam', loadChildren: './exam/exam.module#ExamModule' },
            { path: 'categories', loadChildren: './categories/categories.module#CategoriesModule' },
            { path: 'questions', loadChildren: './questions/questions.module#QuestionsModule' },
            { path: 'student-list', loadChildren: './student-list/student-list.module#StudentListModule' },
            { path: 'result', loadChildren: './result/result.module#ResultModule'}

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
