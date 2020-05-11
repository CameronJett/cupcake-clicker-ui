import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, AbstractControl } from "@angular/forms"
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user'
import { of } from 'rxjs';
import { UserDataService } from 'src/app/services/user-data.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  fg: FormGroup
  buttonClicked: string;

  constructor(private route: Router, private userService: UserService, private dataService: UserDataService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.fg = this.fb.group({
      name: ['', [Validators.required],
        this.checkValidName]
    });
  }

  onFormSubmit(): void {
    if (this.buttonClicked === 'login') {
      this.userService.getUserByName(this.fg.get('name').value).subscribe({
        next: (user: User) => {
          this.dataService.setUser(user);
          this.route.navigate(["cupcake-clicker"]);
        }
      });
    } else if (this.buttonClicked === 'create') {
      this.userService.createNewUser(this.fg.get('name').value).subscribe({
        next: (user: User) => {
          this.dataService.setUser(user);
          this.route.navigate(["cupcake-clicker"]);
        }
      });
    }
  }

  checkValidName(control: AbstractControl) {
    return of(control.value > 0);
  }
}
