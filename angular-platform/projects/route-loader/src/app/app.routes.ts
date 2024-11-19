import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ProductComponent } from './components/product/product.component';
import { ContactComponent } from './components/contact/contact.component';
import { GoalComponent } from './components/goal/goal.component';
import { EmployeComponent } from './components/employe/employe.component';
import { Feature01Component } from './components/feature01/feature01.component';
import { Feature02Component } from './components/feature02/feature02.component';

export const routes: Routes = [
    {
        path:"home",
        component:HomeComponent
    },
    {
        path:"about",
        component:AboutComponent,
        children: [
            // { path: '', component: EmployeComponent },
            {
              path: 'employees',
              component:EmployeComponent ,              
            },
            {   path: 'goals', 
                component: GoalComponent,
                children:[        
                    // { path: '', component: Feature01Component },            
                    {
                        path:"Feature01",
                        component:Feature01Component
                    },
                    {
                        path:"Feature02",
                        component:Feature02Component
                    }
                ]
            },
            
          ],
    },
    {
        path:"products",
        component:ProductComponent
    },
    {
        path:"contact",
        component:ContactComponent
    }
];
