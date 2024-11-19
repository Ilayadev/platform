import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd,RouterOutlet, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ProductComponent } from './components/product/product.component';
import { ContactComponent } from './components/contact/contact.component';
import { RouterLoaderComponent } from './components/router-loader/router-loader.component';
import { RouteLoaderService } from './services/route-loader.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HomeComponent,AboutComponent,ProductComponent,ContactComponent,RouterModule,RouterLoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'route-loader';
  
}
