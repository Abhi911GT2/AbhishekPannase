import * as THREE from 'three';

// ------------- 3D Background Engine -------------
const canvas3D = document.getElementById('three-canvas');
const scene = new THREE.Scene();
scene.fog = new THREE.FogExp2(0x121212, 0.04);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: canvas3D, alpha: true, antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// --- Hero Meshes (Science/Engineering Schematics) ---
const heroGroup = new THREE.Group();

// 1. Gyroscope (Physics/Control Dynamics)
const gyroMat = new THREE.MeshBasicMaterial({ color: 0x4da6ff, wireframe: true, transparent: true, opacity: 0.5 }); // Airbus Blue
const gyro = new THREE.Group();
const g1 = new THREE.Mesh(new THREE.TorusGeometry(3.2, 0.08, 12, 40), gyroMat);
const g2 = new THREE.Mesh(new THREE.TorusGeometry(2.6, 0.08, 12, 40), gyroMat); g2.rotation.x = Math.PI/2;
const g3 = new THREE.Mesh(new THREE.TorusGeometry(2.0, 0.08, 12, 40), gyroMat); g3.rotation.y = Math.PI/2;
gyro.add(g1, g2, g3);
gyro.position.set(-8, 5, 4); // Massive on the upper left

// 2. Tetrahedron (Mathematics/Structure)
const tetraMat = new THREE.MeshBasicMaterial({ color: 0xff6b35, wireframe: true, transparent: true, opacity: 0.5 }); // RFA Orange
const tetra = new THREE.Mesh(new THREE.TetrahedronGeometry(2.8, 0), tetraMat);
tetra.position.set(6, 6, 2); // Floating high upper right

// 3. Icosahedron (Network/Systems)
const icosaMat = new THREE.MeshBasicMaterial({ color: 0xb388ff, wireframe: true, transparent: true, opacity: 0.5 }); // Education Purple
const icosa = new THREE.Mesh(new THREE.IcosahedronGeometry(2.5, 0), icosaMat);
icosa.position.set(4, -4, 6); // Floating in lower foreground right

heroGroup.add(gyro, tetra, icosa);
scene.add(heroGroup);

// --- Physical Vehicle Models (Massive Scale) ---

// 1. Plane (Commercial Aircraft - Airbus style)
const planeMat = new THREE.MeshBasicMaterial({ color: 0x4da6ff, wireframe: true, transparent: true, opacity: 0.4 });
const planeGroup = new THREE.Group();

// Fuselage
const fuselage = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 14, 16), planeMat);
fuselage.rotation.z = Math.PI / 2;
const nose = new THREE.Mesh(new THREE.SphereGeometry(0.8, 16, 16), planeMat);
nose.position.set(-7, 0, 0); 
const tailCone = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.8, 3, 16), planeMat);
tailCone.rotation.z = Math.PI / 2;
tailCone.position.set(8.5, 0, 0);

// Main Swept Wings
const wingShape = new THREE.Shape();
wingShape.moveTo(0, 0); wingShape.lineTo(2, 8); wingShape.lineTo(3.5, 8); wingShape.lineTo(6, 0); wingShape.lineTo(0, 0);
const extrudeSettings = { depth: 0.2, bevelEnabled: false };
const rightWing = new THREE.Mesh(new THREE.ExtrudeGeometry(wingShape, extrudeSettings), planeMat);
rightWing.rotation.x = Math.PI / 2; rightWing.position.set(-2, 0, 0.8);
const leftWing = new THREE.Mesh(new THREE.ExtrudeGeometry(wingShape, extrudeSettings), planeMat);
leftWing.rotation.x = -Math.PI / 2; leftWing.rotation.y = Math.PI; leftWing.position.set(4, 0, -0.8);

// Vertical Stabilizer
const finShape = new THREE.Shape();
finShape.moveTo(0, 0); finShape.lineTo(1.5, 3); finShape.lineTo(3, 3); finShape.lineTo(4, 0); finShape.lineTo(0, 0);
const tailFin = new THREE.Mesh(new THREE.ExtrudeGeometry(finShape, extrudeSettings), planeMat);
tailFin.position.set(6, 0.5, -0.1);

// Horizontal Stabilizers
const hTailShape = new THREE.Shape();
hTailShape.moveTo(0, 0); hTailShape.lineTo(1, 3); hTailShape.lineTo(2.5, 3); hTailShape.lineTo(3, 0); hTailShape.lineTo(0, 0);
const rightHTail = new THREE.Mesh(new THREE.ExtrudeGeometry(hTailShape, extrudeSettings), planeMat);
rightHTail.rotation.x = Math.PI / 2; rightHTail.position.set(7, 0.2, 0.5);
const leftHTail = new THREE.Mesh(new THREE.ExtrudeGeometry(hTailShape, extrudeSettings), planeMat);
leftHTail.rotation.x = -Math.PI / 2; leftHTail.rotation.y = Math.PI; leftHTail.position.set(10, 0.2, -0.5);

// Engine Nacelles
const engineGeo = new THREE.CylinderGeometry(0.5, 0.5, 2.5, 12);
const engine1 = new THREE.Mesh(engineGeo, planeMat); engine1.rotation.z = Math.PI/2; engine1.position.set(-1, -0.8, 3.5);
const engine2 = new THREE.Mesh(engineGeo, planeMat); engine2.rotation.z = Math.PI/2; engine2.position.set(-1, -0.8, -3.5);

planeGroup.add(fuselage, nose, tailCone, rightWing, leftWing, tailFin, rightHTail, leftHTail, engine1, engine2);
// Scale very large and shift heavily to the right to frame text perfectly
planeGroup.scale.set(1.4, 1.4, 1.4);
planeGroup.position.set(7, -26, -3); 
scene.add(planeGroup);

// 2. Rocket (RFA)
const rocketMat = new THREE.MeshBasicMaterial({ color: 0xff6b35, wireframe: true, transparent: true, opacity: 0.35 });
const rocketGroup = new THREE.Group();
const bodyMesh = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 12, 12, 12), rocketMat);
const rocketNose = new THREE.Mesh(new THREE.ConeGeometry(1, 4, 12, 6), rocketMat);
rocketNose.position.y = 8;
const nozzleMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 1.2, 2.5, 12, 4), rocketMat);
nozzleMesh.position.y = -7.25;
const boosterGeo = new THREE.CylinderGeometry(0.5, 0.5, 8, 8);
const b1 = new THREE.Mesh(boosterGeo, rocketMat); b1.position.set(1.5, -2, 0);
const b2 = new THREE.Mesh(boosterGeo, rocketMat); b2.position.set(-1.5, -2, 0);
rocketGroup.add(bodyMesh, rocketNose, nozzleMesh, b1, b2);
rocketGroup.scale.set(1.4, 1.4, 1.4);
rocketGroup.position.set(-7, -50, -3);
scene.add(rocketGroup);

// 3. Car/Chassis (Sports Car / F1 Profile style)
const carMat = new THREE.MeshBasicMaterial({ color: 0x4caf50, wireframe: true, transparent: true, opacity: 0.4 });
const carGroup = new THREE.Group();

const carProfile = new THREE.Shape();
carProfile.moveTo(-5, 0.5); // rear bumper
carProfile.lineTo(-5, 1.5); // rear height
carProfile.quadraticCurveTo(-3, 2.0, -1, 2.5); // sloping rear window
carProfile.lineTo(1, 2.5); // flat low roof
carProfile.quadraticCurveTo(3, 2.0, 4, 1.2); // aerodynamic windshield to hood
carProfile.lineTo(5, 0.8); // low hood
carProfile.lineTo(5, 0); // front bumper
carProfile.lineTo(-5, 0); // bottom

const extrudeSettingsCar = { depth: 4, bevelEnabled: true, bevelSegments: 2, steps: 2, bevelSize: 0.1, bevelThickness: 0.1 };
const carBody = new THREE.Mesh(new THREE.ExtrudeGeometry(carProfile, extrudeSettingsCar), carMat);
carBody.position.set(0, 0, -2); // center on Z axis

// Detailed Big Wheels
const wheelGeo = new THREE.CylinderGeometry(1.2, 1.2, 0.8, 24);
const createWheel = (x, z) => {
    const w = new THREE.Mesh(wheelGeo, carMat);
    w.rotation.x = Math.PI / 2;
    w.position.set(x, 0, z);
    return w;
};

carGroup.add(carBody, createWheel(3, 2.2), createWheel(-3, 2.2), createWheel(3, -2.2), createWheel(-3, -2.2));
carGroup.scale.set(1.2, 1.2, 1.2);
carGroup.position.set(7, -75, -5); 
scene.add(carGroup);

// 4. Education (Atomic / Knowledge Mesh)
const eduMat = new THREE.MeshBasicMaterial({ color: 0xb366ff, wireframe: true, transparent: true, opacity: 0.35 });
const eduGroup = new THREE.Group();
const coreLayer = new THREE.Mesh(new THREE.IcosahedronGeometry(2, 1), eduMat);
const ring1 = new THREE.Mesh(new THREE.TorusGeometry(4, 0.05, 16, 100), eduMat);
ring1.rotation.x = Math.PI / 2;
const ring2 = new THREE.Mesh(new THREE.TorusGeometry(4, 0.05, 16, 100), eduMat);
ring2.rotation.y = Math.PI / 3; ring2.rotation.x = Math.PI / 2;
const ring3 = new THREE.Mesh(new THREE.TorusGeometry(4, 0.05, 16, 100), eduMat);
ring3.rotation.y = (Math.PI / 3) * 2; ring3.rotation.x = Math.PI / 2;
eduGroup.add(coreLayer, ring1, ring2, ring3);
eduGroup.scale.set(1.2, 1.2, 1.2);
// The Education text is right-aligned, so the mesh sits elegantly on the left
eduGroup.position.set(-7, -100, -3); 
scene.add(eduGroup);

// Position camera off-center for a cinematic look
camera.position.z = 22;
camera.position.x = 8;
camera.position.y = 2;
camera.lookAt(0, 0, 0);

// ------------- Mouse-Trail Node Graph -------------
const canvasGraph = document.getElementById('cursor-canvas');
const ctx = canvasGraph.getContext('2d');

let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2, targetX: window.innerWidth / 2, targetY: window.innerHeight / 2 };
let nodes = [];

function resizeCanvas() {
    canvasGraph.width = window.innerWidth;
    canvasGraph.height = window.innerHeight;
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

window.addEventListener('mousemove', (e) => {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
    
    // Add a node every few frames of movement
    if (Math.random() > 0.4) {
        nodes.push({
            x: mouse.targetX,
            y: mouse.targetY,
            life: 1.0,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5
        });
    }
});

// ------------- Parallax Scroll -------------
const wingSchematic = document.getElementById('wing-schematic');
const chassisSchematic = document.getElementById('chassis-schematic');
let currentScrollY = 0;
let targetScrollY = 0;

window.addEventListener('scroll', () => {
    targetScrollY = window.scrollY;
});

// Animation Loop
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();
    
    // Smooth rotation for geometries
    heroGroup.children[0].rotation.x = time * 0.2; 
    heroGroup.children[0].rotation.y = time * 0.15;
    heroGroup.children[1].rotation.x = time * -0.15; 
    heroGroup.children[1].rotation.z = time * 0.1;
    heroGroup.children[2].rotation.x = time * 0.1; 
    heroGroup.children[2].rotation.y = time * -0.2;

    planeGroup.rotation.y = time * 0.1;
    planeGroup.rotation.z = Math.sin(time * 0.1) * 0.05;
    
    rocketGroup.rotation.y = time * 0.08;
    rocketGroup.rotation.z = Math.sin(time * 0.1) * 0.05;
    
    carGroup.rotation.y = time * -0.05;
    
    eduGroup.rotation.y = time * 0.1;
    eduGroup.rotation.x = time * 0.08;

    // Smooth mouse position interpolation (lerp)
    mouse.x += (mouse.targetX - mouse.x) * 0.1;
    mouse.y += (mouse.targetY - mouse.y) * 0.1;

    // Pan camera down based on scroll
    const scrollOffset = currentScrollY * 0.035;

    // Optional: link mouse to slight camera pivot
    camera.position.x = 8 + (mouse.x / window.innerWidth - 0.5) * 2;
    camera.position.y = 2 - scrollOffset - (mouse.y / window.innerHeight - 0.5) * 2;
    camera.lookAt(0, -scrollOffset, 0);

    renderer.render(scene, camera);

    // Smooth Scroll interpolation for parallax
    currentScrollY += (targetScrollY - currentScrollY) * 0.1;
    
    if (wingSchematic) {
        wingSchematic.style.transform = `translateY(${currentScrollY * -0.15}px)`;
    }
    if (chassisSchematic) {
        chassisSchematic.style.transform = `translateY(${currentScrollY * -0.08}px)`;
    }

    // Graph Canvas Animation
    ctx.clearRect(0, 0, canvasGraph.width, canvasGraph.height);
    
    // Draw cursor center dot
    ctx.beginPath();
    ctx.arc(mouse.x, mouse.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.fill();
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(255, 255, 255, 0.8)';
    ctx.fill();
    ctx.shadowBlur = 0;

    // Update nodes
    for (let i = nodes.length - 1; i >= 0; i--) {
        let p = nodes[i];
        p.life -= 0.015; // Fade out speed
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.life <= 0) {
            nodes.splice(i, 1);
            continue;
        }

        // Connect nodes to mouse
        const distToMouse = Math.hypot(p.x - mouse.x, p.y - mouse.y);
        if (distToMouse < 200) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - distToMouse/200) * p.life * 0.4})`;
            ctx.lineWidth = 1;
            ctx.stroke();
        }

        // Connect nearby nodes
        for (let j = i - 1; j >= 0; j--) {
            let p2 = nodes[j];
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < 80) {
                ctx.beginPath();
                ctx.moveTo(p.x, p.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.strokeStyle = `rgba(255, 255, 255, ${(1 - dist/80) * p.life * 0.2})`;
                ctx.lineWidth = 0.5;
                ctx.stroke();
            }
        }
        
        // Draw node dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.life * 0.6})`;
        ctx.fill();
    }
}

// Start loops
animate();
