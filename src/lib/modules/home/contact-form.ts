export type ContactFormValues = {
	name: string;
	email: string;
	organization: string;
	message: string;
};

export type ContactFormErrors = Partial<
	Record<'name' | 'email' | 'organization' | 'message', string>
>;

export type ContactFormValidationResult = {
	isValid: boolean;
	values: ContactFormValues;
	errors: ContactFormErrors;
};

const WORK_EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const normalizeValues = (values: ContactFormValues): ContactFormValues => ({
	name: values.name.trim(),
	email: values.email.trim(),
	organization: values.organization.trim(),
	message: values.message.trim()
});

export const validateContactForm = (input: ContactFormValues): ContactFormValidationResult => {
	const values = normalizeValues(input);
	const errors: ContactFormErrors = {};

	if (!values.name) {
		errors.name = 'Name is required.';
	}

	if (!values.email) {
		errors.email = 'Work email is required.';
	} else if (!WORK_EMAIL_PATTERN.test(values.email)) {
		errors.email = 'Enter a valid work email address.';
	}

	if (!values.message) {
		errors.message = 'Brief message is required.';
	}

	return {
		isValid: Object.keys(errors).length === 0,
		values,
		errors
	};
};
