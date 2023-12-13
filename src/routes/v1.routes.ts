import { RouteConfig } from 'types/RouteConfig';
import userRouter from '@/modules/user/user.route';
import authRouter from '@/modules/auth/auth.route';

const routes: RouteConfig[] = [
  { route: userRouter, prefix: '/user' },
  { route: authRouter, prefix: '/auth' },
];

export default routes;
