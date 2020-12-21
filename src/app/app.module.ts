import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from './login/login.guard';
import { UsersModule } from './users/users.module';
import {  NgbModal } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
 ],
  imports: [
  BrowserModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'Dashboard', component: UsersComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
      { path: '**', redirectTo: 'Dashboard', pathMatch: 'full' }
    ]),
    HttpClientModule,
    ReactiveFormsModule,
    UsersModule,
  ],
  providers: [NgbModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
