import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, RouterOutlet, ActivatedRoute, RoutesRecognized, RouteConfigLoadEnd, ActivatedRouteSnapshot } from '@angular/router';
import { RouteLoaderService } from '../../services/route-loader.service';
import { routes } from '../../app.routes';
import { Subject, Subscription } from 'rxjs';

@Component({
  selector: 'router-loader',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './router-loader.component.html',
  styleUrl: './router-loader.component.css',
  encapsulation:ViewEncapsulation.None
})
export class RouterLoaderComponent implements OnInit,OnDestroy {

  loading = false

  level !:number 

  observable!:Subscription

  constructor(
    private router: Router,
    private route : ActivatedRoute,
    private routerService : RouteLoaderService
  ){
    
  }  

  ngOnInit(): void {

    this.level = this.routerService.increaseCount()     
      
      this.observable = this.router.events.subscribe(event => {        

        if(event instanceof RoutesRecognized) {    
          
          let newRoute = this.getDeepestActivatedRoute(event.state.root)

          if(!this.routerService.currentRoute){
            this.routerService.currentRoute = 1            
          }else{
            this.routerService.currentRoute = newRoute
          }
          
          this.routerService.previousLoaderRoute = newRoute         
          
         
          if(this.level === this.routerService.currentRoute){
            this.loading = true
            this.routerService.loaderEnabled = true
          }      
        }
        else if(event instanceof NavigationEnd) {
          
          setTimeout(() => {
            this.loading = false
            this.routerService.loaderEnabled=false
          }, 500);
        }
  
      })

  }

  ngOnDestroy(): void {
      this.observable?.unsubscribe()
      this.routerService.decreaseCount(this.level)
  }

  getDeepestActivatedRoute(route: ActivatedRouteSnapshot): number {

    let deep = 0    
    while (route.firstChild) {
      deep++
      route = route.firstChild;
    }    
    return deep;
  }

}
