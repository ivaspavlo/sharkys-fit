import { IAsideButton } from '@app/modules/ui/aside/interfaces';
import { ROUTE_NAMES } from './routes.constant';


export const AsideButtons: IAsideButton[] = [
  { uiName: 'admin.approved', link: `/admin/${ROUTE_NAMES.APPROVED}` },
  { uiName: 'admin.new', link: `/admin/${ROUTE_NAMES.PENDING}` },
  { uiName: 'admin.user-content', link: `/admin/${ROUTE_NAMES.USER_CONTENT}` },
  { uiName: 'core.button.logout', link: null, icon: 'off' }
];
