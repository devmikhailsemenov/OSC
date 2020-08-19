import { bodyActions } from '@helpers/bodyActions';

const { animate } = bodyActions;

const btnToTop = document.querySelector('.btn-to-top');
const y = 500;

const scrollBodyToTop = () => {
	animate({
		from: window.pageYOffset,
		to: 0,
		duration: 1000
	})
}

const btnToTopScroll = event => {
	if (!btnToTop) return;

	if (window.pageYOffset > y) {
		btnToTop.classList.add('btn-to-top--show');
	} else {
		btnToTop.classList.remove('btn-to-top--show');
	}
}

btnToTop.addEventListener('click', scrollBodyToTop);

export { btnToTopScroll };
