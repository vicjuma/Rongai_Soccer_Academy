import { Component, OnInit } from '@angular/core';
import { Player } from '../models/Player';
import { PlayerService } from '../services/player.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-single-player',
  templateUrl: './single-player.component.html',
  styleUrls: ['./single-player.component.scss']
})
export class SinglePlayerComponent implements OnInit {
  loading: boolean;
  player: Player;
  errorMessage: string;

  constructor(private playerService: PlayerService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.playerService.getSinglePlayer(params.id).subscribe(
          (player: Player) => {
            this.player = player;
            console.log(player._id)
          }
        );
      }
    );
  }


  onModify() {
    this.router.navigate(['/player', 'edit', this.player._id]);
  }

  onDelete() {
    this.loading = true;
    this.playerService.deletePlayer(this.player._id).subscribe(
      () => {
        this.loading = false;
        this.router.navigate(['/']);
      },
      (error) => {
        this.loading = false;
        this.errorMessage = error.message;
      }
    );
  }

}
