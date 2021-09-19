import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../core/services/hero.service';
import { Hero } from './../core/models/hero';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  isEdit = false;
  hero$!: Observable<Hero>;

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.hero$ = this.heroService.getHero(id)
  }

  goBack(): void {
    this.location.back();
  }

  save(name: string | undefined) {
    const key = this.route.snapshot.paramMap.get('id')!;
    this.heroService.update(key, { name } as Hero);
  }
}
