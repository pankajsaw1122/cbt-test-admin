import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { routerTransition } from '../router.animations';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { ApiService } from '../shared/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [routerTransition()]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  successMsg: Boolean = false;
  successMsgDisplay: String = '';
  errorMsg: Boolean = false;
  errorMsgDisplay: String = '';
  error: Error;
  constructor(public router: Router, private apiService: ApiService) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      userId: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  onLoggedin() {
    console.log('logged in worked');
    // this.router.navigate(['/dashboard']);
    this.apiService.loginAdmin(this.loginForm.value).subscribe((data: any) => {
      console.log(data);
      if (data.status === 200 || data.status === '200') {
        localStorage.setItem('authToken', data.data.token);
        this.router.navigate(['/dashboard']);
      } else {
        this.errorMessage('Something went wrong please try again');
      }
    });
  }
  successMessage(message) {
    this.successMsg = true;
    this.successMsgDisplay = message;

    setTimeout(() => {
      this.successMsg = false;
      this.successMsgDisplay = '';
    }, 3000);
  }

  errorMessage(message) {
    this.errorMsg = true;
    this.errorMsgDisplay = message;

    setTimeout(() => {
      this.errorMsg = false;
      this.errorMsgDisplay = '';
    }, 3000);
  }
}
