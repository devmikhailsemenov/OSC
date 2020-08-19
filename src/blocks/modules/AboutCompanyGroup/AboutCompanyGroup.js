import { queueAnimateElems } from '@components/QueueAnimateElems/QueueAnimateElems';

const queueAnimate = queueAnimateElems('.queue-animate-container', '.queue-animate-container__item');

const callQueueAnimateForGroupElems = (box, media, { aboutUsArr, servicesArr, ttArr, ddArr }) => {
	switch (box.id) {
		case 'about-us-animate-wrap':
			queueAnimate({ elems: aboutUsArr, parentGroup: box, media });

			return false;

		case 'services-animate-wrap':
			queueAnimate({ elems: servicesArr, parentGroup: box, media });

			return false;

		default:
			return false;
	}
}

const aboutCompanyGroupAnimate = box => {
	const mobile = callQueueAnimateForGroupElems(box, '(max-width: 767px)', {
		aboutUsArr: [
			{ elem: box.querySelector('#about-us-animate-1') },
			{ elem: box.querySelector('#about-us-animate-2'), connective: 'about-us-animate-1' },
			{ elem: box.querySelector('#about-us-animate-3'), connective: 'about-us-animate-2' },
			{ elem: box.querySelector('#about-us-animate-4'), connective: 'about-us-animate-3' },
			{ elem: box.querySelector('#about-us-animate-5'), connective: 'about-us-animate-4' },
			{ elem: box.querySelector('#about-us-animate-15'), connective: 'about-us-animate-5' },
			{ elem: box.querySelector('#about-us-animate-9'), connective: 'about-us-animate-15' },
			{ elem: box.querySelector('#about-us-animate-18'), connective: 'about-us-animate-9' },
			{ elem: box.querySelector('#about-us-animate-13'), connective: 'about-us-animate-18' },
			{ elem: box.querySelector('#about-us-animate-14'), connective: 'about-us-animate-13' },
			{ elem: box.querySelector('#about-us-animate-16'), connective: 'about-us-animate-14' },
			{ elem: box.querySelector('#about-us-animate-17'), connective: 'about-us-animate-16' },
		],
		servicesArr: [
			{ elem: box.querySelector('#services-animate-1'), connective: 'about-us-animate-17' },
			{ elem: box.querySelector('#services-animate-2'), connective: 'services-animate-1' },
			{ elem: box.querySelector('#services-animate-3'), connective: 'services-animate-2' },
			{ elem: box.querySelector('#services-animate-8'), connective: 'services-animate-3' }
		]
	});

	const tablet = callQueueAnimateForGroupElems(box, '(min-width: 768px) and (max-width: 991px)', {
		aboutUsArr: [
			{ elem: box.querySelector('#about-us-animate-1') },
			{ elem: box.querySelector('#about-us-animate-2'), connective: 'about-us-animate-1' },
			{ elem: box.querySelector('#about-us-animate-3'), connective: 'about-us-animate-2' },
			{ elem: box.querySelector('#about-us-animate-4'), connective: 'about-us-animate-3' },
			{ elem: box.querySelector('#about-us-animate-5'), connective: 'about-us-animate-4' },
			{ elem: box.querySelector('#about-us-animate-9'), connective: 'about-us-animate-5' },
			{ elem: box.querySelector('#about-us-animate-18'), connective: 'about-us-animate-9' },
			{ elem: box.querySelector('#about-us-animate-13'), connective: 'about-us-animate-18' },
			{ elem: box.querySelector('#about-us-animate-14'), connective: 'about-us-animate-13' }
		],
		servicesArr: [
			{ elem: box.querySelector('#services-animate-1'), connective: 'about-us-animate-14' },
			{ elem: box.querySelector('#services-animate-2'), connective: 'services-animate-1' },
			{ elem: box.querySelector('#services-animate-3'), connective: 'services-animate-2' },
			{ elem: box.querySelector('#services-animate-8'), connective: 'services-animate-3' }
		]
	});

	const desktopSm = callQueueAnimateForGroupElems(box, '(min-width: 992px) and (max-width: 1199px)', {
		aboutUsArr: [
			{ elem: box.querySelector('#about-us-animate-1') },
			{ elem: box.querySelector('#about-us-animate-2'), connective: 'about-us-animate-1' },
			{ elem: box.querySelector('#about-us-animate-3'), connective: 'about-us-animate-2' },
			{ elem: box.querySelector('#about-us-animate-4'), connective: 'about-us-animate-3' },
			{ elem: box.querySelector('#about-us-animate-5'), connective: 'about-us-animate-4' },
			{ elem: box.querySelector('#about-us-animate-6'), connective: 'about-us-animate-5' },
			{ elem: box.querySelector('#about-us-animate-7'), connective: 'about-us-animate-6' },
			{ elem: box.querySelector('#about-us-animate-8'), connective: 'about-us-animate-7' },
			{ elem: box.querySelector('#about-us-animate-9'), connective: 'about-us-animate-8' },
			{ elem: box.querySelector('#about-us-animate-18'), connective: 'about-us-animate-9' },
			{ elem: box.querySelector('#about-us-animate-13'), connective: 'about-us-animate-18' },
			{ elem: box.querySelector('#about-us-animate-14'), connective: 'about-us-animate-13' }
		],
		servicesArr: [
			{ elem: box.querySelector('#services-animate-1'), connective: 'about-us-animate-14' },
			{ elem: box.querySelector('#services-animate-2'), connective: 'services-animate-1' },
			{ elem: box.querySelector('#services-animate-3'), connective: 'services-animate-2' },
			{ elem: box.querySelector('#services-animate-7'), connective: 'services-animate-3' },
			{ elem: box.querySelector('#services-animate-4'), connective: 'services-animate-7' },
			{ elem: box.querySelector('#services-animate-5'), connective: 'services-animate-4' },
			{ elem: box.querySelector('#services-animate-6'), connective: 'services-animate-5' },
			{ elem: box.querySelector('#services-animate-8'), connective: 'services-animate-6' }
		]
	});

	const desktopXl = callQueueAnimateForGroupElems(box, '(min-width: 1200px)', {
		aboutUsArr: [
			{ elem: box.querySelector('#about-us-animate-1') },
			{ elem: box.querySelector('#about-us-animate-2'), connective: 'about-us-animate-1' },
			{ elem: box.querySelector('#about-us-animate-3'), connective: 'about-us-animate-2' },
			{ elem: box.querySelector('#about-us-animate-4'), connective: 'about-us-animate-3' },
			{ elem: box.querySelector('#about-us-animate-5'), connective: 'about-us-animate-4' },
			{ elem: box.querySelector('#about-us-animate-6'), connective: 'about-us-animate-5' },
			{ elem: box.querySelector('#about-us-animate-7'), connective: 'about-us-animate-6' },
			{ elem: box.querySelector('#about-us-animate-8'), connective: 'about-us-animate-7' },
			{ elem: box.querySelector('#about-us-animate-9'), connective: 'about-us-animate-8' },
			{ elem: box.querySelector('#about-us-animate-10'), connective: 'about-us-animate-9' },
			{ elem: box.querySelector('#about-us-animate-11'), connective: 'about-us-animate-10' },
			{ elem: box.querySelector('#about-us-animate-12'), connective: 'about-us-animate-11' },
			{ elem: box.querySelector('#about-us-animate-13'), connective: 'about-us-animate-12' },
			{ elem: box.querySelector('#about-us-animate-14'), connective: 'about-us-animate-13' }
		],
		servicesArr: [
			{ elem: box.querySelector('#services-animate-1'), connective: 'about-us-animate-14' },
			{ elem: box.querySelector('#services-animate-2'), connective: 'services-animate-1' },
			{ elem: box.querySelector('#services-animate-3'), connective: 'services-animate-2' },
			{ elem: box.querySelector('#services-animate-7'), connective: 'services-animate-3' },
			{ elem: box.querySelector('#services-animate-4'), connective: 'services-animate-7' },
			{ elem: box.querySelector('#services-animate-5'), connective: 'services-animate-4' },
			{ elem: box.querySelector('#services-animate-6'), connective: 'services-animate-5' },
			{ elem: box.querySelector('#services-animate-8'), connective: 'services-animate-6' }
		]
	});
}



export { aboutCompanyGroupAnimate };
