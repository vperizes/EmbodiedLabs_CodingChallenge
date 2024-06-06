import { useEffect } from "react";
import { useAllUsersContext } from "../App";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

const UserCube = () => {
  const { users } = useAllUsersContext();

  useEffect(() => {
    //init scene
    const scene = new THREE.Scene();

    //camera set up
    const width = window.innerWidth;
    const height = window.innerHeight;
    const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
    camera.position.z = 6;

    //Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    ambientLight.castShadow = true;
    scene.add(ambientLight);

    // create rounded cube. add user data to each cube
    const cubes = [];
    users.forEach((user, index) => {
      const cube_geo = new RoundedBoxGeometry();
      const material = new THREE.MeshNormalMaterial({ wireframe: true });
      const roundedCube = new THREE.Mesh(cube_geo, material);
      roundedCube.userData = user; //store user info in userData obj
      roundedCube.position.x = (index % 5) * 1.5 - 3; //arrange in a grid of 5 per row
      roundedCube.rotateX(10);
      cubes.push(roundedCube);
    });

    cubes.forEach((cube) => {
      scene.add(cube);
    });

    const canvas = document.getElementById("ThreeJSCanvas");
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    //controls
    const controls = new OrbitControls(camera, renderer.domElement);

    //setup ray casting for object mouse over
    const rayCaster = new THREE.Raycaster();
    const mousePos = new THREE.Vector2();

    const onMouseClick = (event) => {
      // calculate pointer position in normalized device coordinates
      // (-1 to +1) for both components

      mousePos.x = (event.clientX / window.innerWidth) * 2 - 1;
      mousePos.y = -(event.clientY / window.innerHeight) * 2 + 1;

      rayCaster.setFromCamera(mousePos, camera);
      const intersects = rayCaster.intersectObjects(scene.children);

      if (intersects.length > 0) {
        intersects[0].object.material.wireframe = false;
      }
    };

    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
    };
    window.addEventListener("click", onMouseClick);

    renderer.setAnimationLoop(animate);
  }, [users]);

  return (
    <div>
      <canvas id="ThreeJSCanvas" />
    </div>
  );
};
export default UserCube;
