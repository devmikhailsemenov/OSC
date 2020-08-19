import Swiper from 'swiper';
import { useMediaQuery } from '@helpers/useMediaQuery';

const addActiveClassNDAIcon = box => box.classList.add('project-all__nda-img--active');

const allProjectSlider = () => {
	const slider = document.querySelector('.project-all__slider');

	if (!slider) return;

	let projectAllSlider = null;

	const initSlider = () => {
		if (projectAllSlider !== null) projectAllSlider.destroy(true, true);

		projectAllSlider = new Swiper('.project-all__slider', {
			navigation: {
				nextEl: '.project-all__btn-arrow.btn-arrow--right',
				prevEl: '.project-all__btn-arrow.btn-arrow--left',
			},
			simulateTouch: false,
			spaceBetween: 30,
			slidesPerView: 'auto',
			breakpoints: {
				991: {
					spaceBetween: 94,
					slidesPerView: 2
				}
			}
		});
	}

	const mediaQuerySliderUpdate = useMediaQuery('(min-width: 992px)', 'ALL');

	mediaQuerySliderUpdate(match => initSlider());


	const slides = [...document.querySelectorAll('.project-all__item')];

	const addActiveClassTab = next => {
		const activeTab = document.querySelector('.project-all__period--active');

		activeTab.classList.remove('project-all__period--active');
		next.classList.add('project-all__period--active');
	}

	const goToSlideCurrentPeriod = event => {
		const { target } = event;

		const periodTab = target.closest('.project-all__period');

		if (!periodTab) return;

		const periodTabID = periodTab.id;
		const currentPeriodSlide = document.querySelector(`[data-period="${periodTabID}"]`);
		const currentIndex = slides.indexOf(currentPeriodSlide);

		projectAllSlider.slideTo(currentIndex, 1000);
		addActiveClassTab(periodTab);
	}

	projectAllSlider.on('slideChange', event => {
		const activeSlide = slides[projectAllSlider.activeIndex];
		const dataPeriod = activeSlide.dataset.period;

		if (dataPeriod) {
			const periodTab = document.querySelector(`#${dataPeriod}`);

			addActiveClassTab(periodTab);
		}
	});

	document.addEventListener('click', goToSlideCurrentPeriod);
}

export { allProjectSlider, addActiveClassNDAIcon };
