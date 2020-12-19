import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from './login/login.guard';
import { AddUserComponent } from './users/add-user/add-user.component';
import { UsersModule } from './users/users.module';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
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
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: '**', redirectTo: 'login', pathMatch: 'full' }
    ]),
    HttpClientModule,
    ReactiveFormsModule,
    UsersModule
  ],
  providers: [NgbModal],
  bootstrap: [AppComponent]
})
export class AppModule { }
