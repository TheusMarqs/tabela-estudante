import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Students } from '../student';

@Component({
  selector: 'app-students-form',
  templateUrl: './students-form.component.html',
  styleUrls: ['./students-form.component.css']
})
export class StudentsFormComponent implements OnChanges {
  @Input()
  student: Students = {} as Students;

  @Output()
  saveEvent = new EventEmitter<Students>();

  @Output()
  showEvent = new EventEmitter<boolean>();

  @Output()
  cleanEvent = new EventEmitter<void>();

  formGroupStudent: FormGroup;
  submitted: boolean = false;

  constructor (private formBuilder: FormBuilder) {
    this.formGroupStudent = this.formBuilder.group({
      id: [''],
      name: ['', Validators.required],
      cpf: ['', Validators.required],
      semester: ['', Validators.required],
      class: ['', Validators.required]
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.student.id){
      this.formGroupStudent.setValue(this.student);
    }
  }

  save() {
    this.saveEvent.emit(this.formGroupStudent.value);
    this.formGroupStudent.reset();
  }

  txtBtn: string = 'Exibir';
  verifyBtn : boolean = false;

  show() {
    if (this.verifyBtn == false) {
      this.verifyBtn = true;
      this.txtBtn = 'Ocultar';
    }
    else {
      this.verifyBtn = false;
      this.txtBtn = 'Exibir';
    }

    this.showEvent.emit(this.verifyBtn);
  }

  clean() {
    this.cleanEvent.emit();
    this.formGroupStudent.reset();
    this.submitted = false;
  }


}
