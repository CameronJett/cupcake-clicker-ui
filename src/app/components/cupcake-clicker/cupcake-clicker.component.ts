import { Component, OnInit, Renderer2, ChangeDetectorRef } from '@angular/core';
import { UserDataService } from 'src/app/services/user-data.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

export class Vector2 {
  id: number;
  x: number;
  y: number;
}

@Component({
  selector: 'app-cupcake-clicker',
  templateUrl: './cupcake-clicker.component.html',
  styleUrls: ['./cupcake-clicker.component.css']
})
export class CupcakeClickerComponent implements OnInit {

  constructor(
    private route: Router, 
    private userService: UserService, 
    private dataService: UserDataService,
    private renderer: Renderer2,
    private cd: ChangeDetectorRef
    ) { }

  user: User;
  saved: boolean = false;
  animatedPlusOneList: Vector2[] = [];

  ngOnInit(): void {
    this.user = this.dataService.getUser();
  }

  handleCupcakeClick(e: MouseEvent): void {
    this.incrementClickCounter();

    let clickLocation: Vector2 = { id: this.user.clicks, x: e.x, y: e.y };
    this.createPlusOneAnimation(clickLocation);
  }

  createPlusOneAnimation(location: Vector2) {
    this.animatedPlusOneList.push(location);
    this.cd.detectChanges();
    
    this.renderer.setStyle(document.querySelector(`.item-${location.id}`), "position", "absolute");
    this.renderer.setStyle(document.querySelector(`.item-${location.id}`), "left", `${location.x}px`);
    this.renderer.setStyle(document.querySelector(`.item-${location.id}`), "top", `${location.y}px`);

    setTimeout(() => {
      this.animatedPlusOneList.shift();
    }, 2000);
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

  handleLeaderboardClick(): void {
    this.route.navigate(["/leaderboard"]);
  }

  incrementClickCounter(): void {
    this.user.clicks++;
  }
}
