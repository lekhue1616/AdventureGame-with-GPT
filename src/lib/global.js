import { joinArrayNaturally } from '$lib/helper.js';

export const PARAGRAPH_DIVIDER = '<--->';

export const LINK_AFTER_FINISHING = 'https://www.soscisurvey.de/PP2023/';
export const LINK_AFTER_FINISHING_LABEL = 'Continue to survey';

export function generatePrompt(puzzleDescriptions, scenarioDescription, promptWords) {
	const paragraphs = puzzleDescriptions.length + 2;
	let puzzleDescriptionString = '';
	for (const description of puzzleDescriptions) {
		puzzleDescriptionString += `- ${description}\n`;
	}
	console.log(promptWords);
	const prompt = `I am writing an web-based escape room generator and need you to write the story beween the puzzles.

Give me the textual structure for the story. The story is structured as follows:

- A fitting beginning to the story.
${puzzleDescriptionString}- A fitting conclusion for the story.

Rules:
- Give me exactly ${paragraphs} paragraphs!
- Create a story in a ${scenarioDescription} universe${
		Object.keys(promptWords)?.length > 0
			? ` which is bend around ${joinArrayNaturally(Object.values(promptWords))}`
			: ''
	}!
- Each structure should be parted by a "${PARAGRAPH_DIVIDER}"!
- Do not label the paragraphs! 
- Do not give the riddles or answers!`;

	return prompt;
}

export const PUZZLES = [
	{
		type: 'crossword',
		description: `Crossword: Fault (5)`,

		promptExplanation:
			'A story that leads to a puzzle where a you stand infront on an wall with a crossword.',
		imgLink: '/img/riddle/wall/wall hp.jpg',
		matchesScenario: ['harry potter'],
		solutionForm: [
			{
				type: 'text',
				correctValue: 'Error',
				maxLength: '10'
			}
		],
		hints: ['A different word for fault with 5 letters', 'Typically seen on Computers']
	},
	{
		type: 'crossword',
		description: `Crossword: Best conditions in the circumstances (7)`,

		promptExplanation:
			'A story that leads to a puzzle where a you stand infront on an wall with a crossword.',
		imgLink: '/img/riddle/wall/wall pb.jpg',
		matchesScenario: ['prison break'],
		solutionForm: [
			{
				type: 'text',
				correctValue: 'optimum',
				maxLength: '10'
			}
		],
		hints: [
			'A different word for "Best conditions in the circumstances" with 7 letters',
			'You have acheved the ...'
		]
	},
	{
		type: 'crossword',
		description: `Crossword: Absolutly Not (2,3)`,

		promptExplanation:
			'A story that leads to a puzzle where a you stand infront on an wall with a crossword.',
		imgLink: '/img/riddle/wall/wall stw.jpg',
		matchesScenario: ['save the world'],
		solutionForm: [
			{
				type: 'text',
				correctValue: 'NO WAY',
				maxLength: '10'
			}
		],
		hints: [
			'A different word for "Absolutly Not" with 2 and 3 letters',
			'(__ ___)',
			'Its also an exclamation'
		]
	},

	{
		type: 'riddle',
		description: `In a castle full of secrets and enchanting lore, answer me this: I fly without wings, I cry without eyes. Wherever I go, darkness follows me. What am I?`,

		promptExplanation:
			'A story that leads to a puzzle where a riddle is etched into an triangle shaped door.',
		imgLink: '/img/riddle/word/hp door1.png',
		matchesScenario: ['harry potter'],
		solutionForm: [
			{
				type: 'text',
				correctValue: 'Cloud',
				maxLength: '10'
			}
		],
		hints: ['I am up in the sky.', 'I can change shape.', 'I can bring rain.']
	},
	{
		type: 'riddle',
		description: `Behind these walls, a puzzle unfolds: I am filled with water but I am not a lake, I can be washed but I'm not made of cloth, I can be cracked but I'm not an egg. What am I?`,

		promptExplanation:
			'A story that leads to a puzzle written on the wall next to a reinfoced iron door.',
		imgLink: '/img/riddle/word/pb door1.png',
		matchesScenario: ['prison break'],
		solutionForm: [
			{
				type: 'text',
				correctValue: 'Coconut',
				maxLength: '10'
			}
		],
		hints: ['I am a fruit.', 'I am often seen in tropical areas.', 'You can drink my water.']
	},
	{
		type: 'riddle',
		description: `To save our precious earth, solve this riddle: I am tall when I am young, and I am short when I am old. What am I?`,

		promptExplanation:
			'A story that leads to a puzzle written on the wall next to a door with an weird heart shaped artifact on it.',
		imgLink: '/img/riddle/word/stw door1.png',
		matchesScenario: ['save the world'],
		solutionForm: [
			{
				type: 'text',
				correctValue: 'Candle',
				maxLength: '10'
			}
		],
		hints: [
			'I provide light.',
			'I melt over time.',
			'You use me during power outages or on birthday cakes.'
		]
	},
	{
		type: 'math',
		description: `1, 2, 6, 16, ?`,

		promptExplanation: 'A story that leads to a puzzle written on the wall next to an keypad.',
		imgLink: '/img/riddle/math/prison math.png',
		matchesScenario: ['prison break'],
		solutionForm: [
			{
				type: 'text',
				correctValue: '44',
				maxLength: '10'
			}
		],
		hints: ['Somthings gonna add up!', 'Make it double!', '(1+2)*2=6']
	},
	{
		type: 'math',
		description: `4, 3, 6, 8, 13, ?`,

		promptExplanation:
			'A story that leads to a puzzle where you have to solve a riddle, written on the back side of an ouija board.',
		imgLink: '/img/riddle/math/hp math.png',
		matchesScenario: ['harry potter'],
		solutionForm: [
			{
				type: 'text',
				correctValue: '20',
				maxLength: '10'
			}
		],
		hints: ['Somthings gonna add up!', 'Lets subtract!', '(4+3)-1=6']
	},
	{
		type: 'math',
		description: '1, 2, 3, 5, 8, 13, ?',
		promptExplanation:
			'A story that leads to a puzzle where you have to solve a riddle, written an note next to a wooden keyboard.',
		imgLink: '/img/riddle/math/stw math.png',
		matchesScenario: ['save the world'],
		solutionForm: [
			{
				type: 'text',
				correctValue: '21',
				maxLength: '10'
			}
		],
		hints: ['Somthing gonna add up here!', '2 things add up to the next!', '1+2=3']
	},

	{
		type: 'caesar',
		description: 'Its encoded!',
		promptExplanation:
			'A story that leads to a puzzle where you have to decipher a caesar cipher on an piece of paper.',
		imgLink: '/img/riddle/ceasar/GRINKSE.jpg',
		matchesScenario: ['harry potter', 'save the world', 'prison break'],
		solutionForm: [
			{
				type: 'text',
				correctValue: 'alchemy',
				maxLength: '10'
			}
		],
		hints: [
			'A caesar-cipher rotates the alphabet in one direction',
			'The alphabet was rotated 6 times',
			'6 <--'
		]
	},
	{
		type: 'caesar',
		description: 'Its encoded!',
		promptExplanation:
			'A story that leads to a puzzle where you have to decipher a caesar cipher on an ripped piece of paper.',
		imgLink: '/img/riddle/ceasar/jgtmkx.jpeg',
		matchesScenario: ['harry potter', 'save the world', 'prison break'],
		solutionForm: [
			{
				type: 'text',
				correctValue: 'danger',
				maxLength: '10'
			}
		],
		hints: [
			'A caesar-cipher rotates the alphabet in one direction',
			'The alphabet was rotated 6 times',
			'6 <--'
		]
	},
	{
		type: 'caesar',
		description: 'Its encoded!',
		promptExplanation:
			'A story that leads to a puzzle where you have to decipher a caesar cipher on a burned piece of paper.',
		imgLink: '/img/riddle/ceasar/xkykz.jpeg',
		matchesScenario: ['harry potter', 'save the world', 'prison break'],
		solutionForm: [
			{
				type: 'text',
				correctValue: 'reset',
				maxLength: '10'
			}
		],
		hints: [
			'A caesar-cipher rotates the alphabet in one direction',
			'The alphabet was rotated 6 times',
			'6 <--'
		]
	}
];
