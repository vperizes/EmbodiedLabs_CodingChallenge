import { useEffect } from "react";
import * as THREE from "three";

const Cube = () => {
  const renderCube = () => {
    const width = 1000,
      height = 800;

    //initiliaze camera (fov, aspect ratio, near plane, far plane)
    const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
    camera.position.z = 1;

    // set up scene
    const scene = new THREE.Scene();

    //init renderer
    const canvas = document.getElementById("ThreeJSCanvas");
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(width, height);

    //create box geo and mesh
    const box_geo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const box_material = new THREE.MeshNormalMaterial();
    const box_mesh = new THREE.Mesh(box_geo, box_material);
    box_mesh.rotateX(10);
    scene.add(box_mesh);

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
    renderCube();
  }, []);

  return (
    <div>
      <canvas id="ThreeJSCanvas" />
    </div>
  );
};
export default Cube;
