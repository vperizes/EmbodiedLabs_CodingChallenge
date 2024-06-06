import { useEffect } from "react";
import { useAllUsersContext } from "../App";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

const Cube = () => {
  const { users } = useAllUsersContext();

  const renderCube = () => {
    const width = 1000;
    const height = 800;

    //initiliaze camera (fov, aspect ratio, near plane, far plane)
    const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 20);
    camera.position.z = 3;

    // set up scene
    const scene = new THREE.Scene();

    //init renderer
    const canvas = document.getElementById("ThreeJSCanvas");
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(width, height);

    //need to append renderer to DOM
    document.body.appendChild(renderer.domElement);

    //set up controls
    const controls = new OrbitControls(camera, renderer.domElement);

    // Fn creates a canvas, draws text on it, and converts the canvas into a texture.
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
      return new THREE.MeshStandardMaterial({
        map: createTextTexture(name),
      });
    });

    while (materials.length < 6) {
      materials.push(new THREE.MeshStandardMaterial({ color: 0x000000 }));
    }

    //create cube geo and mesh
    const roundedCube_geo = new RoundedBoxGeometry(1, 1, 1, 4, 0.1);
    const roundedCube = new THREE.Mesh(roundedCube_geo, materials);
    roundedCube.rotation.x = 0.5;
    roundedCube.rotation.y = 0.5;
    scene.add(roundedCube);

    ///Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const spotLight = new THREE.SpotLight(0xffffff, 1);
    spotLight.castShadow = true;
    spotLight.position.set(0, 0.5, 20);
    scene.add(spotLight);

    const pointer = new THREE.Vector2();
    const raycaster = new THREE.Raycaster();

    const onClickFace = (event) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      pointer.y = (event.clientY / window.innerWidth) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);
      const intersect = raycaster.intersectObject(materials);
      console.log(intersect);
    };

    window.addEventListener("click", onClickFace);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();
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
