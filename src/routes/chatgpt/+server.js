import { ChatGPTAPI } from 'chatgpt';
import { env } from '$env/dynamic/private';

const credentials = { user: 'pp', pass: '94bPxVpqjfE5kw7xbT' };

const checkAuth = (req) => {
	const b64auth = (req.headers.get('X-Auth') || '').split(' ')[1] || '';
	const [user, pass] = Buffer.from(b64auth, 'base64').toString().split(':');

	return user && pass && user === credentials.user && pass === credentials.pass;
};

export async function POST({ request }) {
	const auth = checkAuth(request);
	if (!auth) {
		return new Response(null, {
			headers: {
				'WWW-Authenticate': 'Basic realm="401"',
				'Content-Security-Policy': 'default-src *; connect-src *',
				'Access-Control-Allow-Origin': 'http://localhost:3000',
				'Access-Control-Allow-Credentials': 'true',
				'Access-Control-Allow-Headers':
					'Authorization, Origin, X-Requested-With, Content-Type, Accept'
			},
			status: 401,
			statusText: 'Authentification required'
		});
	}

	const response = await request.json();
	console.log(response);

	try {
		const api = new ChatGPTAPI({
			apiKey: env.OPENAI_API_KEY,
			completionParams: {
				model: 'gpt-3.5-turbo'
			}
		});

		const res = await api.sendMessage(response.prompt);
		console.log('Response', res);

		return new Response(JSON.stringify(res), {
			status: 200,
			headers: {
				'Content-Security-Policy': 'default-src *; connect-src *',
				'Access-Control-Allow-Origin': 'http://localhost:3000',
				'Access-Control-Allow-Credentials': 'true',
				'Access-Control-Allow-Headers':
					'Authorization, Origin, X-Requested-With, Content-Type, Accept'
			},
			statusText: 'OK'
		});
	} catch (e) {
		console.log(e);

		return new Response(`Error: ${e}`, {
			headers: {
				'Content-Security-Policy': 'default-src *; connect-src *',
				'Access-Control-Allow-Origin': 'http://localhost:3000',
				'Access-Control-Allow-Credentials': 'true',
				'Access-Control-Allow-Headers':
					'Authorization, Origin, X-Requested-With, Content-Type, Accept'
			},
			status: 500
		});
	}
}
