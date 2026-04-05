<script lang="ts">
	import { Button, Card, FormField, SectionShell, TextInput, Textarea } from '$lib/components/ui';

	const handleSubmit = (event: SubmitEvent) => {
		event.preventDefault();
	};
</script>

<SectionShell
	id="contact"
	eyebrow="Contact"
	title="Start a focused conversation about your project context."
	description="Use direct contact details or send a short brief through the form below."
>
	<div class="contact-section__layout">
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

		<Card as="section" variant="elevated" padding="lg" class="contact-section__form-wrap">
			<form class="contact-section__form" onsubmit={handleSubmit}>
				<FormField inputId="contact-name" label="Name" required={true}>
					<TextInput id="contact-name" name="name" type="text" autocomplete="name" required />
				</FormField>

				<FormField
					inputId="contact-email"
					label="Work Email"
					helper="Use your corporate email for a faster reply."
					required={true}
				>
					<TextInput id="contact-email" name="email" type="email" autocomplete="email" required />
				</FormField>

				<FormField inputId="contact-organization" label="Organization">
					<TextInput
						id="contact-organization"
						name="organization"
						type="text"
						autocomplete="organization"
					/>
				</FormField>

				<FormField
					inputId="contact-message"
					label="Brief Message"
					helper="Share scope, expected timeline, and key stakeholders."
					required={true}
				>
					<Textarea id="contact-message" name="message" rows={4} required></Textarea>
				</FormField>

				<Button type="submit" size="lg" class="contact-section__submit">Send Request</Button>
			</form>
		</Card>
	</div>
</SectionShell>

<style>
	.contact-section__layout {
		display: grid;
		grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
		gap: clamp(var(--space-6), 4vw, var(--space-12));
		align-items: start;
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
</style>
