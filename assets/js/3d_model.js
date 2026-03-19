const isMobile = /Mobi|Android/i.test(navigator.userAgent);
if(!isMobile)
    {init3dScene();}
else{
    document.getElementById('mobile-warning').style.display = 'block';
}
function init3dScene(){
  // creazione scena
  const scene = new THREE.Scene();
  const canvas = document.getElementById("canvas3d");
  
  // camera
  const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000);
  camera.position.z = 2.5;
  
  // Renderer
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  canvas.appendChild(renderer.domElement);
  
  // luci
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444);
  scene.add(hemiLight);
  const dirLight = new THREE.DirectionalLight(0xffffff, 1);
  dirLight.position.set(5, 5, 5);
  scene.add(dirLight);

  // controlli mouse
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;    
  controls.dampingFactor = 0.05;
  controls.enableZoom = true;       
  controls.enablePan = false;
  
  let model;
  let mixer;
  // carico il modello
  const loader = new THREE.GLTFLoader();
  loader.load(MODEL_PATH, function(gltf) {
    // inseriamo il modello scalato
    model = gltf.scene;
    model.scale.set(1.2, 1.2, 1.2);
    scene.add(model);
    // aggiungiamo le animazioni
    mixer = new THREE.AnimationMixer(model);
    gltf.animations.forEach((clip) => {
      const action = mixer.clipAction(clip);
      action.setLoop(THREE.LoopPingPong, Infinity);
      action.play();
      action.timeScale = 0.5;
    });

  }, undefined, function(error) {
      console.error(error);
  });
  
  // movimento oggetto + animazioni
  const clock = new THREE.Clock();
  function animate() {
      requestAnimationFrame(animate);
      if (model) model.rotation.y += 0.01;
      const delta = clock.getDelta();
      if (mixer) mixer.update(delta);
      controls.update();
      renderer.render(scene, camera);
  }
  animate();
  
  // Resize
  function onWindowResize() {
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  }
  window.addEventListener('resize', onWindowResize);
  onWindowResize();
}
