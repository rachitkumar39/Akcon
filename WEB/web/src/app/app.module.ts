import { Component,  NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './modules';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { JwtHttpInterceptorService } from './services/jwt-http-interceptor.service';
import { HttpInterceptorService } from './services/http-interceptort.service';
import { HttpManageInterceptor } from './services/http-manage-interceptort.service';
import { NgxUiLoaderConfig, NgxUiLoaderHttpModule, NgxUiLoaderModule, NgxUiLoaderRouterModule, PB_DIRECTION, POSITION, SPINNER } from "ngx-ui-loader";
import { MatMenuModule } from '@angular/material/menu';
import { CustomDateFormatPipe } from './pipes/custom-date-format.pipe';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { environment } from 'src/environments/environment';

const config: SocketIoConfig = { url: environment.socketURL, options: {} };
const COMMON_COMPONENTS:Array<any>= [
  WelcomeComponent,
];

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  "bgsColor": "red",
  "bgsOpacity": 0.5,
  "bgsPosition": "bottom-right",
  "bgsSize": 60,
  "bgsType": "wandering-cubes",
  "blur": 5,
  "delay": 0,
  "fastFadeOut": true,
  "fgsColor": "#d5c64e",
  "fgsPosition": "center-center",
  "fgsSize": 60,
  "fgsType": "three-strings",
  "gap": 24,
  "logoPosition": "center-center",
  "logoSize": 100,
  "logoUrl": "../assets/images/akg-icon.svg",
  "masterLoaderId": "master",
  "overlayBorderRadius": "0",
  "overlayColor": "rgba(40, 40, 40, 0.8)",
  "pbColor": "#e2cf67",
  "pbDirection": "ltr",
  "pbThickness": 3,
  "hasProgressBar": true,
  "text": "",
  "textColor": "#FFFFFF",
  "textPosition": "center-center",
  "maxTime": -1,
  "minTime": 300
}

@NgModule({
  declarations: [
    AppComponent,
    ...COMMON_COMPONENTS,
    CustomDateFormatPipe,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MatIconModule,
    MatDialogModule,
    MatMenuModule,
    HttpClientModule,
    SharedModule,
    BrowserAnimationsModule,
    InfiniteScrollModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxUiLoaderRouterModule,
    FilterPipeModule,
    SocketIoModule.forRoot(config)
    //NgxUiLoaderHttpModule.forRoot({ showForeground: true }),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,useClass: JwtHttpInterceptorService,multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpManageInterceptor,  multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
