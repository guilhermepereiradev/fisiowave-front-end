import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MatCard, MatCardContent, MatCardSubtitle, MatCardTitle, MatCardHeader } from '@angular/material/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, MatCard, MatCardContent, MatCardSubtitle, MatCardTitle, MatCardHeader],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
