import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cupcake-clicker',
  templateUrl: './cupcake-clicker.component.html',
  styleUrls: ['./cupcake-clicker.component.css']
})
export class CupcakeClickerComponent implements OnInit {

  constructor(private route: Router, private userService: UserService, private dataService: UserDataService) { }

  user: User;
  saved: boolean = false;

  ngOnInit(): void {
    this.user = this.dataService.getUser();
  }

  handleCupcakeClick(): void {
    this.incrementClickCounter();
  }

  handleSaveClick(): void {
    this.userService.saveData(this.user).subscribe({
      next: (user: User) => {
        this.dataService.setUser(user);
        this.saved = true;
      }
    });
  }

  handleDeleteClick(): void {
    this.userService.deleteUser(this.user.name).subscribe({
      next: (response: User) => {
        this.dataService.setDeletedFlag(true);
        this.route.navigate([""]);
      }
    });
  }

  incrementClickCounter(): void {
    this.user.clicks++;
  }
}
