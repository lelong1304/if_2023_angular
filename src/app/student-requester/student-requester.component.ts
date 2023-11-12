import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Student} from "../model/student";
import {StudentService} from "../service/student.service";
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-student-requester',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-requester.component.html',
  styleUrl: './student-requester.component.css'
})
export class StudentRequesterComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  submitted = false;

  studentToBeCreated: Student | any;
  constructor(private readonly httpClient: HttpClient,
              private readonly studentService:  StudentService,
              private router: Router) { }


  ngOnInit(): void {
    this.loadForm();
  }

  loadForm(): void {
    this.form = new FormGroup({
      id: new FormControl(null),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      age: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required)
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.submitted = true;
      this.studentToBeCreated = this.form.value;
      this.studentService.save(this.studentToBeCreated).subscribe(res => {
        this.router.navigate(['/students']);
      });

    }
  }
  get f() { return this.form.controls; }
  private goToListStudents() {
    this.router.navigate(['/students']);

  }


}
