import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  imports: [CommonModule],
  selector: 'bwc-button',
  standalone: true,
  styles: `
    .bwc-button {
      background-color: #00a4d0;
      border: 0.15rem solid #00a4d0;
      border-radius: 0.5rem;
      color: #fff;
      cursor: pointer;
      font-size: 1rem;
      line-height: 1.5;
      padding: 0.375rem 0.75rem;
      position: relative;
      text-shadow: 1px 1px 3px #000;

      &:disabled {
        background-color: #615951;
        border-color: #615951;
        pointer-events: none;
      }

      &:hover {
        background-color: #0093bb;
        border-color: #0093bb;
      }

      &:active {
        background-color: #0083a6;
        border-color: #0083a6;
        text-shadow: -1px -1px 3px #000;
      }

      &.bwc-button-icon {
        padding-left: 1.95rem;
      }

      &.bwc-button-secondary {
        background-color: transparent;
        color: #00a4d0;
        text-shadow: none;

        &:disabled {
          color: #615951;
        }

        &:hover {
          background-color: #0093bb;
          color: #fff;
          text-shadow: 1px 1px 3px #000;
        }

        &:active {
          background-color: #0083a6;
          text-shadow: -1px -1px 3px #000;
        }
      }

      svg {
        height: 1.2rem;
        left: 0.375rem;
        position: absolute;
        top: 0.5rem;
        width: 1.2rem;
      }

      &:hover svg {
        filter: drop-shadow(1px 1px 2px #000);
      }

      &:active svg {
        filter: drop-shadow(-1px -1px 2px #000);
      }
    }
  `,
  template: `
    <button
      class="bwc-button"
      [class.bwc-button-secondary]="type === 'secondary'"
      [class.bwc-button-icon]="icon === 'plus'"
      [disabled]="disabled"
      type="button"
    >
      <!-- prettier-ignore -->
      <svg *ngIf="icon === 'plus'" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="50" d="M256 112v288m144-144H112" />
      </svg>
      <ng-content></ng-content>
    </button>
  `,
})
export class ButtonComponent {
  @Input() public disabled = false;
  @Input() public icon: undefined | 'plus';
  @Input() public type: 'primary' | 'secondary' = 'primary';
}
