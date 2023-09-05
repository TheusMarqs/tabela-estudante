import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Estudantes } from '../estudante';

@Component({
  selector: 'app-estudantes-form',
  templateUrl: './estudantes-form.component.html',
  styleUrls: ['./estudantes-form.component.css']
})
export class EstudantesFormComponent implements OnChanges {
  @Input()
  estudante: Estudantes = {} as Estudantes;

  @Output()
  saveEvent = new EventEmitter<Estudantes>();

  @Output()
  exibirEvent = new EventEmitter<boolean>();

  formGroupEstudante: FormGroup;

  constructor (private formBuilder: FormBuilder) {
    this.formGroupEstudante = this.formBuilder.group({
      id: [''],
      name: [''],
      cpf: [''],
      semestre: [''],
      turma: ['']
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.formGroupEstudante.setValue(this.estudante);
  }

  save() {
    this.saveEvent.emit(this.formGroupEstudante.value);
    this.formGroupEstudante.reset();
  }

  txtBtn: string = 'Exibir';
  verificarBtn : boolean = false;

  exibir() {
    if (this.verificarBtn == false) {
      this.verificarBtn = true;
      this.txtBtn = 'Ocultar';
    }
    else {
      this.verificarBtn = false;
      this.txtBtn = 'Exibir';
    }

    this.exibirEvent.emit(this.verificarBtn);
  }

  clean() {
    this.formGroupEstudante.reset();
  }
}
