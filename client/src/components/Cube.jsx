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

    // Function to create a texture from text
    const createTextTexture = (text) => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = 256;
      canvas.height = 256;
      context.fillStyle = "#ffffff";
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.fillStyle = "#000000";
      context.font = "24px Arial";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(text, canvas.width / 2, canvas.height / 2);
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    const materials = users.map((user) => {
      const name = `${user.first_name} ${user.last_name}`;
      return new THREE.MeshBasicMaterial({
        map: createTextTexture(name),
      });
    });

    while (materials.length < 6) {
      materials.push(new THREE.MeshBasicMaterial({ color: 0x000000 }));
    }

    //create cube geo and mesh
    const cube_geo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const cube = new THREE.Mesh(cube_geo, materials);
    cube.rotation.x = 0.5;
    cube.rotation.y = 0.5;
    scene.add(cube);

    ///Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.castShadow = true;
    spotLight.position.set(0, 0.5, 20);
    scene.add(spotLight);

    renderer.render(scene, camera);

    //need to append renderer to DOM
    document.body.appendChild(renderer.domElement);
  };

  //pass in users as dependecy arr --> effect will run whenever users changes
  useEffect(() => {
    if (users.length > 0) {
      renderCube();
    }
  }, [users]);

  return (
    <div>
      <canvas id="ThreeJSCanvas" />
    </div>
  );
};
export default Cube;
