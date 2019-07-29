import { verifySession } from "./sessions";

export enum Roles {
    ANONYMOUS = 'anonymous',
    USER = 'user',
    ADMIN = 'admin',
}

interface AuthedUser {
    user_id: number|null;
    role: string[];
}

export const auth = async (ctx, next) => {
    const token = ctx.get('x-auth-token');
    if (!token) {
        ctx.AuthedUser = {
            user_id: 3,
            role: [Roles.ANONYMOUS]
        }
        return await next();
    }

    const loggedIn = verifySession(token);

    if (!loggedIn) {
        ctx.status = 401;
        return ctx.body = { 'message': 'not authorized' };
    } else {
        await next();
    }
}

export const RequiresOneOfRoles = (roles: Roles[]) => {
    return async (ctx, next) => {
        if(!ctx.AuthedUser) {
            ctx.throw(401, 'not authenticated');
            return await next();
        }  

        const authedUsersRoles = ctx.AuthedUser.role

        const roleIncluded = roles.reduce((acc, role) => {
           return acc || (authedUsersRoles.indexOf(role) !== -1)
        }, false);

        if(!roleIncluded) {
            ctx.throw(403, 'not authorized');
            return await next();
        }

        await next();
    }
}