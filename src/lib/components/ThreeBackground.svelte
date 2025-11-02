<script lang="ts">
	import { Canvas } from '@threlte/core';
	import { T } from '@threlte/core';
	import { onMount } from 'svelte';
	import * as THREE from 'three';

	let rotation = 0;
	let time = - 6 * Math.PI;
	let drawProgress = 0;
	let showTan = false;
	export let animationPhase = 0; // 0, 1, 2 for the three phases - now exported
	let phaseTimer = 0;
	let screenWidth = 0;
	
	// Calculate time boundaries based on screen width
	$: timeBoundary = Math.max(3, (screenWidth / 300)) * Math.PI;

	// Function to determine sphere position based on time
	function getFusedSpherePosition(time: number): [number, number, number] {
		if (time < 0) {
			return [time, Math.tan((time/10)), 0];
		} else {
			return [time, Math.sin(time/3), 0];
		}
	}

	onMount(() => {
		// Get initial screen width
		screenWidth = window.innerWidth;
		// Initialize time with the calculated boundary
		time = -timeBoundary;
		
		// Listen for window resize to update screen width
		const handleResize = () => {
			screenWidth = window.innerWidth;
		};
		window.addEventListener('resize', handleResize);

		const animationInterval = setInterval(() => {
			rotation += 0.005;
			time += 0.05;
			
			// Show text only when time is between -timeBoundary and timeBoundary
			showTan = true
			// Cycle through animation phases based on screen-width dependent boundaries
			console.log({time}, animationPhase);
			if (time > timeBoundary) {
				animationPhase = (animationPhase + 1) % 3;
				time = -timeBoundary;
			}
			// Slowly increase draw progress, reset when complete
			drawProgress = (drawProgress + 0.005) % 1;
		}, 16);

		return () => {
			clearInterval(animationInterval);
			window.removeEventListener('resize', handleResize);
		};
	});
</script>

<div class="absolute inset-0 pointer-events-none">
	<Canvas>
		<!-- Camera -->
		<T.PerspectiveCamera makeDefault position={[0, 0, 10]} fov={30}/>

		{#if animationPhase === 0}
			<T.Mesh
				position={[time, Math.tan((time/10)), 0]}
				rotation={[rotation* 3, 0, 0]}
			>
				<T.SphereGeometry args={[1, 6, 10]} />
				<T.MeshStandardMaterial color="#e2725b" opacity={0.08}/>
			</T.Mesh>
		{/if}

		{#if animationPhase === 1}
			<T.Mesh position={[time, Math.sin(time/3), 0]}
					rotation={[rotation * 0.3, rotation * 0.8, rotation * 0.5]}>
				<T.BoxGeometry args={[2, 2, 2]} />
				<T.MeshStandardMaterial color="#806154" transparent opacity={0.3} wireframe/>
			</T.Mesh>
		{/if}

		<!-- Phase 2: Show both floating sphere and rotating box -->
		{#if animationPhase === 2}
			<T.Mesh
				position={getFusedSpherePosition(time)}
				rotation={[rotation* 3, 0, 0]}
			>
				<T.SphereGeometry args={[1, 6, 10]} />
				<T.MeshStandardMaterial color="#e2725b" opacity={0.08}/>
			</T.Mesh>

			<!-- Rotating Box -->
			<T.Mesh position={[time, Math.sin(time/3), 0]}
					rotation={[rotation * 0.3, rotation * 0.8, rotation * 0.5]}>
				<T.BoxGeometry args={[2, 2, 2]} />
				<T.MeshStandardMaterial color="#806154" transparent opacity={0.3} wireframe/>
			</T.Mesh>
		{/if}
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
