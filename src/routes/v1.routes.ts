import { RouteConfig } from 'types/RouteConfig';
import userRouter from '@/modules/user/user.route';
import authRouter from '@/modules/auth/auth.route';
import businessRouter from '@/modules/business/business.route';

const routes: RouteConfig[] = [
  { route: userRouter, prefix: '/api/user' },
  { route: authRouter, prefix: '/api/auth' },
  { route: businessRouter, prefix: '/api/business' },
];

export default routes;
