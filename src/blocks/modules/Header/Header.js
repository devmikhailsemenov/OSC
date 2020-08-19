import { bodyActions } from '@helpers/bodyActions';
import { useMediaQuery } from '@helpers/useMediaQuery';

/**
 * Добавление/удаление активного класса у header
 */
const headerActions = () => {
	const header = document.querySelector('.header');

	if (!header) return;

	let headerActive = false;

	const addHeaderActive = () => {
		const headerHeight = header.offsetHeight;

		header.classList.add('header--active');
		bodyActions.hidden();
		document.body.style.paddingTop = `${headerHeight}px`;
		document.body.classList.add('body_fix-bg');

		headerActive = true;
	}

	const removeHeaderActive = () => {
		header.classList.remove('header--active');
		bodyActions.scroll();
		document.body.style.paddingTop = '';
		document.body.classList.remove('body_fix-bg');

		headerActive = false;
	}

	const headerToggleActive = event => {
		if (!event.target.classList.contains('header__btn-menu-open')) return;

		if (headerActive) {
			removeHeaderActive();
		} else {
			addHeaderActive();
		}
	}

	const mediaQueryHandler = useMediaQuery('(min-width: 992px)', 'ALL');

	mediaQueryHandler(match => {
		if (match) {
			if (headerActive) {
				removeHeaderActive();
			}
		}
	})

	header.addEventListener('click', headerToggleActive);
}

export { headerActions };