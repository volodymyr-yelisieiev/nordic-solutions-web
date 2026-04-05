/// <reference types="bun-types" />

import { describe, expect, test } from 'bun:test';
import { homeNarrativeFlow, primaryNavigation } from './site-navigation';

describe('site-navigation module', () => {
	test('keeps required route order for primary navigation', () => {
		expect(primaryNavigation.map((item) => item.path)).toEqual([
			'/',
			'/about',
			'/services',
			'/approach',
			'/why-nordic',
			'/contact'
		]);
	});

	test('keeps home narrative flow in six consecutive steps', () => {
		expect(homeNarrativeFlow.map((step) => step.step)).toEqual([1, 2, 3, 4, 5, 6]);
		expect(homeNarrativeFlow.map((step) => step.path)).toEqual([
			'/',
			'/about',
			'/services',
			'/approach',
			'/why-nordic',
			'/contact'
		]);
	});
});
