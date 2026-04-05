export type RevealOnViewOptions = {
	threshold?: number;
	rootMargin?: string;
	once?: boolean;
};

const defaultOptions: Required<RevealOnViewOptions> = {
	threshold: 0.2,
	rootMargin: '0px 0px -10% 0px',
	once: true
};

const setRevealedState = (node: HTMLElement, isRevealed: boolean) => {
	node.dataset.revealed = isRevealed ? 'true' : 'false';
	node.style.setProperty('--section-reveal-progress', isRevealed ? '1' : '0');
};

const shouldReduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const revealOnView = (node: HTMLElement, options: RevealOnViewOptions = {}) => {
	let observer: IntersectionObserver | null = null;
	let currentOptions: Required<RevealOnViewOptions> = { ...defaultOptions, ...options };

	const initializeObserver = () => {
		observer?.disconnect();

		if (typeof window === 'undefined' || shouldReduceMotion()) {
			setRevealedState(node, true);
			return;
		}

		setRevealedState(node, false);

		observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						setRevealedState(node, true);
						if (currentOptions.once) {
							observer?.unobserve(node);
						}
						return;
					}

					if (!currentOptions.once) {
						setRevealedState(node, false);
					}
				});
			},
			{
				threshold: currentOptions.threshold,
				rootMargin: currentOptions.rootMargin
			}
		);

		observer.observe(node);
	};

	initializeObserver();

	return {
		update(nextOptions: RevealOnViewOptions) {
			currentOptions = { ...defaultOptions, ...nextOptions };
			initializeObserver();
		},
		destroy() {
			observer?.disconnect();
		}
	};
};
