import { useEffect, useState } from "react";
import { useAllUsersContext } from "../App";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

const UserCube = () => {
  const { users } = useAllUsersContext();
  const [userProfile, setUserProfile] = useState({});
  const { first_name, last_name, email, cell_phone, profile_pic, user_id } =
    userProfile;

  const handleUserDetails = (user_data) => {
    setUserProfile(user_data);
  };

  useEffect(() => {
    //init scene
    const scene = new THREE.Scene();

    //camera set up
    const width = window.innerWidth * 0.9;
    const height = window.innerHeight * 0.8;
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
      roundedCube.name = user.first_name;
      roundedCube.position.x = (index % 5) * 2 - 4; //arrange in a grid of 5 per row
      roundedCube.position.y = -2;
      roundedCube.rotateX(5);
      scene.add(roundedCube);
      cubes.push(roundedCube);
    });

    // cubes.forEach((cube) => {
    //   scene.add(cube);
    // });

    const canvas = document.getElementById("ThreeJSCanvas");
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(width, height);
    document.body.appendChild(renderer.domElement);

    //controls
    //const controls = new OrbitControls(camera, renderer.domElement);

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
        const intersectedObj = intersects[0].object;
        cubes.forEach((cube) => {
          if (intersectedObj.name == cube.name) {
            intersectedObj.material.wireframe = false;
            handleUserDetails(cube.userData);
            console.log(intersectedObj);
          }
        });
      }
    };

    const animate = () => {
      //controls.update();
      renderer.render(scene, camera);
    };
    window.addEventListener("click", onMouseClick);
    renderer.setAnimationLoop(animate);

    // clean up event listener on component unmount
    return () => {
      window.removeEventListener("click", onMouseClick);
    };
  }, [users]);

  //used to check if userProfile obj is empty
  const isObjEmpty = (objName) => {
    return Object.keys(objName).length === 0 && objName.constructor == Object;
  };

  return (
    <div>
      <canvas id="ThreeJSCanvas"></canvas>
      {isObjEmpty(userProfile) ? (
        <h2>Click on a box to display a user</h2>
      ) : (
        <div className="user-details">
          <p>
            {first_name} {last_name}
          </p>
          <p>{email}</p>
          <p>{cell_phone}</p>
        </div>
      )}
    </div>
  );
};
export default UserCube;
