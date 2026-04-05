/// <reference types="bun-types" />

import { describe, expect, test } from 'bun:test';
import { homeNarrativeFlow, primaryNavigation } from './site-navigation';

describe('site-navigation module', () => {
	test('keeps required navigation order and shared config contract', () => {
		expect(primaryNavigation.map((item) => item.title)).toEqual([
			'Home',
			'About',
			'Services',
			'Approach',
			'Why Nordic',
			'Contact'
		]);

		expect(primaryNavigation.map((item) => item.href)).toEqual([
			'#hero',
			'#about',
			'#services',
			'#approach',
			'#why-nordic',
			'#contact'
		]);

		expect(primaryNavigation.every((item) => item.target === 'home-section')).toBe(true);

		expect(primaryNavigation.find((item) => item.isPrimary)?.title).toBe('Contact');
	});

	test('keeps home narrative flow in seven consecutive sections including presence', () => {
		expect(homeNarrativeFlow.map((step) => step.step)).toEqual([1, 2, 3, 4, 5, 6, 7]);
		expect(homeNarrativeFlow.map((step) => step.id)).toEqual([
			'hero',
			'about',
			'services',
			'approach',
			'why-nordic',
			'presence',
			'contact'
		]);
	});
});
