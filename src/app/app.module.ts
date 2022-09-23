import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularMaterialModule } from './shared/angular-material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AppInitService } from './core/initialization/app-init.service';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AngularMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CoreModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  exports: [],
  providers: [
    AppInitService,
    {
      provide: APP_INITIALIZER,
      useFactory: (initService: AppInitService) => () => initService.init(),
      multi: true,
      deps: [AppInitService],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
