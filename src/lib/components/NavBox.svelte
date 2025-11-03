<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { T } from '@threlte/core';
	import { onMount } from 'svelte';

	let rotation = 0;

	onMount(() => {
		const animationInterval = setInterval(() => {
			rotation += 0.005;
		}, 16);

		return () => {
			clearInterval(animationInterval);
		};
	});
</script>

<div class="w-7 h-7 pointer-events-none">
	<Canvas>
		<!-- Camera positioned closer for small viewport -->
		<T.PerspectiveCamera makeDefault position={[0, 0, 5]} fov={30}/>

		<!-- Rotating wireframe torus -->
		<T.Mesh rotation={[rotation * 0.7, rotation * 0.5, rotation * 0.3]}>
			<T.TorusGeometry args={[.8, 0.3, 10, 10]} />
			<T.MeshStandardMaterial color="beige"  opacity={0.6} wireframe/>
		</T.Mesh>

		<!-- Minimal ambient light -->
		<T.AmbientLight intensity={0.4} />
	</Canvas>
</div>

<style>
	div {
		z-index: 1;
	}
</style>