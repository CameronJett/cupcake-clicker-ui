import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cupcake-clicker',
  templateUrl: './cupcake-clicker.component.html',
  styleUrls: ['./cupcake-clicker.component.css']
})
export class CupcakeClickerComponent implements OnInit {

  constructor() { }

  clickCount = 0;

  ngOnInit(): void {
  }

  handleCupcakeClick(): void {
    this.incrementClickCounter();
  }

  incrementClickCounter(): void {
    this.clickCount++;
  }
}
