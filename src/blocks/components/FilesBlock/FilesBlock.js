import { useBytesToSize } from '@helpers/useBytesToSize';
import { smoothly } from '@helpers/smoothly';
import { helper } from '@helpers/helper';

/**
 * Добавление/удаление файлов.
 * @return {Object}
 */
const filesBlock = () => {
	let filesList = [];

	const maxFileSize = 5242880;
	const generateID = helper.generateID();
	
	/**
	 * В зависимости от передаваемого type добавляет/удаляет элемент.
	 * @param  {Object}   arr      - массив всех элементов
	 * @param  {Object}   value    - массив элементов добавленныx/удаленных в момент вызова функции
	 * @param  {String}   type     - ADD или REMOVE
	 * @param  {Function} callback
	 */
	const changeFilesList = (arr, value, type = 'ADD', callback) => {
		const prevArr = [...filesList];

		filesList = [...arr];

		for (const obj of value) {
			if (type === 'ADD') {
				addElemFile(obj);
			} else {
				removeElemFile(obj);
			}
		}

		if (typeof callback === 'function') {
			callback(arr, prevArr);
		}
	}
	
	/**
	 * Создает и возвращает элемент, который отображает загруженный файл.
	 * @param  {String} options.filename - имя файла
	 * @param  {String} options.format   - формат файла
	 * @param  {Number} options.size     - размер файла
	 * @param  {String} options.error    - текст ошибки
	 * @param  {String} options.id       - id
	 * @return {Object}                  - DOM-элемент
	 */
	const getTemplateFileItem = ({ filename, format, size, error, id }) => {
		const fileItem = document.createElement('li');

		const classes = error ? `files-block__item files-block__item--error` : 'files-block__item';
		const errorText = error ? `<span class='files-block__error'>${ error }</span>` : '';

		fileItem.className = `${classes} box-hidden`;
		fileItem.id = id;
		fileItem.insertAdjacentHTML(
			'beforeend',
			`
				<div class='files-block__item-content'>
					<div class='files-block__item-inner'>
						<span class='files-block__item-filename'>/${ filename }</span>
						<span class='files-block__item-format'>.${ format }</span>
						<span class='files-block__item-size'>(${ useBytesToSize(size) })</span>
						<span class='files-block__remove-btn' data-item-id='${id}'>
							<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
								<path fill="#000" fill-rule="evenodd" d="M9.157 8L16 14.843 14.842 16 8 9.157 1.157 16 0 14.843 6.842 8 0 1.157 1.157 0 8 6.843 14.842 0 16 1.157z"/>
							</svg>
						</span>
						${errorText}
					</div>
				</div>
			`
		)

		return fileItem;
	}

	/**
	 * Добавляет элемент на страницу
	 * @param  {Object} options.file
	 * @param  {String} options.id
	 * @param  {String} options.targetId - id родительского блока
	 * @param  {String} options.error
	 */
	const addElemFile = ({ file, id, targetId, error }) => {
		const filesListBlock = document.querySelector(`[data-files-id="${targetId}"]`);

		if (!filesListBlock) {
			throw new Error('addElemFile: Нет элемента с data-files-id')
		}

		const filesBlock = filesListBlock.closest('.files-block');

		if (!filesBlock.classList.contains('files-block--active')) {
			filesBlock.classList.add('files-block--active');
		}

		const nameArray = file.name.split('.');
		const filename = nameArray.slice(0, nameArray.length - 1).join('.');
		const format = nameArray[nameArray.length - 1];

		const fileItemElem = getTemplateFileItem({ filename, format, size: file.size, error, id });

		filesListBlock.append(fileItemElem);
		smoothly.slideIn(fileItemElem);
	}
	
	/**
	 * Удаляет элемент со страницы
	 * @param  {String}  options.id
	 * @param  {String}  options.targetId
	 * @param  {Boolean} options.animate
	 */
	const removeElemFile = ({ id, targetId, animate = true }) => {
		const fileItemElem = document.querySelector(`#${id}`);
		const fileItemContent = fileItemElem.querySelector('.files-block__item-content');

		fileItemContent.classList.add('files-block__item-content--hide');

		const removeFileItem = () => {
			fileItemElem.remove();

			const filesElem = filesList.find(elem => elem.targetId === targetId);

			if (filesElem === undefined) {
				const filesListBlock = document.querySelector(`[data-files-id="${targetId}"]`);
				const filesBlock = filesListBlock.closest('.files-block');

				filesBlock.classList.remove('files-block--active');
			}
		}

		if (animate) {
			smoothly.transitionEnd(fileItemContent, null, _ => {
				smoothly.slideOut(fileItemElem, _ => removeFileItem());
			})
		} else {
			removeFileItem();
		}
	}
	
	/**
	 * Создает объект с файлом и добавляет его в массив filesArr
	 * @param {Object} event
	 */
	const addHandler = event => {
		const { target } = event;
		const { files } = target;

		if (!target.classList.contains('files-block__input')) return;

		const filesArr = [];

		for (const file of [...files]) {
			let fileItem = { file, id: generateID(target.id), targetId: target.id };

			if (file.size > maxFileSize) {
				fileItem = {
					...fileItem,
					error: 'Недопустимый размер файла'
				}
			}

			filesArr.push(fileItem);
		}

		changeFilesList([...filesList, ...filesArr], filesArr, 'ADD');

		target.value = '';
	}
	
	/**
	 * Удаляет объект с файлом из массива 
	 * @param  {Object} event
	 */
	const removeHandler = event => {
		const { target } = event;

		const removeBtn = target.closest('.files-block__remove-btn');

		if (!removeBtn) return;

		const index = filesList.findIndex(element => element.id === removeBtn.dataset.itemId);
		const filesListCopy = [...filesList];
		const deleteArr = filesListCopy.splice(index, 1);

		changeFilesList(filesListCopy, deleteArr, 'REMOVE');
	}

	document.addEventListener('change', addHandler);
	document.addEventListener('click', removeHandler);

	return {
		/**
		 * Возвращает массив файлов, соответствующие передаваемому id, и 
		 * которые прошли валидацию(file.size <= maxFileSize),
		 * @param  {String} id
		 * @return {Object}
		 */
		getFiles: id => {
			const filterArr = filesList.filter(element => element.targetId === id && !element.error);

			return filterArr.map(element => element.file);
		},
		
		/**
		 * Удаляет все элменты с файлами из массива, соответствующие передаваемому id, и,
		 * соотвтетсвенно удаляются элементы со страницы(отображающие файл)
		 * @param  {String} id
		 */
		clearFiles: id => {
			const filesListCopy = [...filesList];

			const deleteArrFilter = filesList.filter(element => element.targetId === id);
			const deleteArr = deleteArrFilter.map(element => ({...element, animate: false}));

			for (let i = 0; i < filesListCopy.length; i++) {
				if (filesListCopy[i].targetId === id) {
					filesListCopy.splice(i, 1);
					i--;
				}
			}

			changeFilesList(filesListCopy, deleteArr, 'REMOVE');
		}
	}
}

export const loadedFiles = filesBlock();
