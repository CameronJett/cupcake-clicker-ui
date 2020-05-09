import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from "@angular/forms"
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  fg: FormGroup

  constructor(private route: Router) { }

  ngOnInit(): void {
    this.fg = new FormGroup({
      name: new FormControl()
    });
  }

  onFormSubmit(): void {
    this.route.navigate(["cupcake-clicker"]);
  }
}
