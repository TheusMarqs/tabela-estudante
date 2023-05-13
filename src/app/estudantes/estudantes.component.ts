import { Component, OnInit } from '@angular/core';
import { EstudanteService } from '../estudante.service';
import { Estudantes } from '../estudante';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-estudantes',
  templateUrl: './estudantes.component.html',
  styleUrls: ['./estudantes.component.css']
})
export class EstudantesComponent implements OnInit {
  estudantes: Estudantes[] = [];
  isEditing: boolean = false;
  formGroupEstudante: FormGroup;

  constructor(private estudanteService: EstudanteService, private formBuilder: FormBuilder) {
    this.formGroupEstudante = this.formBuilder.group({
      id: [''],
      name: [''],
      age: [''],
      email: [''],
      phone: ['']
    });
  }

  save() {
    if (this.isEditing) {
      this.estudanteService.update(this.formGroupEstudante.value).subscribe({
        next: () => {
          this.loadEstudantes();
          this.formGroupEstudante.reset();
          this.isEditing = false;
        }
      })
    }

    else {
      this.estudanteService.save(this.formGroupEstudante.value).subscribe({
        next: data => {
          this.estudantes.push(data);
          this.formGroupEstudante.reset();
        }
      })
    }
  }

  ngOnInit() : void {
    this.loadEstudantes();
  }

  loadEstudantes() {
    this.estudanteService.getEstudante().subscribe({
      next: data => this.estudantes = data
    });
  }
    
  edit(estudante: Estudantes) {
    this.formGroupEstudante.setValue(estudante);
    this.isEditing = true;
  }

  delete(estudante: Estudantes) {
    this.estudanteService.delete(estudante).subscribe({
      next: () => this.loadEstudantes()
    });
  }

  verificarBtn : boolean = false;

  exibir() {
    this.verificarBtn = true;
  }

}
