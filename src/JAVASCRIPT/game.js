import confetti from 'canvas-confetti';
import { gameCompleteAnim, gameOverAnim, startAnimate } from './animations';

class Game {
	constructor() {
		this.currentSentence = null;
		this.currentSentenceLetters = null;
		this.attempts = 7;

		this.elemSentence = document.querySelector('.game-sentence');
		this.elemAttempts = document.querySelector('.game-attempts');
		this.elemLetters = document.querySelector('.game-letters');
		this.elemTip = document.querySelector('.game-tip');

		this.sentences = [
			{ answer: 'Czarna Pantera', tip: 'Superbohater z uniwersum Marvela' },
			{ answer: 'Król Lew', tip: 'Animacja Disneya o młodym lwie' },
			{ answer: 'Harry Potter', tip: 'Chłopiec czarodziej z blizną w kształcie błyskawicy' },
			{ answer: 'Shrek', tip: 'Zielony ogr mieszkający na bagnach' },
			{ answer: 'Matrix', tip: 'Film science fiction z Neo i czerwonymi tabletkami' },
			{ answer: 'Gwiezdne Wojny', tip: 'Słynna saga o Jedi i Sithach' },
			{ answer: 'Władca Pierścieni', tip: 'Wyprawa do Mordoru, by zniszczyć Pierścień' },
			{ answer: 'Hobbit', tip: 'Przygody Bilba Bagginsa i krasnoludów' },
			{ answer: 'Indiana Jones', tip: 'Archeolog w kapeluszu z biczem' },
			{ answer: 'Piraci z Karaibów', tip: 'Kapitan Jack Sparrow i jego morskie przygody' },
			{ answer: 'Asterix i Obelix', tip: 'Niepokonani Galowie pijący magiczny napój' },
			{ answer: 'Kung Fu Panda', tip: 'Gruby miś walczący jak mistrz kung-fu' },
			{ answer: 'Epoka Lodowcowa', tip: 'Przygody mamuta, leniwca i tygrysa' },
			{ answer: 'Madagaskar', tip: 'Zwierzęta z zoo trafiają na bezludną wyspę' },
			{ answer: 'Toy Story', tip: 'Historia zabawek ożywających, gdy nikt nie patrzy' },
			{ answer: 'Kubuś Puchatek', tip: 'Miś o bardzo małym rozumku i jego przyjaciele' },
			{ answer: 'Czerwony Kapturek', tip: 'Dziewczynka i wilk w lesie' },
			{ answer: 'Trzy świnki', tip: 'Opowieść o domkach z różnych materiałów' },
			{ answer: 'Czarodziej z Krainy Oz', tip: 'Dorotka i jej droga żółtą ceglaną ścieżką' },
			{ answer: 'Pinokio', tip: 'Drewniany chłopiec, któremu rośnie nos' },
			{ answer: 'Kopciuszek', tip: 'Dziewczyna, która gubi pantofelek' },
			{ answer: 'Królewna Śnieżka', tip: 'Księżniczka i siedmiu krasnoludków' },
			{ answer: 'Roszpunka', tip: 'Księżniczka z bardzo długimi włosami' },
			{ answer: 'Mała Syrenka', tip: 'Syrenka zakochana w księciu' },
			{ answer: 'Zielona Mila', tip: 'Więzienna opowieść z niezwykłym więźniem' },
			{ answer: 'Skazani na Shawshank', tip: 'Historia ucieczki z więzienia' },
			{ answer: 'Forrest Gump', tip: 'Facet, który biegał przez całe życie' },
			{ answer: 'Gladiator', tip: 'Rzymski wojownik walczący na arenie' },
			{ answer: 'Incepcja', tip: 'Film o snach w snach i kradzieży pomysłów' },
			{ answer: 'Człowiek Pająk', tip: 'Superbohater ugryziony przez radioaktywnego pająka' },
		];
	}

	generateLetterButtons() {
		const alphabet = [
			'a',
			'ą',
			'b',
			'c',
			'ć',
			'd',
			'e',
			'ę',
			'f',
			'g',
			'h',
			'i',
			'j',
			'k',
			'l',
			'ł',
			'm',
			'n',
			'ń',
			'o',
			'ó',
			'p',
			'q',
			'r',
			's',
			'ś',
			't',
			'u',
			'v',
			'w',
			'x',
			'y',
			'z',
			'ź',
			'ż',
		];

		alphabet.forEach(letter => {
			const button = document.createElement('button');
			button.classList.add('game-letter');
			button.type = 'button';
			button.dataset.letter = letter;
			button.innerText = letter;
			this.elemLetters.append(button);
		});
	}

	isLetterExist() {
		return this.currentSentenceLetters.length;
	}

	checkLetterSentence(letter) {
		if (this.currentSentence.includes(letter)) {
			const letterBox = this.elemSentence.querySelectorAll('.game-sentence-box');

			for (let i = 0; i < this.currentSentence.length; i++) {
				if (this.currentSentence[i] === letter) {
					letterBox[i].innerText = letter;
				}
			}

			this.currentSentenceLetters = this.currentSentenceLetters.replace(new RegExp(letter, 'g'), '');

			if (!this.isLetterExist()) {
				this.gameComplete();
			}
		} else {
			this.attempts--;
			this.showAttempts();

			if (this.attempts <= 5) {
				this.elemAttempts.classList.add('alert');
			}

			if (this.attempts <= 0) {
				this.gameOver();
				this.elemAttempts.classList.remove('alert');
			}
		}
	}

	bindEvents() {
		this.elemLetters.addEventListener('click', e => {
			if (e.target.matches('button.game-letter')) {
				const letter = e.target.dataset.letter;
				this.checkLetterSentence(letter.toUpperCase());
				e.target.disabled = true;
			}
		});
	}

	enableLetters() {
		const letters = this.elemLetters.querySelectorAll('.game-letter');
		letters.forEach(letter => (letter.disabled = false));
	}

	disableLetters() {
		const letters = this.elemLetters.querySelectorAll('.game-letter');
		letters.forEach(letter => (letter.disabled = true));
	}

	initBoard() {
		this.generateLetterButtons();
		this.bindEvents();
		this.disableLetters();
	}

	showAttempts() {
		this.elemAttempts.innerText = this.attempts;
	}

	randomSentence() {
		const max = this.sentences.length - 1;
		const rand = Math.floor(Math.random() * (max + 1));

		const picked = this.sentences[rand];

		this.currentSentence = picked.answer.toUpperCase();
		this.currentSentenceLetters = this.currentSentence.replace(/ /g, '');
		this.elemTip.innerText = picked.tip;

		this.elemSentence.innerText = '';

		const letters = this.currentSentence.split('');
		letters.forEach(letter => {
			const div = document.createElement('div');
			div.classList.add('game-sentence-box');
			if (letter === ' ') {
				div.classList.add('game-sentence-box-space');
			}
			this.elemSentence.append(div);
		});
	}

	startGame() {
		this.attempts = 7;
		this.randomSentence();
		this.showAttempts();
		this.enableLetters();
		this.elemAttempts.classList.remove('alert');
		this.elemTip.classList.remove('hide');
		startAnimate();
	}

	gameOver() {
		this.elemTip.classList.add('hide');
		confetti({
			particleCount: 100,
			spread: 60,
			origin: { y: 0.6 },
			colors: ['#ff0000', '#990000', '#ff3333'],
		});

		this.elemSentence.innerHTML = `
    	<div class="game-over-message">
     		 Niestety nie udało ci się odgadnąć hasła 😢<br>
     	 	<strong>${this.currentSentence}</strong>
   		 </div>
  		`;

		gameOverAnim();
		this.disableLetters();
	}

	gameComplete() {
		this.elemTip.classList.add('hide');
		confetti({
			particleCount: 200,
			spread: 120,
			origin: { y: 0.6 },
			colors: ['#ffb20cff', '#b40697ff', '#2238faff'],
		});

		this.elemSentence.innerHTML = `
    	<div class="game-win-message">
      		🎉 Udało ci się zgadnąć hasło! 🎉 <br>
       		 <strong>${this.currentSentence}</strong>
    	</div>
		 `;

		gameCompleteAnim();
		this.disableLetters();
	}
}

export default Game;
