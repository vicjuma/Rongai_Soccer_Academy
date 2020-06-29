import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayerListComponent } from './player-list/player-list.component';
import { SinglePlayerComponent } from './single-player/single-player.component';
import { PlayerFormComponent } from './player-form/player-form.component';

const appRoutes: Routes = [
  { path: 'player/:id', component: SinglePlayerComponent },
  { path: 'new-player', component: PlayerFormComponent },
  { path: 'player/edit/:id', component: PlayerFormComponent },
  { path: '', component: PlayerListComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
