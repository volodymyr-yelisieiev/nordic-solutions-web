<script lang="ts">
	import { Button, FormField, TextInput, Textarea } from '$lib/components/ui';
	import { contactDetails } from '$lib/modules/home/content';
	import {
		type ContactFormErrors,
		type ContactFormValues,
		validateContactForm
	} from '$lib/modules/home/contact-form';

	const defaultValues: ContactFormValues = {
		name: '',
		email: '',
		organization: '',
		message: ''
	};

	const requiredFieldOrder: Array<keyof ContactFormValues> = ['name', 'email', 'message'];

	let values = $state<ContactFormValues>({ ...defaultValues });
	let errors = $state<ContactFormErrors>({});
	let submitStatus = $state<'idle' | 'success'>('idle');

	const clearFieldError = (field: keyof ContactFormValues) => {
		if (!errors[field]) {
			return;
		}

		const nextErrors = { ...errors };
		delete nextErrors[field];
		errors = nextErrors;
	};

	const handleFieldInput = (field: keyof ContactFormValues, event: Event) => {
		const target = event.currentTarget;

		if (!(target instanceof HTMLInputElement) && !(target instanceof HTMLTextAreaElement)) {
			return;
		}

		values = {
			...values,
			[field]: target.value
		};

		clearFieldError(field);
		submitStatus = 'idle';
	};

	const focusFirstError = (validationErrors: ContactFormErrors) => {
		const firstInvalidField = requiredFieldOrder.find((field) => Boolean(validationErrors[field]));

		if (!firstInvalidField) {
			return;
		}

		const input = document.getElementById(`contact-${firstInvalidField}`);

		if (input instanceof HTMLElement) {
			input.focus();
		}
	};

	const handleSubmit = (event: SubmitEvent) => {
		event.preventDefault();

		const result = validateContactForm(values);
		values = result.values;
		errors = result.errors;

		if (!result.isValid) {
			submitStatus = 'idle';
			focusFirstError(result.errors);
			return;
		}

		errors = {};
		submitStatus = 'success';
		values = { ...defaultValues };
	};
</script>

<section id="contact" class="contact-section">
	<div class="contact-section__frame reveal-stagger" style="--section-reveal-progress: 1">
		<div class="contact-section__intro">
			<p class="contact-section__eyebrow">Contact</p>
			<h2>Start with the brief, the timeline, and the partner shape you need.</h2>
			<p>
				Share the operational need, the intended timeline, and the kind of industrial or technical
				support you are evaluating. Nordic Solutions can then respond with the right next step.
			</p>

			<ul class="contact-section__details">
				<li>
					<span>Email</span>
					<a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>
				</li>
				<li>
					<span>Phone</span>
					<a href={`tel:${contactDetails.phone}`}>{contactDetails.phone}</a>
				</li>
				<li>
					<span>Address</span>
					<p>{contactDetails.addressLine1}<br />{contactDetails.addressLine2}</p>
				</li>
			</ul>
		</div>

		<div class="contact-section__form-wrap">
			<form class="contact-section__form" onsubmit={handleSubmit} novalidate>
				<FormField inputId="contact-name" label="Name" required={true} error={errors.name}>
					<TextInput
						id="contact-name"
						name="name"
						type="text"
						autocomplete="name"
						required
						value={values.name}
						invalid={Boolean(errors.name)}
						oninput={(event) => handleFieldInput('name', event)}
					/>
				</FormField>

				<FormField inputId="contact-email" label="Work Email" required={true} error={errors.email}>
					<TextInput
						id="contact-email"
						name="email"
						type="email"
						autocomplete="email"
						required
						value={values.email}
						invalid={Boolean(errors.email)}
						oninput={(event) => handleFieldInput('email', event)}
					/>
				</FormField>

				<FormField inputId="contact-organization" label="Organization" error={errors.organization}>
					<TextInput
						id="contact-organization"
						name="organization"
						type="text"
						autocomplete="organization"
						value={values.organization}
						invalid={Boolean(errors.organization)}
						oninput={(event) => handleFieldInput('organization', event)}
					/>
				</FormField>

				<FormField
					inputId="contact-message"
					label="Brief Message"
					required={true}
					error={errors.message}
				>
					<Textarea
						id="contact-message"
						name="message"
						rows={5}
						required
						value={values.message}
						invalid={Boolean(errors.message)}
						oninput={(event) => handleFieldInput('message', event)}
					></Textarea>
				</FormField>

				{#if Object.keys(errors).length > 0}
					<p class="contact-section__status contact-section__status--error" role="alert">
						Please review the highlighted fields and submit again.
					</p>
				{:else if submitStatus === 'success'}
					<p class="contact-section__status contact-section__status--success" role="status">
						Thank you. Your request has been prepared successfully.
					</p>
				{/if}

				<Button type="submit" size="lg">Send Request</Button>
			</form>
		</div>
	</div>
</section>

<style>
	.contact-section {
		padding-top: 1.5rem;
	}

	.contact-section__frame {
		display: grid;
		grid-template-columns: minmax(0, 0.88fr) minmax(0, 1.12fr);
		gap: clamp(1.5rem, 4vw, 3rem);
		padding: clamp(1.5rem, 4vw, 3rem);
		border-radius: 3rem;
		background:
			radial-gradient(circle at top right, rgb(243 115 56 / 0.14), transparent 30%),
			var(--color-dark-surface);
		color: var(--color-bg-canvas);
		box-shadow: var(--shadow-lg);
	}

	.contact-section__intro {
		display: grid;
		align-content: start;
		gap: 1rem;
	}

	.contact-section__eyebrow {
		margin: 0;
		font-size: var(--font-size-kicker);
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: rgb(243 240 238 / 0.54);
	}

	.contact-section__intro h2,
	.contact-section__details a {
		color: var(--color-bg-canvas);
	}

	.contact-section__intro > p {
		color: rgb(243 240 238 / 0.7);
	}

	.contact-section__details {
		display: grid;
		gap: 1rem;
		margin: 0.4rem 0 0;
		padding: 0;
		list-style: none;
	}

	.contact-section__details li {
		padding: 1rem 1.1rem;
		border-radius: 1.4rem;
		background: rgb(255 255 255 / 0.07);
	}

	.contact-section__details span {
		display: block;
		margin-bottom: 0.35rem;
		font-size: 0.76rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: rgb(243 240 238 / 0.52);
	}

	.contact-section__details p {
		color: rgb(243 240 238 / 0.78);
	}

	.contact-section__form-wrap {
		padding: 1.25rem;
		border-radius: 2rem;
		background: rgb(255 255 255 / 0.88);
	}

	.contact-section__form {
		display: grid;
		gap: 1rem;
	}

	.contact-section__status {
		padding: 0.85rem 1rem;
		border-radius: 1rem;
		font-size: 0.92rem;
	}

	.contact-section__status--error {
		background: color-mix(in srgb, var(--color-danger) 10%, white);
		color: var(--color-danger);
	}

	.contact-section__status--success {
		background: color-mix(in srgb, var(--color-success) 10%, white);
		color: var(--color-success);
	}

	@media (max-width: 900px) {
		.contact-section__frame {
			grid-template-columns: 1fr;
			padding: 1.5rem;
			border-radius: 2rem;
		}

		.contact-section__form-wrap {
			padding: 1rem;
		}
	}
</style>
