<script lang="ts">
	import SectionShell from '$lib/components/SectionShell.svelte';

	const handleSubmit = (event: SubmitEvent) => {
		event.preventDefault();
	};
</script>

<SectionShell
	id="contact"
	eyebrow="Contact"
	title="Start a focused conversation about your project context."
	content="Use direct contact details or send a short brief through the form below."
>
	<div class="contact-section__layout">
		<section class="contact-section__details" aria-label="Direct contact details">
			<h3>Direct Contact</h3>
			<p>
				We usually begin with a compact discussion about scope, timeline expectations, and partner
				involvement model.
			</p>

			<ul class="contact-section__list">
				<li>
					<span>Email</span>
					<a href="mailto:hello@nordicsolutions.ae">hello@nordicsolutions.ae</a>
				</li>
				<li>
					<span>Phone</span>
					<a href="tel:+97120004900">+971 2 000 4900</a>
				</li>
				<li>
					<span>Location</span>
					<p>Abu Dhabi Global Market, Al Maryah Island, Abu Dhabi, UAE</p>
				</li>
			</ul>
		</section>

		<section class="contact-section__form-wrap" aria-label="Contact form">
			<form class="contact-section__form" onsubmit={handleSubmit}>
				<label>
					<span>Name</span>
					<input name="name" type="text" autocomplete="name" required />
				</label>

				<label>
					<span>Work Email</span>
					<input name="email" type="email" autocomplete="email" required />
				</label>

				<label>
					<span>Organization</span>
					<input name="organization" type="text" autocomplete="organization" />
				</label>

				<label>
					<span>Brief Message</span>
					<textarea name="message" rows="4" required></textarea>
				</label>

				<button type="submit">Send Request</button>
			</form>
		</section>
	</div>
</SectionShell>

<style>
	.contact-section__layout {
		display: grid;
		grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
		gap: clamp(var(--space-6), 4vw, var(--space-12));
		align-items: start;
	}

	.contact-section__details {
		display: grid;
		gap: var(--space-4);
		padding: var(--space-5);
		border: 1px solid var(--color-border-soft);
		border-radius: var(--radius-md);
		background: color-mix(in oklab, var(--color-bg-subtle) 72%, white);
	}

	.contact-section__details h3 {
		margin: 0;
		font-size: 1.14rem;
	}

	.contact-section__details p {
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

	.contact-section__list span {
		font-size: 0.78rem;
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
		font-size: 0.95rem;
		line-height: 1.5;
		color: var(--color-text-primary);
	}

	.contact-section__form-wrap {
		padding: var(--space-5);
		border: 1px solid var(--color-border-soft);
		border-radius: var(--radius-md);
		background: color-mix(in oklab, var(--color-bg-elevated) 88%, white);
	}

	.contact-section__form {
		display: grid;
		gap: var(--space-4);
	}

	.contact-section__form label {
		display: grid;
		gap: var(--space-2);
	}

	.contact-section__form span {
		font-size: var(--font-size-small);
		font-weight: 600;
		color: var(--color-text-muted);
	}

	.contact-section__form :is(input, textarea) {
		width: 100%;
		font: inherit;
		padding: 0.72rem 0.78rem;
		border-radius: var(--radius-sm);
		border: 1px solid var(--color-border-soft);
		background: color-mix(in oklab, var(--color-bg-elevated) 91%, white);
		color: var(--color-text-primary);
	}

	.contact-section__form :is(input, textarea):focus {
		outline: 2px solid color-mix(in oklab, var(--color-accent) 30%, white);
		outline-offset: 1px;
	}

	.contact-section__form button {
		width: fit-content;
		min-height: 2.85rem;
		padding-inline: 1.2rem;
		border-radius: var(--radius-pill);
		border: 1px solid color-mix(in oklab, var(--color-accent) 66%, var(--color-border-soft));
		background: color-mix(in oklab, var(--color-accent-soft) 55%, var(--color-bg-elevated));
		font: inherit;
		font-size: 0.95rem;
		font-weight: 640;
		color: color-mix(in oklab, var(--color-accent) 86%, black);
		cursor: pointer;
	}

	@media (max-width: 900px) {
		.contact-section__layout {
			grid-template-columns: 1fr;
		}

		.contact-section__form button {
			width: 100%;
		}
	}
</style>
