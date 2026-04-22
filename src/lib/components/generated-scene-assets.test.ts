/// <reference types="bun-types" />

import { describe, expect, test } from 'bun:test';
import { generatedSceneAssets } from './generated-scene-assets';

describe('generated scene assets', () => {
	test('maps every generated scene variant to a real image asset', () => {
		expect(Object.keys(generatedSceneAssets)).toEqual([
			'hero-network',
			'hero-transfer',
			'hero-governance',
			'about-region',
			'about-expertise',
			'service-transfer',
			'service-partnerships',
			'service-imports',
			'service-export',
			'why-capability',
			'why-market',
			'why-consulting',
			'why-liability',
			'why-management',
			'why-projects',
			'presence-hub',
			'route-about',
			'route-services',
			'route-approach',
			'route-why',
			'route-contact'
		]);

		expect(Object.values(generatedSceneAssets).every((asset) => asset.src.startsWith('/images/generated-scenes/'))).toBe(
			true
		);
	});
});
