import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar'
import { MatButton } from '@angular/material/button'
import { RouterModule } from '@angular/router'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbar, MatButton, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

}
