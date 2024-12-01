import { provideHttpClient, withFetch } from "@angular/common/http";
import { ApplicationConfig } from "@angular/core";

export class DattaConfig {
  static layout: string = 'vertical';
  static isCollapseMenu: Boolean = false;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch())
  ]
};