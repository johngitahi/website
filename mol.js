let element = document.querySelector("#mol");
let config = { backgroundColor: '#e6f5d0' };
let viewer = $3Dmol.createViewer(element, config);

let sdfUri = 'assets/psilocin.sdf';

fetch(sdfUri)
  .then(response => {
    if (!response.ok) throw new Error("File not found");
    return response.text();
  })
  .then(sdf => {
    viewer.addModel(sdf, "sdf");

    viewer.setStyle({}, {
	line: { linewidth: 1.5, colorscheme: "Jmol" }
    });

    viewer.zoomTo();
    viewer.render();

    let angle = 0;
    let rotationSpeed = 0.08;
    const maxSpeed = 0.5;
    const acceleration = 0.002;

    let isPaused = false;
    let lastInteractionTime = null;

    function animate() {
      const now = Date.now();

      if (isPaused && lastInteractionTime && now - lastInteractionTime > 10000) {
        isPaused = false;
      }

      if (!isPaused) {
        angle += rotationSpeed;
        viewer.rotate(rotationSpeed, "y");
        viewer.render();

        if (rotationSpeed < maxSpeed) {
          rotationSpeed += acceleration;
        }
      }

      requestAnimationFrame(animate);
    }

    animate();

    ["mousedown", "touchstart"].forEach(event => {
      element.addEventListener(event, () => {
        isPaused = true;
        lastInteractionTime = Date.now();
      });
    });
  })
  .catch(error => {
    console.error("Error loading " + sdfUri, error);
  });
