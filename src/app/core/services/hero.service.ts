import { Injectable } from '@angular/core';
import { Hero } from '../models/hero';
import { MessagesService } from './messages.service';
import { FireBaseService } from './angularFire.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class HeroService {
  private heroesUrl = '/heroes';

  constructor(
    private messageService: MessagesService,
    private fireBaseService: FireBaseService
  ) {}

  getHeroes(): Observable<Hero[]> {
    this.log('Heroes is fetched');
    return this.fireBaseService.getList(this.heroesUrl);
  }

  getHero(id: string): Observable<Hero> {
    return this.fireBaseService
      .getObject(`${this.heroesUrl}/${id}`)
      .pipe(tap((hero) => this.log(`fetched hero name=${hero.name}`)));
  }

  addHero(hero: Hero): void {
    return this.fireBaseService.add(this.heroesUrl, hero);
  }

  delete(key: string): Promise<void> {
    return this.fireBaseService.delete(this.heroesUrl, key);
  }

  update(key: string, data: any): Promise<void> {
    return this.fireBaseService.update(this.heroesUrl, key, data);
  }

  private log(message: string): void {
    this.messageService.addMessage(`HeroService: ${message}`);
  }
}
