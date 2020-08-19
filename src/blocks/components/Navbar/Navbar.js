const setActiveNavLink = () => {
	const navLinks = document.querySelectorAll('.navbar__link');

	if (navLinks.length === 0) return;

	for (const link of navLinks) {
		if (link.href === window.location.href) {
			link.classList.add('navbar__link--active');
		}
	}
}

export { setActiveNavLink };
