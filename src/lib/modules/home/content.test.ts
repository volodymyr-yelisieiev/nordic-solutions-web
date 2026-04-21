/// <reference types="bun-types" />

import { describe, expect, test } from 'bun:test';
import {
	aboutSpotlights,
	contactDetails,
	heroSlides,
	serviceHighlights,
	valuePillars,
	whyChooseNordic
} from './content';

describe('home content', () => {
	test('uses generated art variants across editorial sections', () => {
		expect(heroSlides.map((slide) => slide.art)).toEqual([
			'hero-network',
			'hero-transfer',
			'hero-governance'
		]);
		expect(aboutSpotlights.every((item) => item.art.startsWith('about-'))).toBe(true);
		expect(serviceHighlights.every((item) => item.art.startsWith('service-'))).toBe(true);
		expect(whyChooseNordic.every((item) => item.art.startsWith('why-'))).toBe(true);
	});

	test('keeps verified business contact details from the legacy site', () => {
		expect(contactDetails.email).toBe('info@nordicsolutions.ae');
		expect(contactDetails.phone).toBe('+971503160500');
		expect(contactDetails.addressLine1).toBe('Tawazun Industrial Park, Abu Dhabi, UAE');
		expect(contactDetails.addressLine2).toBe('P.O. Box: 3640');
	});

	test('keeps the core value and proof-point sections fully populated', () => {
		expect(valuePillars).toHaveLength(6);
		expect(serviceHighlights).toHaveLength(4);
		expect(whyChooseNordic).toHaveLength(6);
	});
});
