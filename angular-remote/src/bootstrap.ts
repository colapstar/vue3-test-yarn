import { AppComponent } from './app/app.component';
import { AppModule } from './app/app.module';
import { createCustomElement } from '@angular/elements';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(moduleRef => {
    const injector = moduleRef.injector;
    const el = createCustomElement(AppComponent, { injector });
    customElements.define('angular-element', el);
  })
  .catch(err => console.error(err));
