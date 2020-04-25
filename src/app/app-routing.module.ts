import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './_components/login/login.component';
import { AuthguardService } from './_helpers/authguard.service';
import { DashboardComponent } from './_components/dashboard/dashboard.component';
import { UsersComponent } from './_components/users/users.component';
import { VideosComponent } from './_components/videos/videos.component';
import { TestsComponent } from './_components/tests/tests.component';
import { TasksComponent } from './_components/tasks/tasks.component';

const routes: Routes = [
  { path: '', component: DashboardComponent , canActivate: [] },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [] },
  { path: 'users', component: UsersComponent, canActivate: [] },
  { path: 'videos', component: VideosComponent, canActivate: [] },
  { path: 'tests', component: TestsComponent, canActivate: [] },
  { path: 'tasks', component: TasksComponent, canActivate: [] },


  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
