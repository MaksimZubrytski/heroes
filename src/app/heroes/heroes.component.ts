import { Component, OnInit } from '@angular/core';
import { Hero } from '../core/models/hero';
import { HeroService } from '../core/services/hero.service';
import { map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class HeroesComponent implements OnInit {
  heroes$?: Observable<Hero[]>;
  currentHero?: Hero;
  countId = 1;
  isEdit = false;

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.heroes$ = this.getHeroes();
  }

  getHeroes(): Observable<any> {
    return this.heroService.getHeroes();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({ name } as Hero);
  }

  delete(key: string): void {
    this.heroService.delete(key);
  }
}
