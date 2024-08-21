import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, data: { title: 'Home Page' } },
    { path: '#about', component: AboutComponent, data: { title: 'About Us' } },
];
