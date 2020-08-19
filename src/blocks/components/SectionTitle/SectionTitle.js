import Typed from 'typed.js';

// Функция автопечатания заголовка
const typedTitle = elem => {
	// Создаем клон печатающегося текста, чтобы высота изначального элемента оставалась одной и той же
	const createTitleClone = elem => {
		const clone = elem.cloneNode(true);

		clone.className = 'section-title__typing section-title__typing--clone';
		clone.setAttribute('style', '');
		clone.setAttribute('id', '');

		elem.parentNode.append(clone);
		elem.classList.add('section-title__typing--absolute');

		return clone;
	}

	const cloneTypingTitle = createTitleClone(elem);

	const typedTitleContent = elem.innerHTML;

	elem.innerHTML = '';

	return new Promise(resolve => {
		const typed = new Typed(`#${ elem.id }`, {
			strings: [typedTitleContent],
			typeSpeed: 50,
			onBegin: self => {
				const { el } = self;

				el.classList.add('section-title__typing--visible');
			},
			onComplete: self => {
				const { el } = self;

				el.classList.remove('section-title__typing--absolute');
				cloneTypingTitle.remove();

				resolve(el);
			}
		});
	})
}

const selectedWordsTitle = elem => {
	const typedText = elem.querySelector('.section-title__typing');

	const addActiveClassSelectedWords = elem => {
		const highlightedWords = elem.querySelector('.section-title__selected-words');

		highlightedWords.classList.add('section-title__selected-words--active');
	}

	if (typedText) {
		const typedTitleCompleted = typedTitle(typedText);

		typedTitleCompleted.then(el => addActiveClassSelectedWords(el));
	} else {
		addActiveClassSelectedWords(elem);
	}
}

export { typedTitle, selectedWordsTitle };
