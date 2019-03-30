import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// import { map } from 'rxjs/operators';

@Injectable()
export class ApiService {
  private apiUrl = 'http://localhost:5000/';

  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }


  loginAdmin(data) {
    return this.http.post(this.apiUrl + 'admin/login', data).pipe(map((res) => res), catchError(this.handleError));
  }
  addExam(data) {
    return this.http.post(this.apiUrl + 'exam/addExam', data, {
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('authToken'))
    }).pipe(map((res) => res), catchError(this.handleError));
  }
  getExamData(data) {
    return this.http.get(this.apiUrl + 'exam/getExamData?id=' + data, {
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('authToken'))
    }).pipe(map((res) => res), catchError(this.handleError));
  }
  updateExam(data) {
    return this.http.post(this.apiUrl + 'exam/updateExam', data, {
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('authToken'))
    }).pipe(map((res) => res), catchError(this.handleError));
  }

  deleteExam(data) {
    return this.http.delete(this.apiUrl + 'exam/deleteExam?id=' + data, {
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('authToken'))
    }).pipe(map((res) => res), catchError(this.handleError));
  }

  addCategory(data) {
    return this.http.post(this.apiUrl + 'categ/addQuesCateg', data, {
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('authToken'))
    }).pipe(map((res) => res), catchError(this.handleError));
  }

  updateCategory(data) {
    return this.http.put(this.apiUrl + 'categ/updateQuesCateg', data, {
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('authToken'))
    }).pipe(map((res) => res), catchError(this.handleError));
  }

  getCategoryData(data) {
    return this.http.get(this.apiUrl + 'categ/getCategData?id=' + data, {
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('authToken'))
    }).pipe(map((res) => res), catchError(this.handleError));
  }

  deleteCategory(data) {
    return this.http.delete(this.apiUrl + 'categ/deleteQuesCateg?id=' + data, {
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('authToken'))
    }).pipe(map((res) => res), catchError(this.handleError));
  }

  getQuesType() {
    return this.http.get(this.apiUrl + 'ques/getQuesType', {
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('authToken'))
    }).pipe(map((res) => res), catchError(this.handleError));
  }

  addQuestion(data) {
    return this.http.post(this.apiUrl + 'ques/addQues', data, {
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('authToken'))
    }).pipe(map((res) => res), catchError(this.handleError));
  }

  updateQuestion(data) {
    return this.http.post(this.apiUrl + 'ques/updateQues', data, {
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('authToken'))
    }).pipe(map((res) => res), catchError(this.handleError));
  }

  getQuesData(data) {
    return this.http.get(this.apiUrl + 'ques/getQuesData?id=' + data, {
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('authToken'))
    }).pipe(map((res) => res), catchError(this.handleError));
  }
  deleteQues(data) {
    return this.http.delete(this.apiUrl + 'ques/deleteQues?id=' + data, {
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('authToken'))
    }).pipe(map((res) => res), catchError(this.handleError));
  }
  addCandidate(data) {
    return this.http.post(this.apiUrl + 'candidate/addCandt', data, {
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('authToken'))
    }).pipe(map((res) => res), catchError(this.handleError));
  }

  getCandidatesData(data) {
    return this.http.get(this.apiUrl + 'candidate/getCandtData?id=' + data, {
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('authToken'))
    }).pipe(map((res) => res), catchError(this.handleError));
  }

  updateCandidateData(data) {
    return this.http.post(this.apiUrl + 'candidate/updateCandt', data, {
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('authToken'))
    }).pipe(map((res) => res), catchError(this.handleError));
  }
  deleteCandidate(data) {
    return this.http.delete(this.apiUrl + 'candidate/deleteCandt?id=' + data, {
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('authToken'))
    }).pipe(map((res) => res), catchError(this.handleError));
  }

  allowLogin(data) {
    return this.http.post(this.apiUrl + 'manageExam/allowLogin', data, {
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('authToken'))
    }).pipe(map((res) => res), catchError(this.handleError));
  }
  allowStartExam(data) {
    return this.http.post(this.apiUrl + 'manageExam/allowStartExam', data, {
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('authToken'))
    }).pipe(map((res) => res), catchError(this.handleError));
  }

  getExamStatistics(data) {
    return this.http.get(this.apiUrl + 'manageExam/getExamInfo?id=' + data, {
      headers: new HttpHeaders().set('Authorization', localStorage.getItem('authToken'))
    }).pipe(map((res) => res), catchError(this.handleError));
  }
}