import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderModule } from './components/layout/header/header.module';
import { ApiKeyInterceptor } from './providers/interceptors/apikey.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HeaderModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ApiKeyInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
