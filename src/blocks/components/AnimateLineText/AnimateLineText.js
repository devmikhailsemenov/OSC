import { smoothly } from '@helpers/smoothly';

const { transitionBlock, transitionEnd } = smoothly;

/**
 * Анимация строк текста передаваемого elem
 * @param  {Object} elem - DOM-элемент
 */
const animateLineText = elem => {
	if (window.matchMedia('(max-width: 992px)').matches) return;

	const text = elem.innerHTML; // Записываем изначальный HTML елемента
	const textArr = text.split(/\n/); // Разбиваем HTML на массив по переносу строки

	elem.innerHTML = '';

	for (let i = 0; i < textArr.length; i++) {
		const line = document.createElement('span');

		line.className = 'animate-line-text__line box-hidden';
		line.innerHTML = textArr[i]; // Записываем кажду строку в созданный span
		elem.append(line);

		line.style.transitionDelay = `${200 * i}ms`;
		transitionBlock(line, 'animate-line-text__line--active');
	}

	transitionEnd(elem.lastElementChild, null, () => {
		elem.innerHTML = text.trim(); // Когда произойдет transitionend у последнего элемента, рендерим изначальный текст
	});
}

export { animateLineText };
