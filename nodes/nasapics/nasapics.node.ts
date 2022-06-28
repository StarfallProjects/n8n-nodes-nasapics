/* eslint-disable n8n-nodes-base/filesystem-wrong-node-filename */
import { INodeType, INodeTypeDescription } from 'n8n-workflow';


export class NasaPics implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'NASA Pics',
		name: 'nasapics',
		icon: 'file:nasapics.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Get data from NASAs APOD API',
		defaults: {
			name: 'APOD',
			color: '#0b3d91',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'nasapicsApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: 'https://api.nasa.gov',
			url: '',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Astronomy Picture of the Day',
						value: 'astronomyPictureOfTheDay',
					},
					{
						name: 'Mars Rover Photos',
						value: 'marsRoverPhotos'
					}
				],
				default: 'astronomyPictureOfTheDay',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'astronomyPictureOfTheDay'
						]
					}
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get the Astronomy Picture of the day',
						routing: {
							request: {
								method: 'GET',
								url: '/planetary/apod'
							}
						}
					}
				],
				default: 'get'
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: [
							'marsRoverPhotos'
						]
					}
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						description: 'Get photos from the Mars Rover',
						routing: {
							request: {
								method: 'GET',
								url: '/mars-photos/api/v1/curiosity/photos'
							}
						}
					}
				],
				default: 'get'
			}
		],
	};
}
