import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Theme } from '@bwc/common';

@Component({
  imports: [CommonModule],
  selector: 'bwc-alert',
  standalone: true,
  styles: `
    .bwc-alert {
      border: 1px solid;
      border-radius: 5px;
      padding: 1rem 1rem 1rem 3rem;
      position: relative;

      &.bwc-alert-dark {
        &.bwc-alert-error {
          background-color: #2c0b0e;
          border-color: #842029;
          color: #ea868f;
          svg { fill: #ea868f; }
        }

        &.bwc-alert-success {
          background-color: #051b11;
          border-color: #0f5132;
          color: #75b798;
          svg { fill: #75b798; }
        }
      }

      &.bwc-alert-light {
        &.bwc-alert-error {
          background-color: #f8d7da;
          border-color: #f1aeb5;
          color: #58151c;
          svg { fill: #58151c; }
        }

        &.bwc-alert-success {
          background-color: #d1e7dd;
          border-color: #a3cfbb;
          color: #0a3622;
          svg { fill: #0a3622; }
        }
      }

      svg {
        height: 1.2rem;
        left: 1rem;
        position: absolute;
        top: 0.9rem;
        width: 1.2rem;
      }
    }
  `,
  template: `
    <div
      class="bwc-alert"
      [class.bwc-alert-dark]="theme === 'dark'"
      [class.bwc-alert-light]="theme === 'light'"
      [class.bwc-alert-error]="type === 'error'"
      [class.bwc-alert-success]="type === 'success'"
      role="alert"
    >
      <!-- prettier-ignore -->
      <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <path *ngIf="type === 'error'" d="M449.07 399.08L278.64 82.58c-12.08-22.44-44.26-22.44-56.35 0L51.87 399.08A32 32 0 0 0 80 446.25h340.89a32 32 0 0 0 28.18-47.17m-198.6-1.83a20 20 0 1 1 20-20a20 20 0 0 1-20 20m21.72-201.15l-5.74 122a16 16 0 0 1-32 0l-5.74-121.95a21.73 21.73 0 0 1 21.5-22.69h.21a21.74 21.74 0 0 1 21.73 22.7Z" />
        <path *ngIf="type === 'success'" d="M256 48C141.31 48 48 141.31 48 256s93.31 208 208 208s208-93.31 208-208S370.69 48 256 48m108.25 138.29l-134.4 160a16 16 0 0 1-12 5.71h-.27a16 16 0 0 1-11.89-5.3l-57.6-64a16 16 0 1 1 23.78-21.4l45.29 50.32l122.59-145.91a16 16 0 0 1 24.5 20.58" />
      </svg>
      <ng-content></ng-content>
    </div>
  `,
})
export class AlertComponent {
  @Input() public theme: Theme = 'dark';
  @Input() public type: 'error' | 'success' = 'error';
}
