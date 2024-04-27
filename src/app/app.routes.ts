import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';

export const routes: Routes = [
    { path: "", title: "FisioWave - Home", component: HomeComponent },
    { path: "register", title: "FisioWave - Cadastrar", component: RegisterComponent },
    { path: "dashboard", title: "FisioWave - Dashboard", component: UserDashboardComponent },
    { path: "**", redirectTo: "" },
];
