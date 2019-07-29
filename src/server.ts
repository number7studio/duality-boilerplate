import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import cors from '@koa/cors'

import { GraphQLClient } from 'graphql-request';

import { signup, login } from './auth';
import { auth, RequiresOneOfRoles, Roles } from './auth/middlware';
import { getUsers } from './dao/users';
import { handleGraphqlRequest } from './dao/graphql';

const app = new Koa();
app.use(auth)
app.use(cors())

const router = new Router();

router.post('/graphql', async (ctx) => {
  ctx.body = await handleGraphqlRequest(ctx.AuthedUser.user_id, ctx.request.body.query);
  ctx.set('X-Content-Type-Options', 'nosniff')
  ctx.set('Content-Type', 'application/json') 

})

app.use(bodyParser());
router.post('/signup', async (ctx) => {
  ctx.body = await signup(ctx.request.body.username,
    ctx.request.body.password);
  return ctx;
})


router.post('/login/email', async (ctx) => {
  ctx.body = await login(ctx.request.body.username,
    ctx.request.body.password);
  return ctx;
});

router.get('/users',
  RequiresOneOfRoles([Roles.ADMIN]),
  async (ctx) => {
    ctx.body = await getUsers();
    return ctx;
  });

app
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(3005); 