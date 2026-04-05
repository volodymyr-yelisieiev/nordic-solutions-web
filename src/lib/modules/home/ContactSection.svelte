<script lang="ts">
	import { Button, Card, FormField, SectionShell, TextInput, Textarea } from '$lib/components/ui';
	import {
		type ContactFormErrors,
		type ContactFormValues,
		validateContactForm
	} from '$lib/modules/home/contact-form';
	import { revealOnView } from '$lib/modules/home/reveal-on-view';

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

<SectionShell
	id="contact"
	eyebrow="Contact"
	title="Start a focused conversation about your project context."
	description="Use direct contact details or send a short brief through the form below."
>
	<div
		class="contact-section__layout"
		style="--section-reveal-progress: 0"
		use:revealOnView={{ threshold: 0.15 }}
	>
		<div class="contact-section__panel">
			<Card as="section" variant="subtle" padding="lg" class="contact-section__details">
				<h3>Direct Contact</h3>
				<p>
					We usually begin with a compact discussion about scope, timeline expectations, and partner
					involvement model.
				</p>

				<ul class="contact-section__list">
					<li>
						<span class="contact-section__label">Email</span>
						<a href="mailto:hello@nordicsolutions.ae">hello@nordicsolutions.ae</a>
					</li>
					<li>
						<span class="contact-section__label">Phone</span>
						<a href="tel:+97120004900">+971 2 000 4900</a>
					</li>
					<li>
						<span class="contact-section__label">Location</span>
						<p>Abu Dhabi Global Market, Al Maryah Island, Abu Dhabi, UAE</p>
					</li>
				</ul>
			</Card>
		</div>

		<div class="contact-section__panel contact-section__panel--delayed">
			<Card as="section" variant="elevated" padding="lg" class="contact-section__form-wrap">
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
							aria-describedby={errors.name ? 'contact-name-hint' : undefined}
							oninput={(event) => handleFieldInput('name', event)}
						/>
					</FormField>

					<FormField
						inputId="contact-email"
						label="Work Email"
						helper="Use your corporate email for a faster reply."
						required={true}
						error={errors.email}
					>
						<TextInput
							id="contact-email"
							name="email"
							type="email"
							autocomplete="email"
							required
							value={values.email}
							invalid={Boolean(errors.email)}
							aria-describedby="contact-email-hint"
							oninput={(event) => handleFieldInput('email', event)}
						/>
					</FormField>

					<FormField
						inputId="contact-organization"
						label="Organization"
						error={errors.organization}
					>
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
						helper="Share scope, expected timeline, and key stakeholders."
						required={true}
						error={errors.message}
					>
						<Textarea
							id="contact-message"
							name="message"
							rows={4}
							required
							value={values.message}
							invalid={Boolean(errors.message)}
							aria-describedby="contact-message-hint"
							oninput={(event) => handleFieldInput('message', event)}
						></Textarea>
					</FormField>

					{#if Object.keys(errors).length > 0}
						<p class="contact-section__status contact-section__status--error" role="alert">
							Please review the highlighted fields and submit again.
						</p>
					{:else if submitStatus === 'success'}
						<p class="contact-section__status contact-section__status--success" role="status">
							Thank you. Your request has been sent successfully. We will respond within one
							business day.
						</p>
					{/if}

					<Button type="submit" size="lg" class="contact-section__submit">Send Request</Button>
				</form>
			</Card>
		</div>
	</div>
</SectionShell>

<style>
	.contact-section__layout {
		display: grid;
		grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
		gap: clamp(var(--space-6), 4vw, var(--space-12));
		align-items: start;
	}

	.contact-section__panel {
		opacity: var(--section-reveal-progress, 0);
		transform: translateY(calc((1 - var(--section-reveal-progress, 0)) * 0.75rem));
		transition:
			opacity 520ms var(--ease-emphasis),
			transform 520ms var(--ease-emphasis);
	}

	.contact-section__panel--delayed {
		transition-delay: 130ms;
	}

	:global(.contact-section__details) {
		height: 100%;
	}

	:global(.contact-section__details h3) {
		margin: 0;
		font-size: var(--font-size-h4);
	}

	:global(.contact-section__details p) {
		margin: 0;
		color: var(--color-text-muted);
	}

	.contact-section__list {
		margin: 0;
		padding: 0;
		list-style: none;
		display: grid;
		gap: var(--space-3);
	}

	.contact-section__list li {
		display: grid;
		gap: var(--space-1);
	}

	.contact-section__label {
		font-size: var(--font-size-kicker);
		font-weight: 700;
		text-transform: uppercase;
		letter-spacing: 0.08em;
		color: var(--color-text-muted);
	}

	.contact-section__list a {
		font-weight: 600;
		color: var(--color-text-primary);
		text-decoration: none;
		border-radius: var(--radius-sm);
		transition: color var(--duration-base) var(--ease-standard);
	}

	@media (hover: hover) {
		.contact-section__list a:hover {
			color: color-mix(in oklab, var(--color-accent) 84%, black);
		}
	}

	.contact-section__list a:focus-visible {
		outline: 2px solid var(--focus-ring-color);
		outline-offset: 2px;
		box-shadow: 0 0 0 4px var(--focus-ring-shadow);
	}

	.contact-section__list li p {
		font-size: var(--font-size-body-sm);
		line-height: 1.5;
		color: var(--color-text-primary);
	}

	:global(.contact-section__form-wrap) {
		height: 100%;
	}

	.contact-section__form {
		display: grid;
		gap: var(--space-4);
	}

	.contact-section__status {
		margin: 0;
		padding: var(--space-2) var(--space-3);
		border-radius: var(--radius-sm);
		font-size: var(--font-size-small);
		line-height: 1.45;
	}

	.contact-section__status--error {
		border: 1px solid color-mix(in oklab, var(--color-danger) 38%, var(--color-border-soft));
		background: color-mix(in oklab, var(--color-danger) 6%, var(--color-bg-elevated));
		color: color-mix(in oklab, var(--color-danger) 72%, var(--color-text-primary));
	}

	.contact-section__status--success {
		border: 1px solid color-mix(in oklab, var(--color-success) 32%, var(--color-border-soft));
		background: color-mix(in oklab, var(--color-success) 8%, var(--color-bg-elevated));
		color: color-mix(in oklab, var(--color-success) 74%, var(--color-text-primary));
	}

	:global(.contact-section__submit) {
		width: fit-content;
	}

	@media (max-width: 900px) {
		.contact-section__layout {
			grid-template-columns: 1fr;
		}

		:global(.contact-section__submit) {
			width: 100%;
		}
	}

	@media (max-width: 768px) {
		.contact-section__layout {
			gap: var(--space-6);
		}

		:global(.contact-section__details),
		:global(.contact-section__form-wrap) {
			padding: var(--space-4);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.contact-section__panel {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
</style>
