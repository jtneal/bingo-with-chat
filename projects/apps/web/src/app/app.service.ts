import { Injectable } from '@angular/core';
import { Theme } from '@bwc/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppService {
  public readonly themeDefault = 'dark' as Theme;
  public readonly themeChangedEvent = new BehaviorSubject<Theme>(this.themeDefault);
  public readonly themeChangedEvent$ = this.themeChangedEvent.asObservable();
}
