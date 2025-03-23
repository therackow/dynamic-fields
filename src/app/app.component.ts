import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OnInit } from '@angular/core';
import { dynamicFields } from './fields';
import { CommonModule, JsonPipe } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  UntypedFormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, JsonPipe, ReactiveFormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'dynamic-fields';

  fields: any = dynamicFields.fields;
  formGroup: UntypedFormGroup = new UntypedFormGroup({});

  constructor() {}

  ngOnInit() {
    console.log('Dynamic Fields:', this.fields);
    this.formGroup = new UntypedFormGroup({});
    this.fields.forEach((field: any) => {
      const control = new FormControl('', this.getValidators(field));
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
    }
    return validators;
  }
}
