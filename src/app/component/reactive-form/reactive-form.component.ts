import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss'],
})
export class ReactiveFormComponent {
  myForm: FormGroup;
  taxDeduction: number;

  constructor(private formBuilder: FormBuilder) {
    this.taxDeduction = 0.0;
    this.myForm = this.formBuilder.group({
      taxBase: [, [Validators.required, Validators.min(0)]],
      individualPensionPlan: [, [Validators.required, Validators.max(1500), Validators.min(0)]],
      companyPensionPlan: [, [Validators.required, Validators.max(8500), Validators.min(0)]],
    });
  }

  calculateTaxDeduction() {
    let irpf;
    if (this.myForm.value.taxBase < 12450) {
      irpf = 0.19;
    } else if (this.myForm.value.taxBase < 20199) {
      irpf = 0.24;
    } else if (this.myForm.value.taxBase < 35199) {
      irpf = 0.3;
    } else if (this.myForm.value.taxBase < 59999) {
      irpf = 0.37;
    } else if (this.myForm.value.taxBase < 299999) {
      irpf = 0.45;
    } else {
      irpf = 0.47;
    }
    this.taxDeduction =
      (this.myForm.value.individualPensionPlan +
        this.myForm.value.companyPensionPlan) *
      irpf;
  }
}
