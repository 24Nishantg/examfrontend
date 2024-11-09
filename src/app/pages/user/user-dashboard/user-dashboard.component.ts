import { Component, OnInit } from '@angular/core';


import { QuizService } from 'src/app/services/quiz.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  // constructor() { }

  // ngOnInit(): void {
  // }


  quizzes = [];
  userClass: string;

  constructor(private quizService: QuizService, private userService: UserService) {}

  ngOnInit(): void {
    // Fetch the user's class
    this.userService.getUserDetails().subscribe(
      (data: any) => {
        this.userClass = data.userClass; // Assume userClass is part of the user data

        // Fetch quizzes for the user's class
        this.loadClassQuizzes();
      },
      (error) => {
        console.error('Error fetching user details', error);
      }
    );
  }

  loadClassQuizzes() {
    this.quizService.getQuizzesByClass(this.userClass).subscribe(
      (data: any) => {
        this.quizzes = data;
        console.log(`Loaded quizzes for ${this.userClass}: `, this.quizzes);
      },
      (error) => {
        console.error('Error loading quizzes for class', error);
      }
    );
  }

}
