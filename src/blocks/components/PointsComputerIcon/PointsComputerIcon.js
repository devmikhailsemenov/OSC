/**
 * Рекурсивное добавление/удаление точек в svg с классом 'points-computer-icon' (см. прелоадер)
 * @param  {Object} pointsCollection - коллекция 'точек'
 * @return {Object} 
 */
const pointsAnimate = pointsCollection => {
	let timeout = null;
	let currentAnimate = null;
	let currentIndex = 0;
	
	/**
	 * Показывает передаваемый elem рекурсивно через определенный промежуток времени (setTimeout)
	 * @param  {Object} elem
	 */
	const recursionAnimatePointSet = elem => {
		if (currentAnimate === false) return;

		const index = pointsCollection.indexOf(elem);

		currentIndex = index;

		elem.style.display = 'block';

		if (elem !== pointsCollection[pointsCollection.length - 1]) {
			timeout = setTimeout(() => recursionAnimatePointSet(pointsCollection[index + 1]), 150)
		} else {
			clearTimeout(timeout);
			recursionAnimatePointRemove(elem);

			return;
		}
	}
	/**
	 * Удаляет передаваемый elem рекурсивно через определенный промежуток времени (setTimeout)
	 * @param  {Object} elem
	 */
	const recursionAnimatePointRemove = elem => {
		if (currentAnimate === false) return;

		const index = pointsCollection.indexOf(elem);

		currentIndex = index;

		elem.style.display = 'none';

		if (elem !== pointsCollection[0]) {
			timeout = setTimeout(() => recursionAnimatePointRemove(pointsCollection[index - 1]), 150)
		} else {
			clearTimeout(timeout);
			recursionAnimatePointSet(elem);

			return;
		}
	}

	return {
		start(animate) {
			currentAnimate = animate;

			recursionAnimatePointSet(pointsCollection[currentIndex]);
		},

		end(animate) {
			currentAnimate = animate;
		},

		getIndexCurrentPoint() {
			return currentIndex;
		}
	}
}

const pointsComputerIcon = () => {
	const pointsContainer = [...document.querySelectorAll('.points-computer-icon')];

	if (pointsContainer.length === 0) return;

	const pointsContainerArr = pointsContainer.map(element => (
		{
			element,
			index: 0,
			animate: null,

			startAnimate() {
				this.animate = true;
			},

			endAnimate() {
				this.animate = false;
			}
		}
	));

	const startAnimate = elem => {
		const currentPointsItem = pointsContainerArr.find(item => item.element === elem);

		currentPointsItem.startAnimate();
	}

	const endAnimate = elem => {
		const currentPointsItem = pointsContainerArr.find(item => item.element === elem);

		currentPointsItem.endAnimate();
	}

	for (let i = 0; i < pointsContainerArr.length; i++) {
		const pointsItem = pointsContainerArr[i];
		const pointsCollection = [...pointsItem.element.querySelectorAll('.point')];

		const pointsAnimateSettings = pointsAnimate(pointsCollection);

		Object.defineProperty(pointsItem, 'animate', {
			set(value) {
				if (value === false) {

					pointsAnimateSettings.end(value);

					pointsItem.index = pointsAnimateSettings.getIndexCurrentPoint();

				} else {

					pointsAnimateSettings.start(value);

					pointsItem.index = pointsAnimateSettings.getIndexCurrentPoint();

				}

				this._animate = value;
			}
		});

		startAnimate(pointsContainerArr[i].element);
	}

	return { startAnimate, endAnimate }
}

export const pointsComputerIconAnimate = pointsComputerIcon();
