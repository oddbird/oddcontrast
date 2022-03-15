<!-- Seems to be the best way to do global styles as of https://github.com/sveltejs/kit/issues/1948#issuecomment-1011544861 -->
<svelte:head>
	<style lang="scss">
		@use '../sass/app.scss';
	</style>
</svelte:head>

<slot />
