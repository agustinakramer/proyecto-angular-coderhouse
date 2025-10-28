import { Validators } from "@angular/forms";

export const formGroup = {
    id: [''],
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    beginDate: ['', [Validators.required]],
    endDate: ['', [Validators.required]],
    status: ['Scheduled', [Validators.required]],
};