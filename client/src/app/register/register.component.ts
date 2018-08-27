import { Component, OnInit } from '@angular/core';
import { faCloudUploadAlt } from '@fortawesome/free-solid-svg-icons'
import { Http } from '@angular/http';
import { HttpClient } from '@angular/common/http';
import { newUser } from '../user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ValidationService } from '../services/validation.service';

import * as $ from 'jquery';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm = new FormGroup({
    fullname: new FormControl('', [Validators.required]),
    email: new FormControl(''),
    password: new FormControl(''),
    username: new FormControl(''),
    gender: new FormControl(''),
    birthDay: new FormControl(''),
    birthMonth: new FormControl(''),
    birthYear: new FormControl('')
  });

  errors: number;
  checkedFields: number;

  genderValidated: boolean;

  step: Number;

  avatar: File;
  
  birthDate: Date;
  birthDay: string;
  birthMonth: string;
  birthYear: string;

  days: [number];
  months: [number];
  years: [number];

  ready1: boolean;
  ready2: boolean;

  done: boolean = false;

  //Font Awesome
  faCloudUploadAlt = faCloudUploadAlt;
  
  constructor(private http: HttpClient, private validation: ValidationService, private auth: AuthService, private flashMessages: FlashMessagesService) {
    this.checkedFields = 0;
    this.errors = 0;
    this.genderValidated = false;

    this.ready1 = false;
    this.ready2 = false;
  
    this.days = [1];
    this.months = [1];
    this.years = [2018];
    this.step = 1;
    for (let _i = 2; _i <= 31; _i++) {
      this.days.push(_i);
    }
    for (let _i = 2; _i <= 12; _i++) {
      this.months.push(_i);
    }
    for (let _i = 2017; _i >= 1918; _i--) {
      this.years.push(_i);
    }
  }

  ngOnInit() {
  }

  changeStep(step: number): void {
    this.step = step;
  }

  updateReadyStatus() {
    console.log(this.checkedFields, this.errors, this.ready1);
      for (let i = 0; i < 3; i++) {
        if ($('form input').get(i).classList.contains('validated')) {
          if ($('form input').get(i).classList.contains('error')) {
            this.ready1 = false;
            break;
          } else {
            this.ready1 = true;
          }
        } else {
          this.ready1 = false;
          break;
        }
      }
  }

  

  emailValidation(event: any): void {
    if (!event.target.classList.contains('validated')) {
      this.checkedFields++;
      event.target.classList.add('validated');
    }

    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(event.target.value)) {
      if (event.target.classList.contains('error')) {
        event.target.classList.remove('error');
        this.errors--;
      }
    } else {
      if (!event.target.classList.contains('error')) {
        event.target.classList.add('error');
        this.errors++;
      }
    }

    this.updateReadyStatus();
  }

  standardValidation(event: any): void {
    if (!event.target.classList.contains('validated')) {
      this.checkedFields++;
      event.target.classList.add('validated');
    }

    if (event.target.value.length < 1) {
      if (!event.target.classList.contains('error')) {
        event.target.classList.add('error');
        this.errors++;
      }
    } else {
      if (event.target.classList.contains('error')) {
        event.target.classList.remove('error');
        this.errors--;
      }
    }

    this.updateReadyStatus();
  }

  textValidation(event: any, minLength: number): void {
    if (!event.target.classList.contains('validated')) {
      this.checkedFields++;
      event.target.classList.add('validated');
    }

    if (event.target.value.length < minLength){
      if (!event.target.classList.contains('error')) {
        event.target.classList.add('error');
        this.errors++;
      }
    } else {
      if (event.target.classList.contains('error')) {
        event.target.classList.remove('error');
        this.errors--;
      }
    }

    if (this.ready1 === false) {
      if (this.checkedFields === 3 && this.errors === 0) {
        this.ready1 = true;
      }
    }

    this.updateReadyStatus();
  }

  setBirthDay(event: any): void {
    console.log(event.target.value);
    if (!event.target.classList.contains('validated')) {
      this.checkedFields++;
      event.target.classList.add('validated');
    }
    if (event.target.value.length > 0) {
      let colons = event.target.value.indexOf(':');
      this.birthDay = event.target.value.slice(colons + 1);
      console.log(this.birthDay);
    } else {
      
    }
  }

  setBirthMonth(event: any): void {
    if (!event.target.classList.contains('validated')) {
      this.checkedFields++;
      event.target.classList.add('validated');
    }
    if (event.target.value.length > 0) {
      console.log(event.target.value);
      let colons = event.target.value.indexOf(':');
      this.birthMonth = event.target.value.slice(colons + 1);
      console.log(this.birthMonth);
    } else {
      
    }
  }

  setBirthYear(event: any): void {
    if (!event.target.classList.contains('validated')) {
      this.checkedFields++;
      event.target.classList.add('validated');
    }
    if (event.target.value.length > 0) {
      let colons = event.target.value.indexOf(':');
      this.birthYear = event.target.value.slice(colons + 1);
      console.log(this.birthYear);
    } else {
      
    }
  }

  nextStep(): void {
    this.step = 2;
  }

  setBirthDate(): void {
      let birthDate = this.birthYear.concat('-', this.birthMonth, '-', this.birthDay);
      this.birthDate = new Date(birthDate);
      console.log(this.birthDay);
      console.log(this.birthMonth);
      console.log(this.birthYear);
  }

  setGender(gender: string): void {
    if (this.genderValidated === false) {
      this.checkedFields++;
      this.genderValidated = true;
    }
    this.registerForm.value.gender = gender;
    console.log(this.registerForm.value.gender);
  }

  onFileSelected(event): void {
    this.avatar = <File>event.target.files[0];

    if (!event.target.classList.contains('validated')) {
      this.checkedFields++;
      event.target.classList.add('validated');
    }

    if (!this.avatar) {
      $('input[type=file]').parent().addClass('error');
    } else {
      $('input[type=file]').parent().removeClass('error');
    }
  }

  onFormSubmit(): void {
    console.log(this.registerForm.errors);
    if ((this.errors < 1) && this.checkedFields >=  9) {
      this.setBirthDate();
      
      const fd = new FormData();
      fd.append('avatar', this.avatar);
      let newUser: newUser;

      newUser = {
        fullname: this.registerForm.value.fullname,
        email: this.registerForm.value.email,
        password: this.registerForm.value.password,
        username: this.registerForm.value.username,
        birthDate: this.birthDate,
        gender: this.registerForm.value.gender
      }

      
      this.auth.register(newUser, fd).subscribe(res => {
        this.done = true;
      }, err => {
        if (err.error.message) {
          this.flashMessages.show(err.error.message, {cssClass: "alert-danger", timeout: 5000});
        } else {
          this.flashMessages.show("Unexpected error occured. Please try again later.", {cssClass: "alert-danger", timeout: 5000});
        }
      })
    } else {
      $('.ng-untouched').addClass('error');
      if (!this.avatar) {
        $('input[type=file]').parent().addClass('error');
      }
      if (!this.birthDate) {
        $('#birthDate').addClass('error');
      }
      if (!this.registerForm.value.gender) {
        $('#gender').addClass('error');
      }
    }
  }

}
