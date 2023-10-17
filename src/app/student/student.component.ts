import { StudentService } from '../student.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Student } from '../students';


@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  @Output()
  deleteEvent = new EventEmitter<boolean>();

  students: Student[] = [];
  student: Student = {} as Student;
  isEditing: boolean = false;
  isSubmitted: boolean = false;
  isDeleting: boolean = false;

  constructor(private StudentService: StudentService) {
  }

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents() {
    this.StudentService.getStudents().subscribe({
      next: data => this.students = data
    });
  }

  onCleanEvent() {
    this.student = {} as Student;
    this.isSubmitted = false;
    this.isEditing = false;
  }

  onSaveEvent(student: Student) {
    if (this.isEditing) {
      this.StudentService.update(student).subscribe(
        {
          next: () => {
            this.loadStudents();
            this.isEditing = false;
            this.isSubmitted = true;
          }
        }
      );
    } else {
      this.StudentService.save(student).subscribe(
        {
          next: data => {
            this.students.push(data);
            this.isSubmitted = false;
          }
        }
      );
    }
  }

  edit(student: Student) {
    this.student = student;
    this.isEditing = true;
  }

  delete(student: Student) {
    this.StudentService.delete(student).subscribe(
      {
        next: () => this.loadStudents()
      }
    );
    this.deleteEvent.emit(false);
    this.isEditing = false;
  }

}