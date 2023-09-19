import { Component, OnInit } from '@angular/core';
import { StudentService } from '../student.service';
import { Students } from '../student';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students: Students[] = [];
  student: Students = {} as Students;
  isEditing: boolean = false;
  submitted: boolean = false;

  constructor(private studentService: StudentService) {

  }

  onSaveEvent(student: Students) {
    if (this.isEditing) {
      this.studentService.update(student).subscribe({
        next: () => {
          this.loadStudents();
          this.isEditing = false;
        }
      })
    }

    else {
      this.studentService.save(student).subscribe({
        next: data => {
          this.students.push(data);
        }
      })
    }
  }

  ngOnInit() : void {
    this.loadStudents();
  }

  loadStudents() {
    this.studentService.getStudent().subscribe({
      next: data => this.students = data
    });
  }

  edit(student: Students) {
    this.student = student;
    this.isEditing = true;
  }

  delete(student: Students) {
    this.studentService.delete(student).subscribe({
      next: () => this.loadStudents()
    });
  }

  showBtn: boolean = false;

  onShowEvent(showing: boolean) {
    this.showBtn = showing;
  }

  onCleanEvent() {
    this.student = {} as Students;
    this.isEditing = false;
    this.submitted = false;
  }
}
