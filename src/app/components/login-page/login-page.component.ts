import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms"
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/user'

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  fg: FormGroup

  constructor(private route: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.fg = new FormGroup({
      name: new FormControl()
    });
  }

  onFormSubmit(): void {
    this.userService.getUserByName(this.fg.get('name').value).subscribe({
      next: (user: User) => {
        console.log("user", user);
        this.route.navigate(["cupcake-clicker"]);
      }
    });
  }
}
