<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { T } from '@threlte/core';
	import { onMount } from 'svelte';
	import * as THREE from 'three';

	let rotation = 0;
	let tanTime = 0;
	let time = 0
	let drawProgress = 0;
	let showTan = false;

	onMount(() => {
		const animationInterval = setInterval(() => {
			rotation += 0.005;
			tanTime += 0.04;
			time += 0.03;
			// Show text only when time is between -4/2 and 4/2*π
			showTan = true

			// Reset time when it reaches a boundary to prevent overflow
			if (tanTime > 10/2 * Math.PI) {
				tanTime = -10/2 * Math.PI;
			}

			if (time > 5 * Math.PI) {
				time = -5 * Math.PI;
			}
			// Slowly increase draw progress, reset when complete
			drawProgress = (drawProgress + 0.005) % 1;
		}, 16);

		return () => {
			clearInterval(animationInterval);
		};
	});
</script>

<div class="absolute inset-0 pointer-events-none">
	<Canvas>
		<!-- Camera -->
		<T.PerspectiveCamera makeDefault position={[0, 0, 10]} fov={30} />

		<!-- Rotating Torus -->
		<T.Mesh
			position={[tanTime, Math.tan((tanTime/10)), 0]}
			rotation={[rotation* 3, 0, 0]}
		>
			<T.TorusGeometry args={[1, 0.4, 6, 20]} />
			<T.MeshStandardMaterial color="#c49563" transparent opacity={0.08} />
		</T.Mesh>
		
		<!-- Floating Sphere -->
		<T.Mesh
			position={[time, Math.sin(time/3 - 3), 0]}
			rotation={[rotation* 3, 0, 0]}
		>
			<T.SphereGeometry args={[1, 6, 10]} />
			<T.MeshStandardMaterial color="#c49563" transparent opacity={0.08} />
		</T.Mesh>

		<!-- Rotating Box -->
		<!-- <T.Mesh position={[0, -3, -2]} rotation={[rotation * 0.3, rotation * 0.8, rotation * 0.5]}>
			<T.BoxGeometry args={[1.5, 1.5, 1.5]} />
			<T.MeshStandardMaterial color="#2c2c2c" transparent opacity={0.12} wireframe/>
		</T.Mesh> -->

		<!-- Icosahedron -->
		<!-- <T.Mesh position={[-2, -2, -1]} rotation={[rotation * 0.6, rotation * 0.4, 0]}>
			<T.IcosahedronGeometry args={[1, 0]} />
			<T.MeshStandardMaterial color="#2c2c2c" transparent opacity={0.08} wireframe />
		</T.Mesh> -->

		<!-- Octahedron -->
		<!-- <T.Mesh position={[2, 3, -1]} rotation={[rotation * 0.4, rotation * 0.9, rotation * 0.2]}>
			<T.OctahedronGeometry args={[1.2, 0]} />
			<T.MeshStandardMaterial color="#2c2c2c" transparent opacity={0.1} />
		</T.Mesh> -->

		<!-- Sine wave drawing itself -->
		<!-- <T.Line>
			<T.BufferGeometry>
				<T.BufferAttribute
					attach="attributes.position"
					args={[
						new Float32Array(
							Array.from({ length: Math.floor(100 * drawProgress) }, (_, i) => {
								const x = (i / 99) * 6 - 3; // x from -3 to 3
								const y = Math.sin(x + time) * 1.5; // sine wave
								return [x, y, 0];
							}).flat()
						),
						3
					]}
				/>
			</T.BufferGeometry>
			<T.LineBasicMaterial color="#4c4c4c" transparent opacity={0.6} />
		</T.Line> -->

		<!-- Ambient Light -->
		<T.AmbientLight intensity={0.3} />
	</Canvas>
</div>

<style>
	div {
		z-index: 0;
	}

</style>
