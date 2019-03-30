import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { ApiService } from '../../shared/services/api.service';
import { Router } from '@angular/router';
import {
  MatTableDataSource,
  MatPaginator,
  MatSort,
  MatDialog
} from '@angular/material';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
  examManageForm: FormGroup;
  examData = [];
  btnText1 = 'Allow Login';
  btnText2 = 'Start Exam';
  showLoggedInData = 0;
  showExamStartedData = 0;
  displayedColumns: string[] = ['id', 'fname', 'lname', 'classes', 'roll_no'];
  dataSource: MatTableDataSource<LiveExamData>;
  submitSuccess = null;
  resultsLength = 0;
  isLoadingResults = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(
    public dialog: MatDialog,
    private apiService: ApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.examManageForm = new FormGroup({
      examId: new FormControl('', [Validators.required]),
      classes: new FormControl('', [Validators.required]),
      setMasterPassword: new FormControl('', [Validators.required])
    });

    this.apiService.getExamData('').subscribe((data: any) => {
      console.log(data);
      if (data.status === 200 || data.status === '200') {
        console.log('Data fetched successfully');
        this.examData = data.data;
        console.log(this.examData);
      } else if (data.status === 401) {
        this.router.navigate(['/login']);
      } else {
        console.log('request failed');
      }
    });
  }

  onChange(id) {
    this.apiService.getExamStatistics(id).subscribe((data: any) => {
      console.log(data);
      if (data.status === 200 || data.status === '200') {
        console.log('Data fetched successfully');
        //   this.examData = data.data;
        console.log(data);
      } else if (data.status === 401) {
        this.router.navigate(['/login']);
      } else {
        console.log('request failed');
      }
    });
  }

  allowLogin() {
    this.apiService
      .allowLogin(this.examManageForm.value)
      .subscribe((data: any) => {
        console.log(data);
        if (data.status === 200 || data.status === '200') {
          console.log('Login Allowed successfully');
          //   this.examData = data.data;
          this.btnText1 = 'Login Allowed';
        } else {
          console.log('request failed');
        }
      });
  }

  allowStartExam() {
    this.apiService
      .allowStartExam(this.examManageForm.value)
      .subscribe((data: any) => {
        console.log(data);
        if (data.status === 200 || data.status === '200') {
          console.log('Data fetched successfully');
          //   this.examData = data.data;
          console.log(data);
          this.btnText2 = 'Exam Started';
        } else {
          console.log('request failed');
        }
      });
  }
}

export interface LiveExamData {
  id: string;
  fname: string;
  lname: string;
  classes: string;
  roll_no: string;
}
