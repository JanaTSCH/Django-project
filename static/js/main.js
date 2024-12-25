    import * as THREE from 'three';
    import { XYZLoader } from 'three/addons/loaders/XYZLoader.js';
    import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

    let camera, scene, renderer, clock, points, controls;

    // init();

    function init() {
        const container = document.getElementById('three-container'); // Новый контейнер

        if (!container) return; // Если контейнера нет, выходим

        // Удаляем старый рендерер (если есть)
        if (renderer) {
            renderer.dispose();
            container.innerHTML = '';
        }

        camera = new THREE.PerspectiveCamera(7, container.offsetWidth / container.offsetHeight, 0.1, 100);
        camera.position.set(10, 7, 10);

        scene = new THREE.Scene();
        scene.add(camera);
        scene.background = new THREE.Color(0x1a0a7a);

        camera.lookAt(scene.position);

        clock = new THREE.Clock();

        const loader = new XYZLoader();
        loader.load('/static/js/helix_201.xyz', function (geometry) {
            geometry.center();
            const vertexColors = geometry.hasAttribute('color');
            const material = new THREE.PointsMaterial({ size: 0.3, vertexColors: vertexColors });
            points = new THREE.Points(geometry, material);
            scene.add(points);
        });

        renderer = new THREE.WebGLRenderer({ antialias: true }); // antialias: true, alpha: true
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(container.offsetWidth, container.offsetHeight);
        renderer.setAnimationLoop(animate);
        container.appendChild(renderer.domElement); // Добавляем рендер в контейнер

        // Добавляем управление мышью с помощью OrbitControls
        controls = new OrbitControls( camera, renderer.domElement );
        controls.enableDamping = true;  // Плавное затухание вращения
        controls.dampingFactor = 0.05;  // Коэффициент затухания
        controls.enableZoom = false;    // Отключаем масштабирование

        window.addEventListener('resize', onWindowResize);
    }

    function onWindowResize() {
        const container = document.getElementById('three-container');
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.offsetWidth, container.offsetHeight); //renderer.setSize( window.innerWidth, window.innerHeight );
    }

    function animate() {
        const delta = clock.getDelta();
        if (points) {
            points.rotation.x += delta * 0.2;
            points.rotation.y += delta * 0.3;

            controls.update();  // Обновляем управление камерой в каждом кадре
        }
        renderer.render(scene, camera);
    }

    document.addEventListener('DOMContentLoaded', init);
