import {
  ApplicationConfig,
  Injectable,
  InjectionToken,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

export class Utils {
  getFullname(firstname: string, lastname: string): string {
    return `${firstname} ${lastname}`;
  }
}

export class Log {
  log(message: string) {
    console.log(message);
  }
}

@Injectable()
export class Utils02 {
  constructor(private readonly logger: Log) {
    this.logger = logger;
  }

  execute() {
    this.logger.log('Executing...');
  }
}

export class Auxiliar01 {}

export const token = new InjectionToken('mi primer token');

export class EnvironmentVariables {
  private dev = {
    apiEndpoint: 'http://localhost:3000',
    logLevel: 'debug',
  };

  private prod = {
    apiEndpoint: 'http://miapi.com',
    logLevel: 'info',
  };

  getEnvironmentVariables(env: 'dev' | 'prod') {
    return env === 'dev' ? this.dev : this.prod;
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    {
      provide: 'apiEndpoint',
      useValue: 'http://localhost:3000',
    },
    {
      provide: 'layout',
      useValue: { menu: true, header: true },
    },
    {
      provide: 'utils',
      useClass: Utils,
    },
    {
      provide: Auxiliar01,
      useClass: Utils,
    },
    Utils,
    {
      provide: token,
      useValue: 'mi primer token',
    },
    Log,

    { provide: Utils02, useClass: Utils02 },

    {
      provide: EnvironmentVariables,
      useClass: EnvironmentVariables,
    },
    {
      provide: 'environment',
      useValue: 'prod',
    },
    {
      provide: 'appConfig',
      useFactory: (env: 'dev' | 'prod', environment: EnvironmentVariables) => {
        return environment.getEnvironmentVariables(env);
      },
      deps: ['environment', EnvironmentVariables],
    },

    /*     {
      provide: Utils,
      useClass: Utils,
    }, */
  ],
};
