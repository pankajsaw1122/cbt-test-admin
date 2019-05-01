import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import {
  MatTableDataSource,
  MatDialog,
  MatSort,
  MatPaginator
} from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
  animations: [routerTransition()]
})
export class ResultComponent implements OnInit {
  resultForm: FormGroup;
  examData = [];
  resultData = [];
  displayedColumns: string[] = [
    'fname',
    'lname',
    'exam_name',
    'classes',
    'roll_no',
    'total_marks'
  ];
  dataSource: MatTableDataSource<ResultData>;
  submitSuccess = null;
  resultsLength = 0;
  isLoadingResults = false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(private apiService: ApiService, private router: Router) {}

  ngOnInit() {
    this.resultForm = new FormGroup({
      examId: new FormControl('', [Validators.required]),
      classes: new FormControl('', [Validators.required])
    });

    this.apiService.getExamData('').subscribe((data: any) => {
      console.log(data);
      if (data.status === 200 || data.status === '200') {
        console.log('Data fetched successfully');
        this.examData = data.data;
        console.log(this.examData);
      } else {
        console.log('request failed');
      }
    });
  }

  applyFilter(filterValue: string) {
    console.log('filter working');
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onClassChange(id) {
    this.apiService
      .getExamResult(this.resultForm.value)
      .subscribe((data: any) => {
        console.log(data);
        if (data.status === 200 || data.status === '200') {
          console.log('Data fetched successfully');
          // this.resultData = data.data;
          this.dataSource = new MatTableDataSource(data.data);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.resultsLength = data.data.length;
          this.isLoadingResults = false;
          this.submitSuccess = 1;
          console.log(this.resultData);
        } else {
          this.isLoadingResults = false;
          this.submitSuccess = 0;
          console.log('request failed');
        }
      });
  }
}

export interface ResultData {
  // id: string;
  fname: string;
  lname: string;
  exam_name: string;
  classes: number;
  roll_no: number;
  total_marks: string;
}
