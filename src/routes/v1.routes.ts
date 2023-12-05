import { RouteConfig } from 'types/RouteConfig';
import userRouter from '@/modules/user/user.route';

const routes: RouteConfig[] = [{ route: userRouter, prefix: '/api/user' }];

export default routes;
