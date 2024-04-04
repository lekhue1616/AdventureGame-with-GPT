<script>
	import { page } from '$app/stores';
</script>

<header>
	<div class="blocker" />
	<a href="/"><h2>Escape Room Generator</h2></a>
	<!--<nav>
		<ul>
			<li aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
				<a href="/">Home</a>
			</li>
			<li aria-current={$page.url.pathname === '/generator' ? 'page' : undefined}>
				<a href="/generator">Generate</a>
			</li>
			<li aria-current={$page.url.pathname === '/play' ? 'page' : undefined}>
				<a href="/play">Play</a>
			</li>
		</ul>
	</nav>-->
</header>

<style>
	.blocker,
	/*nav {
		flex: 1;
	}*/

	header {
		display: flex;
		justify-content: center;
		margin: 0.5em 1em;
	}

	h2 {
		margin-top: 0;
		margin-bottom: 0;
	}

	/*nav {
		display: flex;
		justify-content: flex-end;
	}

	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
	}

	li {
		position: relative;
		height: 100%;
	}

	li[aria-current='page'] a {
		font-weight: 700;
		text-decoration: underline;
		color: var(--color-accent-brighter);
		cursor: default;
	}

	nav a {
		display: flex;
		height: 100%;
		align-items: center;
		padding: 0 0.5rem;
		color: var(--color-text);
		text-transform: uppercase;
		text-decoration: none;
		transition: color 0.2s linear;
	}*/

	a:hover {
		color: var(--color-theme-1);
	}
</style>
