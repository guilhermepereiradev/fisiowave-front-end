import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: "", title: "FisioWave - Home", component: HomeComponent },
    { path: "register", title: "FisioWave - Cadastrar", component: RegisterComponent },
    { path: "**", redirectTo: "" },
];
