import {
	IAuthenticateQueryAuth,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class NasaPicsApi implements ICredentialType {
	name = 'nasapicsApi';
	displayName = 'NASA Pics API';
	documentationUrl = '';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
		},
	];
	authenticate = {
		type: 'queryAuth',
		properties: {
			key: 'api_key',
			value: '={{$credentials.apiKey}}',
		},
	} as IAuthenticateQueryAuth;
}