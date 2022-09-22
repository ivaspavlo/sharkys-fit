import { ROUTE_NAMES } from './routes.constant';


export const UserAsideButtons = [
  { uiName: 'user.button.account', link: `/user/${ROUTE_NAMES.ACCOUNT}` },
  { uiName: 'user.button.payment', link: `/user/${ROUTE_NAMES.PAYMENT}` },
  { uiName: 'user.button.photo', link: `/user/${ROUTE_NAMES.AVATAR}` },
  { uiName: 'user.button.getting-started', link: `/user/${ROUTE_NAMES.GETTING_STARTED}` },
  { uiName: 'user.button.what-you-earn', link: `/user/${ROUTE_NAMES.EARNINGS_INFO}` },
  { uiName: 'user.button.how-to-order', link: `/user/${ROUTE_NAMES.ORDER_INFO}` },
  { uiName: 'user.button.promoting', link: `/user/${ROUTE_NAMES.PROMOTIONS}` },
  { uiName: 'user.button.contact-us', link: `/user/${ROUTE_NAMES.CONTACT}` },
];
