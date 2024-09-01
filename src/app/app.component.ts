import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PreLoaderComponent } from './components/pre-loader/pre-loader.component';
import { MenuComponent } from "./components/menu/menu.component";
import { AboutComponent } from "./components/about/about.component";
import { HomeComponent } from "./components/home/home.component";
import { PortfolioComponent } from "./components/portfolio/portfolio.component";
import { ContactComponent } from "./components/contact/contact.component";
import { BlogComponent } from "./components/blog/blog.component";
import { ContentfullService } from './services/contentfull/contentfull.service';
import { EmailService } from './services/notifications/email.service';
import { DateHelpers } from './interfaces/helpers/date-helpers';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, ReactiveFormsModule,
    PreLoaderComponent, MenuComponent,
    AboutComponent, HomeComponent, PortfolioComponent,
    ContactComponent, BlogComponent],
  providers: [ContentfullService, EmailService, DateHelpers],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'my-portfolio';

  constructor(private titleService: Title, private router: Router) { }


  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const title = this.getTitle(this.router.routerState, this.router.routerState.root).join(' - ');
        this.titleService.setTitle(title);
      }
    });
  }

  getTitle(state: any, parent: any): string[] {
    const data = [];
    if (parent && parent.snapshot.data && parent.snapshot.data['title']) {
      data.push(parent.snapshot.data['title']);
    }

    if (state && parent) {
      data.push(...this.getTitle(state, state.firstChild(parent)));
    }
    return data;
  }
}
