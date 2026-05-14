import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { PreLoaderComponent } from './components/pre-loader/pre-loader.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { ContactComponent } from './components/contact/contact.component';
import { BlogComponent } from './components/blog/blog.component';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    PreLoaderComponent, MenuComponent,
    HomeComponent, AboutComponent,
    PortfolioComponent, ContactComponent, BlogComponent
  ],
  templateUrl: './landing.component.html'
})
export class LandingComponent implements OnInit {
  constructor(private titleService: Title) {}

  ngOnInit(): void {
    this.titleService.setTitle('John Tuza — Portfolio');
    this.applyTheme();
  }

  private applyTheme(): void {
    const themeLink = document.getElementById('theme-stylesheet') as HTMLLinkElement | null;
    if (!themeLink) return;
    const set = (dark: boolean) => { themeLink.href = dark ? 'assets/dark-theme.css' : 'assets/light-theme.css'; };
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    set(mq.matches);
    mq.addEventListener('change', e => set(e.matches));
  }
}
