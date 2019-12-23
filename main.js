let scene;

function setup() {
  cnv = createCanvas(500, 700)
  scene = new Scene()
  //Border
  scene.addSegment(0, 0, width - 1, 0)
  scene.addSegment(width - 1, 0, width - 1, height - 1)
  scene.addSegment(width - 1, height - 1, 0, height - 1)
  scene.addSegment(0, height - 1, 0, 0)
  //Objects
  scene.addSegment(100, 200, 200, 100)
  scene.addSegment(80, 530, 200, 600)
  scene.addSegment(300, 300, 400, 300)
  scene.addSegment(400, 300, 400, 400)
  scene.addSegment(400, 400, 300, 400)
  scene.addSegment(300, 400, 300, 300)
  fill(255)
}

function draw() {
  background(200)
  scene.lightSourcePos = createVector(mouseX, mouseY)
  scene.drawLightSource()
  scene.drawSegments()
}
