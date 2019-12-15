import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/services/api.service';
import { Router, ActivatedRoute } from '@angular/router';
import { routerTransition } from 'src/app/router.animations';
@Component({
  selector: 'app-add-questions',
  templateUrl: './add-questions.component.html',
  styleUrls: ['./add-questions.component.scss'],
  animations: [routerTransition()]
})
export class AddQuestionsComponent implements OnInit {
  editId = undefined;
  quesForm: FormGroup;
  examData: [];
  categData: [];
  quesTypeData: [];
  pageHeading = 'Add Questions';
  btnText = 'Add';
  submitSuccess = null;
  apiMsg = '';
  errorText = '';
  typeId = 1;
  quesData = {
    option_id: []
  };

  quesImages: File = null;
  name = 'ckeditor';
  ckeConfig: any;

  mycontent: string;
  log: string = '';
  @ViewChild('editor') ckeditor: any;

  constructor(
    private apiService: ApiService,
    private router: Router,
    private paramRoute: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    // configremovePlugins: 'Save,Print,Preview,Find,About,Maximize,ShowBlocks'

    // this.ckeConfig = {
    //   allowedContent: false,
    //   enterMode: 2,
    //   extraPlugins: 'divarea',
    //   forcePasteAsPlainText: false,
    //   height: '120px',
    //   toolbarGroups: [
    //     // { 'name': 'document', 'groups': [ 'mode', 'document', 'doctools' ] },
    //     { 'name': 'clipboard' },
    //     { 'name': 'editing', 'groups': ['find', 'selection', 'spellchecker', 'editing'] },
    //   ],
    //   // removeButtons:'Source,Save,Templates,Find,Replace,Scayt,SelectAll'
    // };

    this.editId = this.paramRoute.snapshot.params['id'];
    this.quesForm = new FormGroup({
      examId: new FormControl('', [Validators.required]),
      categId: new FormControl('', [Validators.required]),
      quesText: new FormControl('Enter question text here.....', [Validators.required]),
      quesImage: new FormControl(''),
      marks: new FormControl(1, [Validators.required]),
      negMark: new FormControl(0.25, [Validators.required]),
      choiceType: new FormControl(1, [Validators.required]),
      choice1: new FormControl('Please enter first option text here', [Validators.required]),
      choice1Image: new FormControl(''),
      choice2: new FormControl('Please enter 2nd option text here', [Validators.required]),
      choice2Image: new FormControl(''),
      choice3: new FormControl('Please enter 3rd option text here', [Validators.required]),
      choice3Image: new FormControl(''),
      choice4: new FormControl('Please enter 4th option text here', [Validators.required]),
      choice4Image: new FormControl(''),
      choiceA: new FormControl(false),
      choiceB: new FormControl(false),
      choiceC: new FormControl(false),
      choiceD: new FormControl(false)
    });
    this.apiService.getExamData('').subscribe((data: any) => {
      if (data.status === 200 || data.status === '200') {
        this.examData = data.data;
      } else {
        console.log('request failed');
      }
    });

    this.apiService.getQuesType().subscribe((data: any) => {
      if (data.status === 200 || data.status === '200') {
        this.quesTypeData = data.data;
      } else {
        console.log('request failed');
      }
    });

    if (this.editId !== undefined) {
      this.pageHeading = 'Edit Question';
      this.btnText = 'Update';
      this.apiService.getQuesData(this.editId).subscribe((data: any) => {
        if (data.status === 200 || data.status === '200') {
          this.quesData = data.data[0];
          this.quesForm.get('examId').setValue(data.data[0].exam_id);
          this.showCategoryList(data.data[0].exam_id);
          this.quesForm.get('categId').setValue(data.data[0].ques_categ_id);
          this.quesForm.get('quesText').setValue(data.data[0].ques_text);
          this.quesForm.get('quesImage').setValue(data.data[0].ques_image);
          this.quesForm.get('marks').setValue(data.data[0].marks);
          this.quesForm.get('negMark').setValue(data.data[0].neg_mark);
          this.quesForm.get('choiceType').setValue(data.data[0].ques_type_id);
          this.quesForm.get('choice1').setValue(data.data[0].choice_text[0]);
          this.quesForm.get('choice1Image').setValue(data.data[0].choice_image[0]);
          this.quesForm.get('choice2').setValue(data.data[0].choice_text[1]);
          this.quesForm.get('choice2Image').setValue(data.data[0].choice_image[1]);
          this.quesForm.get('choice3').setValue(data.data[0].choice_text[2]);
          this.quesForm.get('choice3Image').setValue(data.data[0].choice_image[2]);
          this.quesForm.get('choice4').setValue(data.data[0].choice_text[3]);
          this.quesForm.get('choice4Image').setValue(data.data[0].choice_image[3]);
          this.quesForm.get('choiceA').setValue(data.data[0].choice_id[0]);
          this.quesForm.get('choiceB').setValue(data.data[0].choice_id[1]);
          this.quesForm.get('choiceC').setValue(data.data[0].choice_id[2]);
          this.quesForm.get('choiceD').setValue(data.data[0].choice_id[3]);
        } else {
          this.submitSuccess = 0;
          console.log('request failed');
        }
      });
    }
  }
  onUpload(event, id) {
    console.log(event);
    this.quesImages = null;
    const fd = new FormData();
    this.quesImages = <File>event.target.files[0];
    fd.append('imagefile', this.quesImages, this.quesImages.name);
    console.log(fd);
    this.getImagePath(fd, id);
  }
  getImagePath(fd, id) {
    this.apiService.getImagePath(fd).subscribe((data: any) => {
      if (data.status === 200 || data.status === '200') {
        console.log(data.data.imagepath);
        console.log(id);
        if (id == 0) {
          this.quesForm.get('quesImage').setValue(data.data.imagepath);
          console.log('inside first upload');
        }
        if (id == 1) {
          this.quesForm.get('choice1Image').setValue(data.data.imagepath);
        }
        if (id == 2) {
          this.quesForm.get('choice2Image').setValue(data.data.imagepath);
        }
        if (id == 3) {
          this.quesForm.get('choice3Image').setValue(data.data.imagepath);
        }
        if (id == 4) {
          this.quesForm.get('choice4Image').setValue(data.data.imagepath);
        }
      } else {
        console.log('request failed');
      }
    });
  }


  showCategoryList(id) {
    console.log('change method called');
    this.apiService.getCategoryList(id).subscribe((data: any) => {
      if (data.status === 200 || data.status === '200') {
        // console.log('Data fetched successfully');
        this.categData = data.data;
      } else if (data.status === 401 || data.status === '401') {
        console.log('Token error');
        this.router.navigate(['/login']);
      } else {
        console.log('request failed');
      }
    });
  }
  setChoiceType(id) {
    let count = 0;
    this.errorText = '';
    if (id === 1) {
      if (this.quesForm.value.choiceA) {
        count++;
      }
      if (this.quesForm.value.choiceB) {
        count++;
      }
      if (this.quesForm.value.choiceC) {
        count++;
      }
      if (this.quesForm.value.choiceD) {
        count++;
      }
      if (count === 0) {
        this.errorText = 'Please tick on correct answer option box';
      } else if (count > 1) {
        this.errorText = 'Please remove multiple selection';
      } else {
        count = 0;
        this.errorText = '';
      }
    } else if (id === 2) {
      if (
        this.quesForm.value.choiceA ||
        this.quesForm.value.choiceB ||
        this.quesForm.value.choiceC ||
        this.quesForm.value.choiceD
      ) {
        count++;
      }
      if (count === 0) {
        this.errorText = 'Please select atleast one correct answer';
      } else {
        count = 0;
        this.errorText = '';
      }
    }
  }

  onSubmit() {

    this.setChoiceType(this.quesForm.value.choiceType);
    if (!this.quesForm.valid || this.errorText.length !== 0) {
      return;
    }
    if (this.editId === undefined) {
      this.apiService
        .addQuestion(this.quesForm.value)
        .subscribe((data: any) => {
          if (data.status === 200 || data.status === '200') {
            this.quesForm.get('quesText').setValue('Enter question text here.....');
            this.quesForm.get('quesImage').setValue('');
            this.quesForm.get('choice1').setValue('Please enter first option text here');
            this.quesForm.get('choice1Image').setValue('');
            this.quesForm.get('choice2').setValue('Please enter 2nd option text here');
            this.quesForm.get('choice2Image').setValue('');
            this.quesForm.get('choice3').setValue('Please enter 3rd option text here');
            this.quesForm.get('choice3Image').setValue('');
            this.quesForm.get('choice4').setValue('Please enter 4th option text here');
            this.quesForm.get('choice4Image').setValue('');
            this.quesForm.get('choiceA').setValue(false);
            this.quesForm.get('choiceB').setValue(false);
            this.quesForm.get('choiceC').setValue(false);
            this.quesForm.get('choiceD').setValue(false);
            // setTimeout(() => {
            //   this.apiMsg = '';
            //   this.submitSuccess = null;
            //   this.router
            //     .navigateByUrl('/questions', { skipLocationChange: true })
            //     .then(() => this.router.navigate(['/questions/add-questions']));
            // }, 1500);
            this.submitSuccess = 1;
            setTimeout(() => {
              this.submitSuccess = null;
              this.apiMsg = '';
            }, 3000);
            this.apiMsg = 'Question added Successfully';
          } else {
            this.submitSuccess = 0;
            this.apiMsg = data.message;
            console.log('request failed');
          }
        });
    } else {
      this.quesForm.value.editId = this.editId;
      this.quesForm.value.optionId1 = this.quesData.option_id[0];
      this.quesForm.value.optionId2 = this.quesData.option_id[1];
      this.quesForm.value.optionId3 = this.quesData.option_id[2];
      this.quesForm.value.optionId4 = this.quesData.option_id[3];

      this.apiService
        .updateQuestion(this.quesForm.value)
        .subscribe((data: any) => {
          if (data.status === 200 || data.status === '200') {
            setTimeout(() => {
              this.router.navigate(['/questions']);
            }, 3000);
            this.submitSuccess = 1;
            this.apiMsg = 'Question Update Successfull';
          } else {
            this.submitSuccess = 0;
            this.apiMsg = data.message;

            console.log('request failed');
          }
        });
    }
  }
}
