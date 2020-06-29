import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/player.service';
import { Subscription } from 'rxjs';
import { Player } from '../models/Player';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss']
})
export class PlayerListComponent implements OnInit {
  players: Player[];
  players$: Subscription;
  loading: boolean;

  constructor(private player: PlayerService,
              private router: Router) { }

  ngOnInit() {
    this.loading = true;
    this.players$ = this.player.players$.subscribe(
      (players) => {
        this.players = players;
        this.loading = false;
      }
    );
    this.player.getPlayers();
  }

  onOpenPlayer(id: string) {
    this.router.navigate(['player', id]);
  }

}
