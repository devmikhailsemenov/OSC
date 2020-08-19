import '@helpers/detectBadBrowser.js';
import WOW from 'wow.js/dist/wow.js';
import { bodyActions } from '@helpers/bodyActions.js';
import { mainFormActions } from '@components/MainForm/MainForm';
import { preloaderAction } from '@components/Preloader/Preloader.js'
import { setActiveNavLink } from '@components/Navbar/Navbar';
import { setNumberedLines } from '@components/NumberedLines/NumberedLines';
import { selectedWordsTitle } from '@components/SectionTitle/SectionTitle';
import { pointsComputerIconAnimate } from '@components/PointsComputerIcon/PointsComputerIcon';
import { btnToTopScroll } from '@components/BtnToTop/BtnToTop';
import { animateLineText } from '@components/animateLineText/animateLineText';
import { headerActions } from '@modules/Header/Header';
import { aboutCompanyGroupAnimate } from '@modules/AboutCompanyGroup/AboutCompanyGroup';
import { allProjectSlider, addActiveClassNDAIcon } from '@modules/ProjectAll/ProjectAll';

document.addEventListener('DOMContentLoaded', () => {
	const bodyHiddenInit = bodyActions.hidden();
	const headerActionsInit = headerActions();
	const setActiveNavLinkInit = setActiveNavLink();
	const setNumberedLinesInit = setNumberedLines();
	const mainFormActionsInit = mainFormActions();
	const allProjectSliderInit = allProjectSlider();

	const wow = new WOW({
		callback: box => {
			if (box.classList.contains('queue-animate-container')) {
				aboutCompanyGroupAnimate(box);
			}

			if (box.classList.contains('animate-line-text')) {
				animateLineText(box);
			}

			if (box.classList.contains('section-title')) {
				selectedWordsTitle(box);
			}

			if (box.classList.contains('project-all__nda-img')) {
				addActiveClassNDAIcon(box);
			}
		}
	});

	window.addEventListener('load', () => {

		const preloaderClose = () => {
			const preloader = document.querySelector('.preloader-page');
			const pointIcon = preloader.querySelector('.points-computer-icon');

			const preloaderCallback = () => {
				wow.init();
				bodyActions.scroll();
				preloader.remove();
				pointsComputerIconAnimate.endAnimate(pointIcon);
			};

			preloaderAction(preloader, 'smoothly-show', preloaderCallback);
		}

		preloaderClose();

	});

	document.addEventListener('scroll', event => {
		btnToTopScroll(event);
	});
});