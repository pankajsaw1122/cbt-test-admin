import { NgModule, Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ApiService } from '../../../shared/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from 'src/app/router.animations';

@Component({
  selector: 'app-add-candidates',
  templateUrl: './add-candidates.component.html',
  styleUrls: ['./add-candidates.component.scss'],
  animations: [routerTransition()]
})
export class AddCandidatesComponent implements OnInit {
  editId = undefined;
  candtForm: FormGroup;
  examData = [];
  pageHeading = 'Add Candidate';
  btnText = 'Add';
  submitSuccess = null;
  successMsg = '';
  constructor(
    private apiService: ApiService,
    private router: Router,
    private paramRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.candtForm = new FormGroup({
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      roll_no: new FormControl('', [Validators.required]),
      classes: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      mobile_no: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(11)
      ])
    });

    this.editId = this.paramRoute.snapshot.params['id'];

    if (this.editId !== undefined) {
      this.pageHeading = 'Edit Candidate';
      this.btnText = 'Update';
      this.apiService.getCandidatesData(this.editId).subscribe((data: any) => {
        console.log(data);
        if (data.status === 200 || data.status === '200') {
          // this.examData = data.data[0];
          this.candtForm.get('fname').setValue(data.data[0].fname);
          this.candtForm.get('lname').setValue(data.data[0].lname);
          this.candtForm.get('roll_no').setValue(data.data[0].roll_no);
          this.candtForm.get('classes').setValue(data.data[0].classes);
          this.candtForm.get('email').setValue(data.data[0].email);
          this.candtForm.get('mobile_no').setValue(data.data[0].mobile_no);

          // console.log(this.candtForm.value.examId);
        } else {
          this.submitSuccess = 0;
          console.log('request failed');
        }
      });
    }
  }

  onSubmit() {
    if (this.editId === undefined) {
      this.apiService
        .addCandidate(this.candtForm.value)
        .subscribe((data: any) => {
          console.log(data);
          if (data.status === 200 || data.status === '200') {
            setTimeout(() => {
              this.router.navigate(['/candidates']);
            }, 3000);
            this.submitSuccess = 1;
            this.successMsg = 'Candidate added Successfully';
          } else {
            this.submitSuccess = 0;
            console.log('request failed');
          }
        });
    } else {
      this.candtForm.value.editId = this.editId;
      this.apiService
        .updateCandidateData(this.candtForm.value)
        .subscribe((data: any) => {
          console.log(data);
          if (data.status === 200 || data.status === '200') {
            setTimeout(() => {
              this.router.navigate(['/candidates']);
            }, 3000);
            this.submitSuccess = 1;
            this.successMsg = 'Candidate Update Successfull';
          } else if (data.statusCode === 401) {
            this.router.navigate(['/login']);
          } else {
            this.submitSuccess = 0;
            console.log('request failed');
          }
        });
    }
  }
}
