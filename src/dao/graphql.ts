import { GraphQLClient } from "graphql-request";
import { get } from 'config';


export const handleGraphqlRequest = async (userId, graphqlRequest) => {
    const client = new GraphQLClient(get('hasura.url'), {
        headers: {
            'Content-Type': 'application/json',
            'x-hasura-admin-secret': get('hasura.adminSecret'),
            'x-hasura-role': 'user',
            'x-hasura-user-id': userId
        },
    })
    console.log(graphqlRequest);

    const res = await client.request(graphqlRequest);
    console.log(res);
    return res;
}