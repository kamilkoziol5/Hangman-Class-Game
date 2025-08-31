import gsap from 'gsap';

export function gameOverAnim() {
	const msg = document.querySelector('.game-over-message');

	gsap.fromTo(msg, { opacity: 0, scale: 0, y: 0 }, { opacity: 1, scale: 1, duration: 1, ease: 'power1.out' });
}

export function gameCompleteAnim() {
	const msg = document.querySelector('.game-win-message');

	gsap.fromTo(msg, { opacity: 0, scale: 0, y: 0 }, { opacity: 1, scale: 1, duration: 1, ease: 'power1.out' });
}

export function startAnimate() {
	const attempts = document.querySelector('.game .game-attempts');
	const words = document.querySelectorAll('.game .game-sentence .game-sentence-box');
	const tip = document.querySelector('.game .game-tip');
	const letters = document.querySelectorAll('.game .game-letters .game-letter');
	const btn = document.querySelector('.button');

	gsap.fromTo(
		attempts,
		{ opacity: 0, scale: 0, rotate: 360 },
		{ opacity: 1, scale: 1, rotate: 0, delay: 0.1, duration: 0.5 }
	);

	gsap.fromTo(words, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.2, delay: 0.3, stagger: 0.1 });

	gsap.fromTo(tip, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.5, delay: 0.5 });

	gsap.fromTo(letters, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.05, delay: 0.75, stagger: 0.05 });

	gsap.fromTo(btn, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1, duration: 0.5, delay: 1 });
}
