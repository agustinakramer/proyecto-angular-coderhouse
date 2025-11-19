import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// módulos de la app
import { SharedModule } from './shared/shared.module';
import { LayoutModule } from './featured/dashboard/layout/layout.module';
import { AuthModule } from './featured/auth/auth.module';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    LayoutModule,
    AuthModule,
    StoreModule.forRoot({}, {})
  ],
  providers: [
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
