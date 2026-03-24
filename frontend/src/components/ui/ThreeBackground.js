import { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * ThreeBackground
 * Full-viewport WebGL 3D scene: neural-network nodes, animated edges,
 * two rotating wireframe polyhedra, and mouse-responsive parallax.
 * Renders behind all page content (pointer-events: none).
 */
const ThreeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    /* ─── RENDERER ─── */
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    /* ─── SCENE / CAMERA ─── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      65,
      mount.clientWidth / mount.clientHeight,
      0.1,
      200
    );
    camera.position.z = 8;

    /* ─── HELPERS ─── */
    const rand = (min, max) => Math.random() * (max - min) + min;

    /* ─── NEURAL NETWORK NODES ─── */
    const NODE_COUNT = 90;
    const nodeGeo = new THREE.SphereGeometry(0.055, 8, 8);
    const nodes = [];
    const positions = [];

    for (let i = 0; i < NODE_COUNT; i++) {
      const pos = new THREE.Vector3(rand(-11, 11), rand(-7, 7), rand(-6, 2));
      positions.push(pos);
      const isTeal = Math.random() > 0.45;
      const mat = new THREE.MeshBasicMaterial({
        color: isTeal ? 0x00e5c8 : 0x8b5cf6,
        transparent: true,
        opacity: rand(0.45, 0.9),
      });
      const mesh = new THREE.Mesh(nodeGeo, mat);
      mesh.position.copy(pos);
      scene.add(mesh);
      nodes.push({
        mesh,
        origin: pos.clone(),
        phase: rand(0, Math.PI * 2),
        freq: rand(0.3, 0.8),
        amp: rand(0.15, 0.4),
      });
    }

    /* ─── NEURAL EDGES ─── */
    const CONNECT_DIST = 3.8;
    for (let i = 0; i < NODE_COUNT; i++) {
      for (let j = i + 1; j < NODE_COUNT; j++) {
        if (positions[i].distanceTo(positions[j]) < CONNECT_DIST) {
          const geo = new THREE.BufferGeometry().setFromPoints([
            positions[i],
            positions[j],
          ]);
          const mat = new THREE.LineBasicMaterial({
            color: j % 3 === 0 ? 0x8b5cf6 : 0x00e5c8,
            transparent: true,
            opacity: rand(0.04, 0.14),
          });
          scene.add(new THREE.Line(geo, mat));
        }
      }
    }

    /* ─── TORUS KNOT (right side) ─── */
    const tkGeo = new THREE.TorusKnotGeometry(1.4, 0.38, 120, 18);
    const tkMat = new THREE.MeshBasicMaterial({
      color: 0x00e5c8,
      wireframe: true,
      transparent: true,
      opacity: 0.13,
    });
    const torusKnot = new THREE.Mesh(tkGeo, tkMat);
    torusKnot.position.set(4.5, 0.5, -3);
    scene.add(torusKnot);

    /* ─── ICOSAHEDRON (left side) ─── */
    const icoGeo = new THREE.IcosahedronGeometry(1.0, 1);
    const icoMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const ico = new THREE.Mesh(icoGeo, icoMat);
    ico.position.set(-5, 1.8, -1.5);
    scene.add(ico);

    /* ─── OCTAHEDRON (floating top-right) ─── */
    const octGeo = new THREE.OctahedronGeometry(0.6, 0);
    const octMat = new THREE.MeshBasicMaterial({
      color: 0x00b8d4,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const oct = new THREE.Mesh(octGeo, octMat);
    oct.position.set(2.5, 3.5, -0.5);
    scene.add(oct);

    /* ─── SECOND ICO (bottom-left accent) ─── */
    const ico2Geo = new THREE.IcosahedronGeometry(0.5, 0);
    const ico2Mat = new THREE.MeshBasicMaterial({
      color: 0xf43f5e,
      wireframe: true,
      transparent: true,
      opacity: 0.2,
    });
    const ico2 = new THREE.Mesh(ico2Geo, ico2Mat);
    ico2.position.set(-3, -3.2, 0.5);
    scene.add(ico2);

    /* ─── MOUSE PARALLAX ─── */
    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMouseMove = (e) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    /* ─── ANIMATION LOOP ─── */
    const clock = new THREE.Clock();
    let raf;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      /* smooth mouse lerp */
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      scene.rotation.y = mouse.x * 0.06;
      scene.rotation.x = mouse.y * 0.04;

      /* rotate main shapes */
      torusKnot.rotation.x = t * 0.22;
      torusKnot.rotation.y = t * 0.31;
      ico.rotation.x = t * 0.18;
      ico.rotation.y = t * 0.27;
      oct.rotation.x = t * 0.35;
      oct.rotation.z = t * 0.25;
      ico2.rotation.y = t * 0.4;
      ico2.rotation.z = t * 0.3;

      /* float nodes */
      nodes.forEach((n) => {
        n.mesh.position.y =
          n.origin.y + Math.sin(t * n.freq + n.phase) * n.amp;
        n.mesh.position.x =
          n.origin.x + Math.cos(t * n.freq * 0.7 + n.phase) * n.amp * 0.6;
      });

      renderer.render(scene, camera);
    };

    animate();

    /* ─── RESIZE ─── */
    const onResize = () => {
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener('resize', onResize);

    /* ─── CLEANUP ─── */
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    />
  );
};

export default ThreeBackground;
