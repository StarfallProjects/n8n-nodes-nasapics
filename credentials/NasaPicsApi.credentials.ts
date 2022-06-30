import {
	IAuthenticateGeneric,
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
		type: 'generic',
		properties: {
			qs: {
				'api_key': '={{$credentials.apiKey}}'
			}

		},
	} as IAuthenticateGeneric;
}

// note to self: need to update dependencies to use generic