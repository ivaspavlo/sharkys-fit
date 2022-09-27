import { IAsideButton } from '@app/modules/ui/aside/interfaces';
import { ROUTE_NAMES } from './routes.constant';


export const AsideButtons: IAsideButton[] = [
  { uiName: 'admin.aside.approved', link: `/admin/${ROUTE_NAMES.APPROVED}` },
  { uiName: 'admin.aside.pending', link: `/admin/${ROUTE_NAMES.PENDING}` }
];
