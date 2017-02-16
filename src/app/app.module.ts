import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Page1 } from '../pages/page1/page1';
import { Page2 } from '../pages/page2/page2';
import { SearchPage } from '../pages/search/search';
import { JsonpModule } from '@angular/http';
import { PreviewModal } from '../pages/search/preview';

@NgModule({
  declarations: [
    MyApp,
    Page1,
    Page2,
		SearchPage,
		PreviewModal
  ],
  imports: [
    IonicModule.forRoot(MyApp),
		JsonpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Page1,
    Page2,
		SearchPage,
		PreviewModal
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
