import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormControl,
  UntypedFormGroup,
  ValidatorFn,
  Validators,
  FormArray,
  FormGroup,
  AbstractControl,
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
    this.formGroup = new UntypedFormGroup({});
    this.fields.forEach((field: any) => {
      const control = new FormControl(
        {
          value: this.getInitialValue(field),
          disabled: this.checkInitialDisabled(field),
        },
        this.getValidators(field),
      );
      this.formGroup.addControl(field.formControlName, control);

      this.addPropsSubscribes(field, control);
    });
    this.formGroup.valueChanges.subscribe((value) => {
      console.log('Form Value:', value);
    });
  }

  ngAfterViewInit() {
    this.updateTreeValidity(this.formGroup);
  }

  getInitialValue(field: any): any {
    return field.default !== null && typeof field.default !== 'undefined'
      ? field.default
      : '';
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

  checkInitialDisabled(field: any): boolean {
    if (field.props) {
      const disabledPropIndex = field.props.findIndex(
        (prop: any) => prop.name === 'disabled',
      );
      if (disabledPropIndex !== -1) {
        const disabledProp = field.props[disabledPropIndex];
        const conditionalValue =
          this.formGroup.controls[disabledProp['condition']['field']].value ===
          disabledProp['condition']['value'];

        if (conditionalValue) {
          return true;
        } else {
          return false;
        }
      }
    }

    return false;
  }

  addPropsSubscribes(field: any, control: FormControl) {
    if (field.props) {
      field.props.forEach((prop: any) => {
        if (prop.name === 'disabled') {
          this.formGroup.controls[
            prop['condition']['field']
          ].valueChanges.subscribe((value: any) => {
            if (value === prop['condition']['value']) {
              control.disable();
            } else {
              control.enable();
            }
          });
        }

        if (prop.name === 'hidden') {
          this.formGroup.controls[
            prop['condition']['field']
          ].valueChanges.subscribe((value: any) => {
            const element = document.querySelector(
              `#${field.formControlName}_group`,
            );
            if (value === prop['condition']['value']) {
              element?.removeAttribute('hidden');
            } else {
              element?.setAttribute('hidden', 'true');
            }
          });
        }
      });
    }
  }

  updateTreeValidity(group: FormGroup | FormArray): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = (
        group.controls as { [key: string]: AbstractControl<any, any> }
      )[key];

      if (
        abstractControl instanceof FormGroup ||
        abstractControl instanceof FormArray
      ) {
        this.updateTreeValidity(abstractControl);
      } else {
        abstractControl.updateValueAndValidity();
      }
    });
  }
}
