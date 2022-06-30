/* eslint-disable n8n-nodes-base/filesystem-wrong-node-filename */
import { INodeType, INodeTypeDescription } from 'n8n-workflow';


export class NasaPics implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'NASA Pics 3',
		name: 'nasapics',
		icon: 'file:nasapics.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Get data from NASAs APOD and Mars Rover APIs',
		defaults: {
			name: 'NASA Pics',
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
			// Get today's picture
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
			// An additional field to add a date to the APOD query
			// Allows retrieval of images from other days
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'dateTime',
				default: '',
				description: 'The date of the image you want to get',
				displayOptions: {
					show: {
						resource: [
							'astronomyPictureOfTheDay'
						],
						operation: [
							'get'
						]
					}
				},
				routing: {
					request: {
						method: 'GET',
						url: ''
					}
				}				
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
								url: '/mars-photos/api/v1/={{roverName}}/photos'
							}
						}
					}
				],
				default: 'get'
			},
			{
				displayName: 'Rover name',
				description: 'Choose which Mars Rover to get a photo from',
				required: true,
				name: 'roverName',
				type: 'options',
				options: [
					{name: 'Curiosity', value: 'curiosity'},
					{name: 'Opportunity', value: 'opportunity'},
					{name: 'Perseverance', value: 'perseverance'},
					{name: 'Spirit', value: 'spirit'}
				],
				default: 'curiosity',
				displayOptions: {
					show: {
						resource: [
							'marsRoverPhotos'
						]
					}
				}
			}
		],
	};
}
