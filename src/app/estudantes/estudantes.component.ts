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
  estudante: Estudantes = {} as Estudantes;
  isEditing: boolean = false;

  constructor(private estudanteService: EstudanteService) {
    
  }

  onSaveEvent(estudante: Estudantes) {
    if (this.isEditing) {
      this.estudanteService.update(estudante).subscribe({
        next: () => {
          this.loadEstudantes();
          this.isEditing = false;
        }
      })
    }

    else {
      this.estudanteService.save(estudante).subscribe({
        next: data => {
          this.estudantes.push(data);
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
    this.estudante = estudante;
    this.isEditing = true;
  }

  delete(estudante: Estudantes) {
    this.estudanteService.delete(estudante).subscribe({
      next: () => this.loadEstudantes()
    });
  }

  exibirBtn: boolean = false;

  onExibirEvent(exibindo: boolean) {
    this.exibirBtn = exibindo;
  }
}
