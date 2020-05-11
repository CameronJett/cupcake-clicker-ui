import { Component, OnInit } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-cupcake-clicker',
  templateUrl: './cupcake-clicker.component.html',
  styleUrls: ['./cupcake-clicker.component.css']
})
export class CupcakeClickerComponent implements OnInit {

  constructor(private dataService: UserDataService) { }

  user: User;

  ngOnInit(): void {
    this.user = this.dataService.getUser();
  }

  handleCupcakeClick(): void {
    this.incrementClickCounter();
  }

  incrementClickCounter(): void {
    this.user.clicks++;
  }
}
