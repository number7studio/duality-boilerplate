import { getSession } from "./sessions";
import UserRoles from "../database/models/user_roles";

export enum Roles {
    ANONYMOUS = 'anonymous',
    USER = 'user',
    ADMIN = 'admin',
}

interface AuthedUser {
    user_id: number|null;
    roles: string[];
}

export const auth = async (ctx, next) => {
    const token = ctx.get('x-auth-token');
    if (!token) {
        ctx.AuthedUser = {
            userId: null,
            roles: [Roles.ANONYMOUS]
        }
        return await next();
    }

    try {
        const session = await getSession(token);
        ctx.AuthedUser = {
            userId: session.userId,
            roles: (await UserRoles.findAll({
                where: {
                    userId: session.userId
                }
            })).map((ur) => ur.role)

        }
    } catch(e) {
        ctx.throw(401, 'This token is either malformed or revoked. Please reauthenticate.');
    }
    await next();
}

export const RequiresOneOfRoles = (roles: Roles[]) => {
    return async (ctx, next) => {
        if(!ctx.AuthedUser) {
            ctx.throw(401, 'not authenticated');
            return await next();
        }  

        const authedUsersRoles = ctx.AuthedUser.roles

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