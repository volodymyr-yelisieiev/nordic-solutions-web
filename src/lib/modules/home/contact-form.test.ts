/// <reference types="bun-types" />

import { describe, expect, test } from 'bun:test';
import { validateContactForm } from './contact-form.ts';

describe('contact-form validation', () => {
	test('returns errors for required fields when empty', () => {
		const result = validateContactForm({
			name: '   ',
			email: '',
			organization: '',
			message: ''
		});

		expect(result.isValid).toBe(false);
		expect(result.errors).toEqual({
			name: 'Name is required.',
			email: 'Work email is required.',
			message: 'Brief message is required.'
		});
	});

	test('returns error for invalid work email format', () => {
		const result = validateContactForm({
			name: 'Nordic Contact',
			email: 'invalid-email',
			organization: 'Nordic Solutions',
			message: 'Need project support.'
		});

		expect(result.isValid).toBe(false);
		expect(result.errors.email).toBe('Enter a valid work email address.');
	});

	test('returns valid result and normalized values for valid payload', () => {
		const result = validateContactForm({
			name: '  Nordic Contact  ',
			email: '  hello@example.com  ',
			organization: '  Nordic Solutions  ',
			message: '  Scope and timeline details.  '
		});

		expect(result.isValid).toBe(true);
		expect(result.errors).toEqual({});
		expect(result.values).toEqual({
			name: 'Nordic Contact',
			email: 'hello@example.com',
			organization: 'Nordic Solutions',
			message: 'Scope and timeline details.'
		});
	});
});
