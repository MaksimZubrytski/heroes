import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Hero } from '../core/models/hero';
import { HeroService } from '../core/services/hero.service';
import { map } from 'rxjs/operators';
import { interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  heroes?: Hero[];
  heroesSub?: Subscription;

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroesSub = this.heroService
      .getHeroes()
      .subscribe((heroes) => (this.heroes = heroes.slice(1, 5)));
  }

  ngOnDestroy() {
    this.heroesSub?.unsubscribe();
  }
}
