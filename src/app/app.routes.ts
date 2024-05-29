import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { LoginComponent } from './login/login.component';
import { PhysioDashboardComponent } from './physio-dashboard/physio-dashboard.component';

export const routes: Routes = [
    { path: "", title: "FisioWave - Home", component: HomeComponent },
    { path: "register", title: "FisioWave - Cadastrar", component: RegisterComponent },
    { path: "dashboard/:id", title: "FisioWave - Dashboard", component: UserDashboardComponent },
    { path: "physio/dashboard/:id", title: "FisioWave - Dashboard", component: PhysioDashboardComponent },
    { path: "login", title: "FisioWave - Login", component: LoginComponent },
    { path: "**", redirectTo: "" },
];
