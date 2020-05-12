import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { LeaderboardService } from 'src/app/services/leaderboard.service';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.css']
})
export class LeaderboardComponent implements OnInit {

  userList: User[];

  constructor(private leaderboardService: LeaderboardService) { }

  ngOnInit(): void {
    this.leaderboardService.getLeaderboardList().subscribe({
      next: (users: User[]) => {
        this.userList = [...users];
        this.userList = this.userList.sort((a, b) => {
          if (a.clicks < b.clicks) {
            return 1;
          } else if (a.clicks > b.clicks) {
            return -1;
          } else {
            return 0;
          }
        });
      }
    });
  }

}
