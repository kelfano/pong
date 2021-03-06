import { SVG_NS, KEYS, SCORE } from '../settings';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';

export default class Game {

	constructor(element, width, height) {
		this.width = width;
		this.height = height;

		this.gameElement = document.getElementById(element);
		this.board = new Board(this.width, this.height);
		this.player1Score = new Score(this.width / 2 - SCORE.x, SCORE.y, SCORE.size);
		this.player2Score = new Score(this.width / 2 + SCORE.x - 20, SCORE.y, SCORE.size);

		const radius = 8;

		this.ball = new Ball(
			radius,
			this.width,
			this.height,
		);

		this.array = new Array();
		this.array[0] = new Ball(
			radius,
			this.width,
			this.height,
		);
		this.array[1] = new Ball(
			radius,
			this.width,
			this.height,
		);

		this.padding = 10;
		this.paddleWidth = 8;
		this.paddleHeight = 56;

		this.player1 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			this.padding,
			((this.height - this.paddleHeight) / 2),
			KEYS.a,
			KEYS.z
		);

		this.player2 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			(this.width - this.paddleWidth - this.padding),
			((this.height - this.paddleHeight) / 2),
			KEYS.up,
			KEYS.down
		);


		document.addEventListener('keydown', event => {
			if (event.key === KEYS.spaceBar) {
				this.pause = !this.pause;
			}
		});
	}

	render() {
		if (this.pause) {
			return;
		}

		this.gameElement.innerHTML = '';

		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
		this.gameElement.appendChild(svg);

		this.board.render(svg);
		this.player1.render(svg);
		this.player2.render(svg);
		this.ball.render(svg, this.player1, this.player2);
		this.array[0].render(svg, this.player1, this.player2);
		this.array[1].render(svg, this.player1, this.player2);
		this.player1Score.render(svg, this.player1.score);
		this.player2Score.render(svg, this.player2.score);

	}
}

