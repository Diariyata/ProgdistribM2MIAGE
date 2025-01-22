import { Routes } from '@angular/router';
import { AuthRegisterComponent } from './auth/register/register.component';
import { AuthLoginComponent } from './auth/login/login.component';
import { HomeComponent } from './component/home/home.component';
import { AnnoncesComponent } from './component/annonces/annonces.component';
import { authGuard } from './guard/auth.guard';
import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { LocataireDashboardComponent } from './component/locataire-dashboard/locataire-dashboard.component';
import { adminGuard } from './guard/admin.guard';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { DescriptionComponent } from './component/description/description.component';

export const routes: Routes = [
    {
        path: '',
        component: AnnoncesComponent,
    },
    {
        path: 'auth/login',
        component: AuthLoginComponent
    },
    {
        path: 'auth/register',
        component: AuthRegisterComponent
    },
    {
        path: 'admin-dashboard',
        component: AdminDashboardComponent,
        canActivate: [adminGuard]
    },
    {
        path: 'locataire-dashboard',
        component: LocataireDashboardComponent,
        canActivate: [authGuard]
    },
    {
        path: 'annonces',
        component: AnnoncesComponent
    },
    {
        path: 'description/:id',
        component: DescriptionComponent
    },
    {
        path: '**', component: NotFoundComponent 
    }
];
