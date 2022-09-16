import { Component, ChangeDetectionStrategy, Input } from '@angular/core';


@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LogoComponent {

  @Input() size: 'sm' | 'md' | 'lg' = 'md';
  @Input() noUrl: boolean = false;

}
