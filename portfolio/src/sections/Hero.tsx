import { useEffect, useRef } from "react";
import * as THREE from "three";
import "./Hero.css";

interface OrbiterConfig {
  radius: number;
  speed: number;
  size: number;
  phase: number;
  axis: THREE.Vector3;
}

const ORBITERS: OrbiterConfig[] = [
  {
    radius: 10,
    speed: 0.22,
    size: 1.1,
    phase: 0.0,
    axis: new THREE.Vector3(0, 1, 0),
  },
  {
    radius: 14,
    speed: 0.14,
    size: 0.65,
    phase: 1.2,
    axis: new THREE.Vector3(0.5, 0.8, 0.3).normalize(),
  },
  {
    radius: 8.5,
    speed: 0.38,
    size: 0.45,
    phase: 2.5,
    axis: new THREE.Vector3(-0.3, 0.7, 0.6).normalize(),
  },
  {
    radius: 18,
    speed: 0.09,
    size: 1.75,
    phase: 4.0,
    axis: new THREE.Vector3(0.2, -0.5, 0.9).normalize(),
  },
];

const TECH = [
  "TypeScript",
  "React",
  "Three.js",
  "JavaScript",
  "Python",
  "C++",
  "C#",
  "Blender",
];

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  // ── Three.js scene ───────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x080808);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 300);
    camera.position.set(0, 0, 32);

    // Starfield
    const starCount = 3200;
    const starPositions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 60 + Math.random() * 120;
      starPositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      starPositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      starPositions[i * 3 + 2] = r * Math.cos(phi);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3),
    );
    scene.add(
      new THREE.Points(
        starGeo,
        new THREE.PointsMaterial({
          color: 0xe8d5b0,
          size: 0.09,
          transparent: true,
          opacity: 0.55,
          sizeAttenuation: true,
        }),
      ),
    );

    // Orbiters
    const orbiterGroups: THREE.Group[] = [];
    ORBITERS.forEach((cfg) => {
      const geo = new THREE.IcosahedronGeometry(cfg.size, 0);
      const group = new THREE.Group();
      group.add(
        new THREE.Mesh(
          geo,
          new THREE.MeshStandardMaterial({
            color: 0x1a1410,
            emissive: 0x0d0a07,
            roughness: 0.3,
            metalness: 0.8,
          }),
        ),
      );
      group.add(
        new THREE.Mesh(
          geo,
          new THREE.MeshBasicMaterial({
            color: 0xe8d5b0,
            wireframe: true,
            transparent: true,
            opacity: 0.28,
          }),
        ),
      );
      scene.add(group);
      orbiterGroups.push(group);

      // Faint orbit ring
      const ring = new THREE.Mesh(
        new THREE.TorusGeometry(cfg.radius, 0.008, 4, 80),
        new THREE.MeshBasicMaterial({
          color: 0xe8d5b0,
          transparent: true,
          opacity: 0.04,
        }),
      );
      ring.lookAt(cfg.axis);
      scene.add(ring);
    });

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.12));
    const warmLight = new THREE.PointLight(0xff8c42, 50, 80);
    warmLight.position.set(12, 10, 18);
    warmLight.castShadow = true;
    scene.add(warmLight);

    const coolLight = new THREE.PointLight(0x7cf4e2, 25, 60);
    coolLight.position.set(-14, -8, 14);
    scene.add(coolLight);

    const blueLight = new THREE.PointLight(0x4fa3e0, 15, 40);
    blueLight.position.set(0, -12, -10);
    scene.add(blueLight);

    // Resize
    const resize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    // Mouse
    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // RAF loop
    let frameId: number;
    let elapsed = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      elapsed += 0.008;

      orbiterGroups.forEach((group, i) => {
        const cfg = ORBITERS[i];
        const q = new THREE.Quaternion().setFromAxisAngle(
          cfg.axis,
          elapsed * cfg.speed + cfg.phase,
        );
        group.position.copy(
          new THREE.Vector3(cfg.radius, 0, 0).applyQuaternion(q),
        );
        group.rotation.y += 0.018;
        group.rotation.x += 0.009;
      });

      camera.position.x +=
        (mouseRef.current.x * 2.5 - camera.position.x) * 0.04;
      camera.position.y +=
        (-mouseRef.current.y * 1.8 - camera.position.y) * 0.04;
      camera.lookAt(scene.position);

      warmLight.intensity = 50 + Math.sin(elapsed * 1.2) * 8;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          const mats = Array.isArray(obj.material)
            ? obj.material
            : [obj.material];
          mats.forEach((m) => m.dispose());
        }
      });
      renderer.forceContextLoss();
      renderer.dispose();
    };
  }, []);

  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      aria-label="Hero and about"
    >
      {/* ── Intro — first viewport ────────────────────────────────────── */}
      <div className="relative h-dvh min-h-150 w-full flex flex-col items-center justify-center text-center gap-3 px-[clamp(1.5rem,4vw,3rem)]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 pointer-events-none bg-vignette"
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col items-center gap-5 pt-3 max-w-225">
          <p className="eyebrow anim-fade-up anim-d1">
            Software · Cybersecurity · Product Design
          </p>

          <p className="hero-tagline anim-fade-up anim-d3">
            Turning ideas into products through code, design, and curiosity.
          </p>

          <div className="px-[clamp(1.5rem,4vw,3rem)] max-w-360 mx-auto flex flex-col gap-8">
            <div className="reveal flex flex-col gap-4">
              <p className="about-bio">
                I'm a{" "}
                <span className="text-text-primary">
                  creative developer and 3D artist
                </span>{" "}
                who builds full-stack systems by day and explores game design,
                3D art, and cybersecurity in my free time. I enjoy building
                products from the ground up — working across engineering,
                design, and product to turn ideas into experiences people
                genuinely enjoy using.
              </p>
            </div>

            <div className="reveal reveal-d2 flex flex-wrap gap-2">
              {TECH.map((tech) => (
                <span
                  key={tech}
                  className="chip transition-colors duration-250 hover:text-accent hover:border-accent-border"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="anim-fade-up anim-d4 flex gap-4 flex-wrap justify-center mt-1">
            <button
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="btn-cta"
            >
              View Work
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="hero-btn-outline"
            >
              Get in Touch
            </button>
          </div>
        </div>

        {/* Scroll hint */}
        <button
          onClick={() =>
            document
              .getElementById("about")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          aria-label="Scroll to learn more"
          className="hero-scroll-hint anim-fade-up anim-d5"
        >
          <span className="hero-scroll-hint__label">Scroll</span>
          <span
            className="hero-scroll-hint__line bg-gradient-scroll animate-scroll-pulse"
            aria-hidden="true"
          />
        </button>

        {/* Corner metadata */}
        <span
          className="hero-corner-meta hidden md:block anim-fade-up anim-d8"
          aria-hidden="true"
        >
          Made with THREE.JS · REACT · TS
        </span>
      </div>
    </section>
  );
}
