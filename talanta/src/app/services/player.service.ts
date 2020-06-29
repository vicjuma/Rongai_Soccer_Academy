import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Player } from '../models/Player';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  players$ = new BehaviorSubject<Player[]>([]);

  constructor(private http: HttpClient) {}

  getPlayers() {
    this.http.get('http://localhost:5000/api/players/').subscribe(
      (players: Player[]) => {
        this.players$.next(players);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getSinglePlayer(id: string) {
    return this.http.get('http://localhost:5000/api/players/' + id);
  }

  savePlayer(player: Player) {
    return this.http.post('http://localhost:5000/api/players/signup', player);
  }

  modifyPlayer(id: string, player: Player) {
    return this.http.put('http://localhost:5000/api/players/' + id, player);
  }

  deletePlayer(id: string) {
    return this.http.delete('http://localhost:5000/api/players/' + id);
  }
}
