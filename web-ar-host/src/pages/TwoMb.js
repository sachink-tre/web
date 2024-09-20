import * as THREE from 'three';
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import React, {useState} from 'react';

import { useEffect, useRef } from "react";

function TwoMb() {
  const refContainer = useRef(null);
  const [showLoader, setShowLoader] = useState(true);
  const renderedRef = useRef(new THREE.WebGLRenderer());
  const sceneRef = useRef(new THREE.Scene())
  const cameraRef = useRef(new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000))
  const navigate = useNavigate();

  //3D model house 1.4 MB
  const modelUrl2 = 'https://storageinstaxcommondev.blob.core.windows.net/instax-test-container/house_1_4MB.glb?sp=r&st=2024-09-20T04:28:38Z&se=2025-01-01T12:28:38Z&spr=https&sv=2022-11-02&sr=b&sig=y2aPxfUhFAPBpGtceAeNm7BSCxkXS76PALNUe2Et4Ys%3D'
  useEffect(() => {
    // === THREE.JS CODE START ===
    sceneRef.current.background = new THREE.Color('skyblue')
    renderedRef.current.setSize(window.innerWidth, window.innerHeight);
    refContainer.current && refContainer.current.appendChild( renderedRef.current.domElement );
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Adjust color and intensity as needed
    sceneRef.current.add(ambientLight);

    (async () => {
       const model =  await loadModel(modelUrl2)
       setShowLoader(false)
       //mode 4
       model.rotation.set(0,0,0)
       model.position.set(0,0,0)
       model.scale.set(0.009,0.009,0.001)

       //model 2
    //    model.rotation.set(0,45,0)
    //    model.position.set(0,0,4.2)
    //    model.scale.set(0.002,0.001,0.001)

    // document.body.appendChild( renderer.domElement );
    // use ref as a mount point of the Three.js scene instead of the document.body
    // var geometry = new THREE.BoxGeometry(1, 1, 1);
    // var material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // var cube = new THREE.Mesh(geometry, material);
    sceneRef.current.add(model);
    cameraRef.current.position.z = 5;

    animate();
    })()

    var animate = function () {
      requestAnimationFrame(animate);
    //   cube.rotation.x += 0.01;
    //   cube.rotation.y += 0.01;
      renderedRef.current.render(sceneRef.current, cameraRef.current);
    };
  }, []);

  function loadModel(file) {
    return new Promise((res, rej) => {
      const loader = new GLTFLoader()
      loader.load(file, (gltf) => {
        res(gltf.scene)
      }, undefined, (error) => {
        rej(error)
      })
    })
  }
  
  return (
    <div ref={refContainer}>
        <button type="button" onClick={() => navigate('/')}>Home</button>
        {showLoader ? <h1>Loading..</h1> : null}
    </div>

  );
}

export default TwoMb