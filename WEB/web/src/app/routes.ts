import { Routes } from "@angular/router";
import { AuthGuard } from "./guards/auth.guard";
import { NotFoundComponent,LoginComponent, MessageComponent } from "./modules/shared"; 
import { WelcomeComponent } from "./welcome/welcome.component";
import { SearchComponent } from "../app/modules/shared/components/search/search.component";
import { ProfileComponent } from "./modules/shared/components/profile/profile.component";

export const routes: Routes= [
   
    {
        path:"welcome",
        pathMatch:"full",
        component:WelcomeComponent,
    },
    {
        path:"login",
        pathMatch:"full",
        component:LoginComponent,
    },
    {
        path:"profile/:id",
        pathMatch:"full",
        canActivate:[AuthGuard],
        component:ProfileComponent,
    },
    {
        path:"search/:id",
        canActivate:[AuthGuard],
        component: SearchComponent   
    },
    {
        path:"message",
        //canActivate:[AuthGuard],
        component: MessageComponent   
    },
    {
        path:"",
        canActivate:[AuthGuard],
        children:[
            {
               path:"",
               loadChildren: () => import('./modules').then(m => m.DashboardModule)
            }
        ]
    },
    {
        path:"**",
        pathMatch:"full",
        component:NotFoundComponent
    },
]