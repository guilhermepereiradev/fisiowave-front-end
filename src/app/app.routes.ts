import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: "", title: "FisioWave - Home", component: HomeComponent },
    { path: "register", title: "FisioWave - Registrar paciente", component: RegisterComponent },
    { path: "**", redirectTo: "" },
];
