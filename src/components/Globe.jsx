import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Globe() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Create scene, camera, and renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 2.5;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    container.appendChild(renderer.domElement);

    const radius = 0.8;
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // Track resources for cleanup
    const boundaryGeometries = [];
    const boundaryMaterials = [];

    // Outer glow / atmospheric halo sphere
    const haloGeometry = new THREE.SphereGeometry(radius * 1.025, 32, 32);
    const haloMaterial = new THREE.MeshBasicMaterial({
      color: 0x41eec2,
      transparent: true,
      opacity: 0.06,
      blending: THREE.AdditiveBlending,
      side: THREE.BackSide,
    });
    const halo = new THREE.Mesh(haloGeometry, haloMaterial);
    scene.add(halo);

    // Inner core globe
    const innerGeometry = new THREE.SphereGeometry(radius * 0.98, 48, 48);
    const innerMaterial = new THREE.MeshPhongMaterial({
      color: 0x00d1a7,
      transparent: true,
      opacity: 0.08,
      shininess: 100,
    });
    const innerGlobe = new THREE.Mesh(innerGeometry, innerMaterial);
    scene.add(innerGlobe);

    // Fetch Earth boundary GeoJSON
    fetch('/ne_110m_land.geojson')
      .then((res) => res.json())
      .then((data) => {
        if (!data || !data.features) return;

        data.features.forEach((feature) => {
          const { type, coordinates } = feature.geometry;
          if (type === 'Polygon') {
            coordinates.forEach((ring) => {
              createLineFromRing(ring);
            });
          } else if (type === 'MultiPolygon') {
            coordinates.forEach((polygon) => {
              polygon.forEach((ring) => {
                createLineFromRing(ring);
              });
            });
          }
        });
      })
      .catch((err) => console.error('Failed to load earth boundaries:', err));

    function createLineFromRing(ring) {
      const points = [];
      ring.forEach((coord) => {
        const lng = coord[0];
        const lat = coord[1];
        
        // Convert to radians
        const lambda = (lng * Math.PI) / 180;
        const phi = (lat * Math.PI) / 180;

        // Spherical mapping coordinates
        const x = radius * Math.cos(phi) * Math.sin(lambda);
        const y = radius * Math.sin(phi);
        const z = radius * Math.cos(phi) * Math.cos(lambda);

        points.push(new THREE.Vector3(x, y, z));
      });

      if (points.length < 2) return;

      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = new THREE.LineBasicMaterial({
        color: 0x41eec2,
        transparent: true,
        opacity: 0.45,
      });

      const lineLoop = new THREE.LineLoop(geometry, material);
      globeGroup.add(lineLoop);

      boundaryGeometries.push(geometry);
      boundaryMaterials.push(material);
    }

    // Lights
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 3, 5);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x404040));

    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      globeGroup.rotation.y += 0.0025;
      globeGroup.rotation.x = 0.2; // slight tilt to show Northern and Southern hemispheres clearly
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      
      // Dispose boundary lines
      boundaryGeometries.forEach((g) => g.dispose());
      boundaryMaterials.forEach((m) => m.dispose());

      // Dispose other meshes
      haloGeometry.dispose();
      haloMaterial.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      light.dispose();
      renderer.dispose();
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full min-h-[400px] md:min-h-[500px]" />;
}
