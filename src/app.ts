import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors'

import { auth, RequiresOneOfRoles, Roles } from './auth/middlware';
import User from './database/models/users';
import { sequelize } from './database/sequelize';
import Auth from './database/models/auth';
import UserRoles from './database/models/user_roles';
import moodRouter from './routes/moods';
import authRouter from './routes/auth';

const app = new Koa();
app.use(auth)
app.use(cors())


export const appPromise = sequelize.authenticate().then(() => {

    const router = new Router();

    app.use(bodyParser());
    
    router.get('/health', async (ctx) => {
        ctx.body = 'Success'
    })
    
    router.get('/users',
      RequiresOneOfRoles([Roles.ADMIN]),
      async (ctx) => {
        ctx.body = await User.findAll({
          include:[Auth, UserRoles]
        })
        return ctx;
      });
    
    app
      .use(router.routes())
      .use(moodRouter.routes())
      .use(authRouter.routes())
      .use(router.allowedMethods());
    
    return app;
});
