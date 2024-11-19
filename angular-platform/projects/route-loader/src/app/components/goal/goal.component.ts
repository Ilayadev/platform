import { Component } from '@angular/core';
import { RouterLoaderComponent } from '../router-loader/router-loader.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-goal',
  standalone: true,
  imports: [RouterLoaderComponent,RouterModule],
  templateUrl: './goal.component.html',
  styleUrl: './goal.component.css'
})
export class GoalComponent {

}
