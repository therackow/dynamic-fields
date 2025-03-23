import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormControl,
  UntypedFormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import {
  FontAwesomeModule,
  IconDefinition,
} from '@fortawesome/angular-fontawesome';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';

import { dynamicFields } from './fields';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    NgbDatepickerModule,
    FontAwesomeModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'dynamic-fields';

  fields: any = dynamicFields.fields;
  formGroup: UntypedFormGroup = new UntypedFormGroup({});
  calendarIcon: IconDefinition = faCalendar;

  constructor() {}

  ngOnInit() {
    console.log('Dynamic Fields:', this.fields);
    this.formGroup = new UntypedFormGroup({});
    this.fields.forEach((field: any) => {
      const control = new FormControl(
        field.default ? field.default : '',
        this.getValidators(field),
      );
      this.formGroup.addControl(field.formControlName, control);
    });
    this.formGroup.updateValueAndValidity();
    console.log('Form Group:', this.formGroup);
    this.formGroup.valueChanges.subscribe((value) => {
      console.log('Form Value:', value);
    });
  }

  getValidators(field: any): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
    if (field.validation) {
      if (field.validation.required) {
        validators.push(Validators.required);
      }
      if (field.validation.minLength) {
        validators.push(Validators.minLength(field.validation.minLength));
      }
      if (field.validation.maxLength) {
        validators.push(Validators.maxLength(field.validation.maxLength));
      }
      if (field.validation.email) {
        validators.push(Validators.email);
      }
      if (field.validation.pattern) {
        validators.push(Validators.pattern(field.validation.pattern));
      }
    }
    return validators;
  }
}
