import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar'
import { MatButton } from '@angular/material/button'
import { RouterModule } from '@angular/router'
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbar, MatButton, RouterModule, MatIconModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
