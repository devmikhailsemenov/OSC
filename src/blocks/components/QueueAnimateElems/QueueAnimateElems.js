import { smoothly } from '@helpers/smoothly';
import { useMediaQuery } from '@helpers/useMediaQuery';

const { transitionEnd } = smoothly;

/**
 * При попадании родительского элемента(селектор - selectorContainer) в область видимости окна,
 * дочерние элементы анимируются друг за другом(очередь) 
 * @param  {String} selectorContainer - селектор родительского элемента
 * @param  {String} selectorElems     - селектор дочерних элементов(которые впоследствии анимируются)
 * @return {Function}
 */
const queueAnimateElems = (
	selectorContainer = '.queue-animate-container',
	selectorElems = '.queue-animate-container__item'
)  => {
	const groupElems = [];
	
	/**
	 * Показывает все дочерние элементы, например, в каких-то ситуациях не нужно воспроизводить анимацию
	 * @param  {Object} parentGroup - родительский элемент(DOM-элемент)
	 */
	const showAllElems = parentGroup => {
		const elemsGroup = parentGroup.querySelectorAll(selectorElems);

		parentGroup.style.visibility = 'visible';

		if (elemsGroup.length === 0) return;

		elemsGroup.forEach(element => {
			if (!element.classList.contains('active')) {
				element.classList.add('active');
			}

			element.classList.add('no-transition');
		});
	}
	
	/**
	 * Например, если очередь нарушена, то есть первый блок который попал в область видимости окна
	 * не является первым по очереди при анимации, то showPreviousGroup показывает все элементы предыдущего блока
	 * без анимации
	 * @param  {Object} currentItem  - объект с текущей коллекцией элементов(дочерних) currentItem.elems, 
	 * попавших в область видимости окна
	 * @param  {Object} previousItem - объект с предыдущей коллекцией элементов(дочерних) previousItem.elems, 
	 * попавших в область видимости окна
	 * @return {Object} - если текущий и предыдущий элементы не связаны между собой, т.е.
	 * currentItem.elems[0].connective !== previousItem.elems[previousItem.elems.length - 1].elem.id,
	 * возвращается предыдущий элемент		   
	 */
	const showPreviousGroup = (currentItem, previousItem) => {
		const currentFirstConnective = currentItem.elems[0].connective;
		const prevLastElemID = previousItem ? previousItem.elems[previousItem.elems.length - 1].elem.id : undefined;

		if (currentFirstConnective !== prevLastElemID) {
			const lastElemPrevGroup = document.querySelector(`#${currentFirstConnective}`);

			if (lastElemPrevGroup) {
				const prevContainer = lastElemPrevGroup.closest(selectorContainer);

				showAllElems(prevContainer);
			}

			return previousItem;
		}
	}
	
	/**
	 * Медиазапросы при resize
	 * @param  {String} media - медиазапрос
	 * @return {Function}
	 */
	const setCompletedGroupByResize = media => {
		const callAnimateEelemsByResize = useMediaQuery(media, 'RESIZE-ONLY');

		return handler => callAnimateEelemsByResize(match => {
			if(!match) {
				handler();
			}
		});
	}
	
	/**
	 * Анимирует элементы друг за другом
	 * @param  {Object} elemsArr             - массив объектов со свойствами elem и connective 
	 * @param  {String} parentID             - id родительского блока
	 * @param  {Function} callbackGroupAnimate - вызывается тогда, когда заканчивается анимация у последнего в группе элемента
	 */
	const setAnimateElems = (elemsArr, parentID, callbackGroupAnimate) => {
		elemsArr[0].elem.classList.add('active');

		elemsArr.forEach(element => {

			transitionEnd(element.elem, null, _ => {
				const connectiveElems = elemsArr.filter(el => element.elem.id === el.connective);

				if (connectiveElems.length > 0) {
					connectiveElems.forEach(conElem => {
						conElem.elem.classList.add('active');
					})
				} else {
					if (typeof callbackGroupAnimate === 'function') {
						callbackGroupAnimate(parentID);
					}
				}
			})
		});
	};
	
	/**
	 * Возвращает Promise
	 * @param  {Object} arr      - массив объектов со свойствами elem и connective 
	 * @param  {String} parentID - id родительского блока
	 * @return {Promise}          [description]
	 */
	const groupAnimateElemsPromise = (arr, parentID) => (
		new Promise(resolve => setAnimateElems(arr, parentID, id => resolve(id)))
	);
	
	/**
	 * @param  {Object} options.elems       
	 * @param  {Object} options.parentGroup
	 * @param  {String} options.media
	 */
	const callAnimateGroupElems = ({ elems, parentGroup, media }) => {
		const lastItem = groupElems[groupElems.length - 1];
		const previousItem = lastItem ? {...lastItem} : undefined;
		const currentItem = {
			elems, 
			parentID: parentGroup.id,
			callAnimateThisGroup: (() => {
				
				// Если groupElems пустой или последний элемент массива previousItem 
				// со свойством completed: true, тогда анимируется текущая группа элементов elems;
				if (previousItem === undefined || previousItem.completed) {
					return groupAnimateElemsPromise(elems, parentGroup.id);
				// иначе дожидаемся когда анимируется вся предудыщая группа элементов, и воспроизводим 
				// анимацию текущей группы элементов
				} else {
					return new Promise(resolve => {
						previousItem.callAnimateThisGroup.then(parentID => {

							const completedIndex = groupElems.findIndex(element => element.parentID === parentID);
							const completedElem = groupElems[completedIndex];
							const nextCompleted = groupElems[completedIndex + 1];

							if (completedElem) completedElem.completed = true;

							if (nextCompleted) {
								return groupAnimateElemsPromise(
									nextCompleted.elems, 
									nextCompleted.parentID
								).then(_ => resolve(nextCompleted.parentID));
							}
						})
					})
				}

			})()
		}

		groupElems.push(currentItem);

		const previousGroup = showPreviousGroup(currentItem, previousItem);

		if (previousGroup) currentItem.completed = true;

		setCompletedGroupByResize(media)(() => {
			if (!currentItem.completed) {
				currentItem.completed = true;
			}

			showAllElems(parentGroup);
		})
	}

	return ({ elems, parentGroup, media }) => {
		const callAnimateElemsByLoad = useMediaQuery(media, 'LOAD-ONLY');

		callAnimateElemsByLoad(match => {
			if (match) {
				callAnimateGroupElems({ elems, parentGroup, media });
			}
		});
	}
}

export { queueAnimateElems };