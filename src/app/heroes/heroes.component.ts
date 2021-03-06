import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service'
import { MessageService } from '../message.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  selectedHero: Hero;
  
  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }

  add(name: String): void {
    name = name.trim();
    if(!name) return;
    this.heroService.addHero({name} as Hero).
        subscribe(hero => {
          this.heroes.push(hero);
        })
  }

  onSelect(hero: Hero): void {
    this.messageService.add(`Servis: dodal heroja id=${hero.id} name = ${hero.name}`)
    this.selectedHero = hero;
  }

  heroes : Hero[];

  getHeroes() : void {
    this.heroService.getHeroes()
        .subscribe(heroes => this.heroes = heroes);
  }

  constructor(private heroService : HeroService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getHeroes();
  }

}
