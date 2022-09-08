import { Guild, GuildMember, Message, User } from 'discord.js';

interface Calc {
	message: Message;
	embed?: {
		title?: string;
		color?: string;
		footer?: string;
		timestamp?: boolean;
	};
	disabledQuery?: string;
	invalidQuery?: string;
	othersMessage?: string;
}

interface Chaos {
	message: Message;
	embed?: {
		title?: string;
		description?: string;
		color?: string;
		field1?: string;
		field2?: string;
		field3?: string;
		field4?: string;
		footer?: string;
		timestamp?: boolean;
	};
	winMessage?: string;
	loseMessage?: string;
	wrongWordMessage?: string;
	correctWordMessage?: string;
	time?: number;
	words?: string[];
	charGenerated?: number;
	maxTries?: number;
	buttonText: string;
	othersMessage?: string;
}

interface Fast {
	message: Message;
	embed?: {
		title?: string;
		description?: string;
		color?: string;
		footer?: string;
		timestamp?: boolean;
	};
	sentence?: string;
	winMessage?: string;
	loseMessage?: string;
	cancelMessage?: string;
	time?: number;
	buttonText?: string;
	othersMessage?: string;
}

interface fight {
	message: Message;
	opponent: User;
	embed?: {
		title?: string;
		color?: string;
		footer?: string;
		timestamp: boolean;
	};
	buttons?: {
		hit?: string;
		heal: string;
		cancel?: string;
		accept?: string;
		deny?: string;
	};
	acceptMessage?: string;
	winMessage?: string;
	endMessage?: string;
	cancelMessage?: string;
	fightMessage?: string;
	opponentsTurnMessage?: string;
	highHealthMessage?: string;
	lowHealthMessage?: string;
	returnWinner?: boolean;
	othersMessage?: string;
}

interface guessTheNumber {
	message: Message;
	embed?: {
		title?: string;
		description?: string;
		color?: string;
		footer?: string;
		timestamp?: boolean;
	};
	publicGame?: boolean;
	number?: number;
	time?: number;
	winMessage?: {
		publicGame: string;
		privateGame: string;
	};
	loseMessage: string;
	bigNumberMessage: string;
	smallNumberMessage: string;
	othersMessage: string;
	buttonText: string;
	ongoingMessage: string;
	returnWinner: boolean;
}

interface guessThePokemon {
	message: Message;
	embed?: {
		title?: string;
		description?: string;
		color?: string;
		footer?: string;
		timestamp?: boolean;
	};
	thinkMessage?: string;
	othersMessage?: string;
	winMessage?: string;
	loseMessage?: string;
	time: ?number;
	incorrectMessage?: string;
	buttonText?: string;
}

interface lieSwatter {
	message: Message;
	embed?: {
		title?: string;
		color?: string;
		footer?: string;
		timestamp?: boolean;
	};
	thinkMessage?: string;
	winMessage?: string;
	loseMessage?: string;
	othersMessage?: string;
	buttons?: { true?: string; lie?: string };
}

interface neverHaveIEver {
	message: Message;
	embed?: {
		title?: string;
		color?: string;
		footer?: string;
		timestamp?: boolean;
	};
	thinkMessage?: string;
	othersMessage?: string;
	buttons?: { optionA?: string; optionB?: string };
}

interface quickClick {
	message: Message;
	embed?: {
		title?: string;
		color?: string;
		footer?: string;
		timestamp?: boolean;
	};
	time?: number;
	waitMessage?: string;
	startMessage?: string;
	winMessage?: string;
	loseMessage?: string;
	emoji?: string;
	ongoingMessage?: string;
}

interface rockPaperScissors {
	message: Message;
	opponent: User;
	embed?: {
		title?: string;
		description?: string;
		color?: string;
		footer?: string;
		timestamp?: boolean;
	};
	buttons?: {
		rock?: string;
		paper?: string;
		scissors?: string;
		accept?: string;
		deny?: string;
	};
	time?: number;
	acceptMessage?: string;
	winMessage?: string;
	drawMessage?: string;
	endMessage?: string;
	timeEndMessage?: string;
	cancelMessage?: string;
	choseMessage?: string;
	noChangeMessage?: string;
	othersMessage?: string;
	returnWinner?: boolean;
}

interface shuffleGuess {
	message: Message;
	embed?: {
		title?: string;
		color?: string;
		footer?: string;
		timestamp?: boolean;
	};
	word?: string[];
	button?: { cancel: string; reshuffle: string };
	startMessage?: string;
	winMessage?: string;
	loseMessage?: string;
	incorrectMessage?: string;
	othersMessage?: string;
	time?: number;
}

interface snake {
	message: Message;
	embed?: {
		title?: string;
		description?: string;
		color?: string;
		footer?: string;
		timestamp?: boolean;
	};
	emojis?: {
		empty?: string;
		snakeBody?: string;
		food?: string;
		up?: string;
		right?: string;
		down?: string;
		left?: string;
	};
	othersMessage?: string;
	buttonText?: string;
}

interface sudo {
	message: Message;
	member: GuildMember;
	text: string;
	deleteMessage: boolean;
}

interface trivia {
	message: Message;
	embed?: {
		title?: string;
		color?: string;
		footer?: string;
		timestamp?: boolean;
	};
	difficulty?: string;
	thinkMessage?: string;
	winMessage?: string;
	loseMessage?: string;
	emojis?: {
		one?: string;
		two?: string;
		three?: string;
		four?: string;
	};
	othersMessage?: string;
	returnWinner?: boolean;
}

interface wyptb {
	message: Message;
	embed: {
		title?: string;
		color?: string;
		footer?: string;
		timestamp?: boolean;
	};
	button: { yes: string; no: string };
	thinkMessage: string;
	othersMessage: string;
}

declare module 'weky' {
	export function Calculator(options: Calc): void;
	export function ChaosWords(options: Chaos): void;
	export function FastType(options: Fast): void;
	export function Fight(options: fight): void;
	export function GuessTheNumber(options: guessTheNumber): void;
	export function GuessThePokemon(options: guessThePokemon): void;
	export function LieSwatter(options: lieSwatter): void;
	export function NeverHaveIEver(options: neverHaveIEver): void;
	export function QuickClick(options: quickClick): void;
	export function RockPaperScissors(options: rockPaperScissors): void;
	export function ShuffleGuess(options: shuffleGuess): void;
	export function Snake(options: snake): void;
	export function Sudo(options: sudo): void;
	export function Trivia(options: trivia): void;
	export function WillYouPressTheButton(options: wyptb): void;
	export function bent(message: string): string;
	export function flip(message: string): string;
	export function mirror(message: string): string;
	export function randomCase(message: string): string;
	export function randomHexColor(): string;
	export function randomizeNumber(start: number, end: number): number;
	export function randomizeString(array: string[]): string;
	export function reverseText(text: string): string;
	export function tinyCaptial(text: string): string;
	export function vaporwave(text: string): string;
}
