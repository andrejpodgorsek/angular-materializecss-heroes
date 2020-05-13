import { Injectable } from '@angular/core';
import { HEROES } from './mock-heroes'
import { Hero } from './hero'
import { Observable, of } from 'rxjs'
import { MessageService } from './message.service' 
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  private heroesUrl = 'api/heroes';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})  
  }

  deleteHero(hero: Hero): Observable<any> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url =  `${this.heroesUrl}/${id}`;

    return this.http.delete(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted hero id=${hero.id}`)),
      catchError(this.handleError<any>(`deletehero`))
    )
  }

  updateHero(hero: Hero): Observable<any> {
    return this.http.put(this.heroesUrl,hero,this.httpOptions).pipe(
      tap(_ => this.log(`updatal hero id=${hero.id}`)),
      catchError(this.handleError<any>(`updatehero`))

    )
  }  

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl,hero,this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`dodal hero z name = ${newHero.name} in id=${newHero.id}`)),
      catchError(this.handleError<Hero>(`addhero`))

    )
  }  
  
  getHero(id: number): Observable<Hero> {
    const url =  `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`fetched najdu hero id=${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    )

  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
            .pipe(
              catchError(this.handleError<Hero[]>('getHeroes',[]))
            );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }

  constructor( 
    private messageService : MessageService,
    private http: HttpClient  
  ) { }

  private log(message: string) {
    this.messageService.add(`Heroservice: ${message}`)
  }
}
