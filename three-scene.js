import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.166.1/build/three.module.js";

const canvas = document.querySelector("#three-scene");
const host = canvas?.parentElement;
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (canvas && host && window.WebGLRenderingContext) {
  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 100);
    camera.position.set(0, 0, 13.5);

    const world = new THREE.Group();
    scene.add(world);
    const core = new THREE.Group();
    world.add(core);

    const lime = new THREE.Color("#d4ff70");
    const aqua = new THREE.Color("#7de7d6");
    const violet = new THREE.Color("#a99bff");

    // Dense, multicolour particle field with a gentle depth drift.
    const particleCount = window.innerWidth < 650 ? 480 : 1050;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleColors = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    const palette = [lime, aqua, violet];
    for (let i = 0; i < particleCount; i++) {
      const r = 2.5 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      particlePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = r * Math.cos(phi);
      const color = palette[Math.floor(Math.random() * palette.length)];
      particleColors[i * 3] = color.r;
      particleColors[i * 3 + 1] = color.g;
      particleColors[i * 3 + 2] = color.b;
      particleSizes[i] = 0.7 + Math.random() * 1.5;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(particleColors, 3));
    const particleMaterial = new THREE.PointsMaterial({
      size: 0.045, vertexColors: true, transparent: true, opacity: 0.82,
      sizeAttenuation: true, blending: THREE.AdditiveBlending, depthWrite: false
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    world.add(particles);

    // Faceted luminous core with a layered wireframe shell.
    const coreGeometry = new THREE.IcosahedronGeometry(1.62, 2);
    const coreMaterial = new THREE.MeshStandardMaterial({
      color: 0x18251a, emissive: 0x385522, emissiveIntensity: 0.9,
      metalness: 0.72, roughness: 0.24, flatShading: true
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    core.add(coreMesh);
    const shell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.82, 2),
      new THREE.MeshBasicMaterial({ color: lime, wireframe: true, transparent: true, opacity: 0.34 })
    );
    core.add(shell);
    const innerShell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.15, 1),
      new THREE.MeshBasicMaterial({ color: aqua, wireframe: true, transparent: true, opacity: 0.2 })
    );
    core.add(innerShell);

    // Orbiting torus rings, each with its own tilt and rotation.
    const rings = [];
    const ringSpecs = [
      { radius: 2.45, tube: 0.012, color: 0xd4ff70, opacity: 0.75, rx: 1.02, ry: 0.12, rz: -0.22, speed: 0.23 },
      { radius: 2.9, tube: 0.009, color: 0x7de7d6, opacity: 0.54, rx: 0.42, ry: 0.82, rz: 0.55, speed: -0.17 },
      { radius: 3.35, tube: 0.008, color: 0xa99bff, opacity: 0.45, rx: 1.36, ry: 0.35, rz: 0.18, speed: 0.11 }
    ];
    ringSpecs.forEach(spec => {
      const mesh = new THREE.Mesh(
        new THREE.TorusGeometry(spec.radius, spec.tube, 8, 180),
        new THREE.MeshBasicMaterial({ color: spec.color, transparent: true, opacity: spec.opacity, blending: THREE.AdditiveBlending, depthWrite: false })
      );
      mesh.rotation.set(spec.rx, spec.ry, spec.rz);
      mesh.userData.speed = spec.speed;
      rings.push(mesh);
      world.add(mesh);
    });

    // A twisted torus knot adds a recognisable 3D signature shape.
    const knot = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.78, 0.018, 180, 8, 2, 5),
      new THREE.MeshBasicMaterial({ color: 0xd4ff70, transparent: true, opacity: 0.68, blending: THREE.AdditiveBlending })
    );
    knot.scale.set(1.28, 1.28, 1.28);
    knot.rotation.set(0.7, 0.4, 0.15);
    core.add(knot);

    // Small faceted satellites float on independent orbital paths.
    const satellites = [];
    const satelliteColors = [lime, aqua, violet, lime, aqua];
    for (let i = 0; i < 5; i++) {
      const geometry = i % 2 === 0 ? new THREE.OctahedronGeometry(0.12 + Math.random() * 0.12, 0) : new THREE.TetrahedronGeometry(0.16, 0);
      const material = new THREE.MeshStandardMaterial({
        color: satelliteColors[i], emissive: satelliteColors[i], emissiveIntensity: 0.35,
        metalness: 0.5, roughness: 0.3, flatShading: true
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.userData = { phase: (i / 5) * Math.PI * 2, radius: 2.6 + (i % 3) * 0.45, speed: 0.18 + i * 0.035, height: (i % 2 ? 1 : -1) * (0.55 + (i % 3) * 0.2) };
      satellites.push(mesh);
      world.add(mesh);
    }

    // Soft lights bring out the metallic facets without post-processing.
    scene.add(new THREE.AmbientLight(0x9eabc5, 1.1));
    const keyLight = new THREE.PointLight(0xd4ff70, 34, 18);
    keyLight.position.set(-3, 3, 5);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0x7de7d6, 22, 16);
    rimLight.position.set(4, -2, -3);
    scene.add(rimLight);

    const pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onPointerMove = event => {
      const rect = canvas.getBoundingClientRect();
      pointer.targetX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.targetY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    canvas.addEventListener("pointermove", onPointerMove, { passive: true });
    canvas.addEventListener("pointerleave", () => { pointer.targetX = 0; pointer.targetY = 0; });

    // Click/tap on the 3D field triggers a quick energy ripple.
    const ripple = new THREE.Mesh(
      new THREE.TorusGeometry(1, 0.018, 6, 96),
      new THREE.MeshBasicMaterial({ color: 0xd4ff70, transparent: true, opacity: 0, blending: THREE.AdditiveBlending })
    );
    ripple.rotation.x = Math.PI * 0.5;
    ripple.visible = false;
    world.add(ripple);
    let rippleStart = -10;
    canvas.addEventListener("click", () => {
      ripple.visible = true;
      ripple.scale.setScalar(0.2);
      ripple.material.opacity = 0.85;
      rippleStart = performance.now() / 1000;
    });

    function resize() {
      const width = Math.max(1, host.clientWidth);
      const height = Math.max(1, host.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = width < 650 ? 15.5 : 13.5;
      camera.updateProjectionMatrix();
      world.position.x = width < 650 ? 0 : 0.28;
      world.scale.setScalar(width < 650 ? 0.79 : 1);
    }
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();

    const clock = new THREE.Clock();
    let frameId = 0;
    let running = true;
    function animate() {
      if (!running) return;
      const t = clock.getElapsedTime();
      pointer.x += (pointer.targetX - pointer.x) * 0.035;
      pointer.y += (pointer.targetY - pointer.y) * 0.035;

      if (!reducedMotion) {
        world.rotation.y = t * 0.055 + pointer.x * 0.12;
        world.rotation.x = Math.sin(t * 0.22) * 0.045 - pointer.y * 0.07;
        particles.rotation.y = -t * 0.012;
        particles.rotation.x = Math.sin(t * 0.12) * 0.025;
        core.rotation.y = t * 0.16;
        core.rotation.x = Math.sin(t * 0.5) * 0.12;
        coreMesh.rotation.z = t * 0.08;
        shell.rotation.set(t * 0.09, -t * 0.13, t * 0.06);
        innerShell.rotation.set(-t * 0.12, t * 0.1, -t * 0.08);
        knot.rotation.x = 0.7 + t * 0.13;
        knot.rotation.y = 0.4 + t * 0.19;
        rings.forEach(ring => { ring.rotation.z += ring.userData.speed * 0.001; });
        satellites.forEach(mesh => {
          const d = mesh.userData;
          const angle = t * d.speed + d.phase;
          mesh.position.set(Math.cos(angle) * d.radius, Math.sin(angle * 1.12) * d.height, Math.sin(angle) * d.radius * 0.55);
          mesh.rotation.set(t * 0.5 + d.phase, t * 0.7, t * 0.25);
        });
        keyLight.position.x = -3 + Math.sin(t * 0.35) * 1.2;
        rimLight.position.y = -2 + Math.cos(t * 0.3) * 1.2;
      }
      if (ripple.visible) {
        const age = performance.now() / 1000 - rippleStart;
        ripple.scale.setScalar(0.2 + Math.max(0, age) * 1.55);
        ripple.material.opacity = Math.max(0, 0.85 - age * 0.9);
        if (ripple.material.opacity <= 0) ripple.visible = false;
      }
      renderer.render(scene, camera);
      if (!reducedMotion) frameId = requestAnimationFrame(animate);
    }
    animate();

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        running = false;
        if (frameId) cancelAnimationFrame(frameId);
      } else if (!running) {
        running = true;
        if (reducedMotion) renderer.render(scene, camera);
        else animate();
      }
    });
    window.addEventListener("beforeunload", () => {
      resizeObserver.disconnect();
      renderer.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
    }, { once: true });
  } catch (error) {
    console.warn("3D effect unavailable; keeping the CSS hero design.", error);
    renderer?.dispose();
  }
}
