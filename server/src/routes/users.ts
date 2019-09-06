import Router from 'koa-router';
import User from '../database/models/users';
import Auth from '../database/models/auth';
import UserRoles from '../database/models/user_roles';

const userRouter = new Router({ prefix: '/ysers' });

userRouter.get('/', async ctx => {
  ctx.body = await User.findAll({
    include: [Auth, UserRoles]
  });
  return ctx;
});

export default userRouter;
