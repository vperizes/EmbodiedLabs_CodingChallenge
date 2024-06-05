import { useEffect } from "react";
import * as THREE from "three";
import { useAllUsersContext } from "../App";

const Cube = () => {
  const { users } = useAllUsersContext();

  const renderCube = () => {
    const width = 1000;
    const height = 800;

    //initiliaze camera (fov, aspect ratio, near plane, far plane)
    const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
    camera.position.z = 1;

    // set up scene
    const scene = new THREE.Scene();

    //init renderer
    const canvas = document.getElementById("ThreeJSCanvas");
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(width, height);

    //create cube geo and mesh
    const box_geo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const box = new THREE.Mesh(box_geo, box_material);
    box.rotateX(10);
    scene.add(box);

    ///Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    ambientLight.castShadow = true;
    // add light to scene
    scene.add(ambientLight);

    renderer.render(scene, camera);

    //need to append renderer to DOM
    document.body.appendChild(renderer.domElement);
  };

  useEffect(() => {
    if (users.length > 0) {
      renderCube();
    }
  }, []);

  return (
    <div>
      <canvas id="ThreeJSCanvas" />
    </div>
  );
};
export default Cube;
