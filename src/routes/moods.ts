import Router from 'koa-router'
import { addMoodEntryForUser, getMoodEntries } from '../dao/moods';

const moodRouter = new Router({ prefix: '/moods' })

moodRouter.post('/', async (ctx) => {
    const userId = ctx.AuthedUser.userId;
    const moods = ctx.request.body.moods;
    
    ctx.body = await addMoodEntryForUser(moods, userId);

})

moodRouter.get('/', async (ctx) => {
    ctx.body = await getMoodEntries(ctx.AuthedUser.userId);
})

export default moodRouter