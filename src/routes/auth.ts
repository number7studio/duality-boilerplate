import Router from 'koa-router'
import { signup, login } from '../auth';

const authRouter = new Router({ prefix: '/auth' })

authRouter.post('/signup', async (ctx) => {
    ctx.body = await signup(ctx.request.body.username,
      ctx.request.body.password);
  })
  
  
authRouter.post('/login/email', async (ctx) => {
    ctx.body = { token: await login(ctx.request.body.username,
        ctx.request.body.password)};
});

export default authRouter