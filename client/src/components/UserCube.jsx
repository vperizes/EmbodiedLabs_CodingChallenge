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
    camera.position.z = 5;

    //Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    ambientLight.castShadow = true;
    scene.add(ambientLight);

    // create rounded cube
    users.forEach((user, index) => {
      const cube_geo = new RoundedBoxGeometry(1, 1, 1, 4, 0.1);
      const material = new THREE.MeshNormalMaterial({ wireframe: true });
      const roundedCube = new THREE.Mesh(cube_geo, material);

      roundedCube.position.x = (index % 5) * 1.5 - 3; //arrange in a grid of 5 per row
      roundedCube.position.y = Math.floor(index / 5) * 1.5;
      scene.add(roundedCube);
    });

    const canvas = document.getElementById("ThreeJSCanvas");
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    //controls
    const controls = new OrbitControls(camera, renderer.domElement);

    const animate = () => {
      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(animate); //recursively running animate every frame
    };
    animate();
  }, [users]);

  return (
    <div>
      <canvas id="ThreeJSCanvas" />
    </div>
  );
};
export default UserCube;
