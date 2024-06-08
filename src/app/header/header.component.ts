import { Component, OnInit } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { Router, RouterModule } from '@angular/router'
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MatToolbar, MatButtonModule, RouterModule, MatIconModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  constructor(
    private router: Router
  )
  {}

  mostrarVoltarInicio: boolean = false;
  
  ngOnInit(): void {
    this.router.events.subscribe({
      next: () => {
        this.mostrarVoltarInicio = this.router.url !== "/";
      }
    });
  }

  logout() {
    if (localStorage.getItem('loginToken')) localStorage.removeItem('loginToken');
    this.router.navigate(['/']);
  }

  hasLoginToken(): boolean {
    return localStorage.getItem('loginToken') !== null;
  }
}
