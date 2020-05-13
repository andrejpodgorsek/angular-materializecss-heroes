import { Injectable } from '@angular/core';
import { HEROES } from './mock-heroes'
import { Hero } from './hero'
import { Observable, of } from 'rxjs'
import { MessageService } from './message.service' 

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  getHero(id: number): Observable<Hero> {
    this.messageService.add(`poiskal heroja z od = ${id}`);
    return of(HEROES.find(hero => hero.id === id));
  }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('dobil moje heroje!!!');
    return of(HEROES);
  }

  constructor( private messageService : MessageService) { }
}
