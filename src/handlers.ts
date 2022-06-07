import { gql } from 'https://deno.land/x/graphql_tag@0.0.1/mod.ts';
import { makeExecutableSchema } from 'https://deno.land/x/graphql_tools@0.0.2/schema/makeExecutableSchema.ts';
import { CountServiceFactory } from './CountService.ts';
import { GraphQLHTTP } from './http.ts';
import { MongoService } from './MongoService.ts';

const countSvc = CountServiceFactory();

const typeDefs = gql`
	type Query {
		hello: String
	}
`;

const resolvers = { Query: { hello: () => `Hello World!` } };

const gqlMiddleware = await GraphQLHTTP<Request>({
	graphiql: true,
	schema: makeExecutableSchema({ resolvers, typeDefs }),
});

export const httpRequestHandler = async (
	request: Request,
): Promise<Response> => {
	countSvc.addToCount();
	const reqNum = countSvc.getCount();

	console.log(
		`handling request event #${reqNum} - ${request.method} ${request.url}`,
	);

	const { pathname } = new URL(request.url);

	if (pathname === '/graphql') {
		return gqlHandler(request);
	}

	if (pathname === '/' && request.method === 'GET') {
		// deno-lint-ignore ban-untagged-todo
		// TODO - re-use MongoSvc
		const conn = Deno.env.get('MONGO_CONNECTION_STRING') ?? '';
		const mongoSvc = new MongoService(conn);

		const pages = await mongoSvc.fetchPages();

		const headers = new Headers();
		headers.set('content-type', 'text/html');

		const response = new Response(
			`
	<!DOCTYPE html>
	<html>
		<head>
			<title>Anthony&apos;s Deno World</title>
		</head>
		<body>
			<h1>Welcome!</h1>
			<a href="/graphql" target="_self" re>GraphQL Playground</a>
			<p>${JSON.stringify(pages)}</p>
			</body>
	</html>
	`,
			{ headers, status: 200 },
		);

		return Promise.resolve(response);
	}

	const responseBody = `Req #${reqNum}: Your user-agent is:\n\n`.concat(
		request.headers.get('user-agent') ?? 'Unknown',
	);

	const response = new Response(responseBody, { status: 200 });

	return Promise.resolve(response);
};

const gqlHandler = (request: Request): Promise<Response> => {
	return gqlMiddleware(request);
};
