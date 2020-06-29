import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PlayerService } from '../services/player.service';
import { Player } from '../models/Player';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-player-form',
  templateUrl: './player-form.component.html',
  styleUrls: ['./player-form.component.scss']
})
export class PlayerFormComponent implements OnInit {
  id: string;
  mode: string;
  player: Player;
  PlayerForm: FormGroup;
  errorMessage: string;
  loading: boolean;

  constructor(private route: ActivatedRoute,
              private playerService: PlayerService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.loading = true;
    if (this.route.snapshot.url[0].path === 'new-player') {
      this.mode = 'new';
      this.PlayerForm = this.formBuilder.group({
        playerFirstName: [null, Validators.required],
        playerLastName: [null, Validators.required],
        parentFirstName: [null, Validators.required],
        parentLastName: [null, [Validators.required,]],
        parentPhone: [null, Validators.required],
        playerHeight: [null, Validators.required],
        playerWeight: [null, Validators.required],
        playerAge: [null, Validators.required],
        playerHealthStatus: [null, [Validators.required]],
        playerSchool: [null, Validators.required],
        playerResidence: [null, Validators.required],
        playerADM: [null, [Validators.required]]
      });
      this.loading = false;
    } else {
      this.loading = true;
      this.mode = 'modify';
      this.route.params.subscribe(
        (params) => {
          this.id = params.id;
          this.playerService.getSinglePlayer(this.id).subscribe(
            (player: Player) => {
              this.player = player;
              this.PlayerForm = this.formBuilder.group({
                playerFirstName: [player.playerFirstName, Validators.required],
                playerLastName: [player.playerLastName, Validators.required],
                parentFirstName: [player.parentFirstName, Validators.required],
                parentLastName: [player.parentLastName, Validators.required],
                parentPhone: [player.parentPhone, Validators.required],
                playerHeight: [player.playerHeight, Validators.required],
                playerWeight: [player.playerWeight, Validators.required],
                playerAge: [player.playerAge, Validators.required],
                playerHealthStatus: [player.playerHealthStatus, Validators.required],
                playerSchool: [player.playerSchool, Validators.required],
                playerResidence: [player.playerResidence, Validators.required],
                playerADM: [player.playerADM, Validators.required]
              });
              this.loading = false;
            }
          );
        }
      );
    }
  }

  onSubmit() {
    this.loading = true;
    this.errorMessage = null;
    const newPlayer = new Player();
    newPlayer.playerFirstName = this.PlayerForm.get('playerFirstName').value;
    newPlayer.playerLastName = this.PlayerForm.get('playerLastName').value;
    newPlayer.parentFirstName = this.PlayerForm.get('parentFirstName').value;
    newPlayer.parentLastName = this.PlayerForm.get('parentLastName').value;
    newPlayer.parentPhone = this.PlayerForm.get('parentPhone').value;
    newPlayer.playerHeight = this.PlayerForm.get('playerHeight').value;
    newPlayer.playerWeight = this.PlayerForm.get('playerWeight').value;
    newPlayer.playerAge = this.PlayerForm.get('playerAge').value;
    newPlayer.playerHealthStatus = this.PlayerForm.get('playerHealthStatus').value;
    newPlayer.playerSchool = this.PlayerForm.get('playerSchool').value;
    newPlayer.playerResidence = this.PlayerForm.get('playerResidence').value;
    newPlayer.playerADM = this.PlayerForm.get('playerADM').value;
    if (this.mode === 'new') {
      this.playerService.savePlayer(newPlayer).subscribe(
        () => {
          this.router.navigate(['/']);
        },
        (error) => {
          this.loading = false;
          this.errorMessage = error.message;
        }
      );
    } else if (this.mode === 'modify') {
      this.playerService.modifyPlayer(this.player._id, newPlayer).subscribe(
        () => {
          this.router.navigate(['/']);
        },
        (error) => {
          this.loading = false;
          this.errorMessage = error.message;
        }
      );
    }
  }

}
