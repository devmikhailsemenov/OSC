import lineHeight from 'line-height';

/**
 * Считает кол-во строк и нумерует их.
 */
const setNumberedLines = () => {
	const numLines = document.querySelectorAll('.numbered-lines');

	if (numLines.length === 0) return;

	const resizeObserver = new ResizeObserver(_ => iterationNumLines());

	iterationNumLines();
	
	/**
	 * Нумерует строки
	 * @param  {Number} start    - число, с которого начинается нумерация строк в отдельном блоке
	 * @param  {Number} end      - число, на котором заканчивается нумерация строк в отдельном блоке
	 * @param  {Object} numLines - DOM-элемент, в который записывается нумерация
	 */
	function writeNum(start, end, numLines) {
		const numbers = [];
		const newNumLines = document.createElement('div');

		newNumLines.className = 'numbered-lines__numbers';

		for (let i = start; i <= end; i++) {
			const num = i < 10 ? `0${i}` : i;
			const item = document.createElement('div');

			item.className = 'numbered-lines__numbers-item';
			item.textContent = num;

			numbers.push(item)
		}

		newNumLines.append(...numbers);

		if (numLines.textContent !== newNumLines.textContent) {
			numLines.replaceWith(newNumLines);
		}
	}
	
	function iterationNumLines () {

		const arrLines = [...numLines];
		
		/**
		 * Возвращает кол-во строк для каждого отдельного блока
		 * @return {Number} - кол-во строк
		 */
		const result = arrLines.map(item => {

			const linesNum = item.querySelector('.numbered-lines__numbers');
			const linesDescr = item.querySelector('.numbered-lines__descr');
			const lineHeightLines = lineHeight(linesDescr);
			const heightLines = linesDescr.offsetHeight;
			const rowСount = (heightLines / lineHeightLines);

			return Math.round(rowСount);
		});
		
		/**
		 * Суммирует общее кол-во строк на странице
		 */
		const sumRow = result.reduce((previousValue, item, index) => {
			const amount = previousValue + item;
			const linesDescr = arrLines[index].querySelector('.numbered-lines__descr');
			const linesNumbers = arrLines[index].querySelector('.numbered-lines__numbers');

			writeNum(Math.round((amount - item) + 1), Math.round(amount), linesNumbers);

			if (resizeObserver) resizeObserver.observe(linesDescr);

			return previousValue + item;
		}, 0);
	}
}

export { setNumberedLines };
