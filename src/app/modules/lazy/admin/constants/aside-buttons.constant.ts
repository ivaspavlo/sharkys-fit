import { IAsideButton } from '@app/modules/ui/aside/interfaces';
import { ROUTE_NAMES } from './routes.constant';


export const AsideButtons: IAsideButton[] = [
  { uiName: 'admin.approved', link: `/admin/${ROUTE_NAMES.APPROVED}` },
  { uiName: 'admin.new', link: `/admin/${ROUTE_NAMES.PENDING}` },
  { uiName: 'core.button.logout', link: null }
];
