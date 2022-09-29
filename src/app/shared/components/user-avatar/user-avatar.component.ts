import { Component, ChangeDetectionStrategy, Input } from '@angular/core';


@Component({
  selector: 'app-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserAvatarComponent {

  @Input() imageSrc: string;

}
