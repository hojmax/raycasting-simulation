class Scene {
  constructor() {
    this.segmentArray = []
    this.lightSourcePos = createVector(250, 250)
  }
  drawSegments() {
    for (let e of this.segmentArray) {
      e.draw()
    }
  }
  getIntersectionPointOnScene(ray) {
    let intersectionPoints = []
    for (let e of this.segmentArray) {
      intersectionPoints.push([Segment.getRayIntersection(ray, e), Segment.getIntersectionScalarS1(ray, e)])
    }
    let shortestDistance = Infinity
    let point;
    for (let e of intersectionPoints) {
      if (e[0] != undefined && e[1] < shortestDistance) {
        shortestDistance = e[1]
        point = e[0]
      }
    }
    return point
  }
  addSegment(x1, y1, x2, y2) {
    this.segmentArray.push(new Segment(x1, y1, x2, y2, "cartesian"))
  }
  getLightSourceVertices() {
    let rays = []
    for (let e of this.segmentArray) {
      rays.push(new Segment(this.lightSourcePos.x, this.lightSourcePos.y, e.origin.x, e.origin.y, "cartesian"))
      rays.push(new Segment(this.lightSourcePos.x, this.lightSourcePos.y, e.end.x, e.end.y, "cartesian"))
    }
    let deltaAngle = 0.0001
    for (let i = rays.length - 1; i >= 0; i--) {
      rays.push(new Segment(this.lightSourcePos.x, this.lightSourcePos.y, rays[i].angle + deltaAngle, 1, "polar"))
      rays.push(new Segment(this.lightSourcePos.x, this.lightSourcePos.y, rays[i].angle - deltaAngle, 1, "polar"))
    }
    quickSortSegments(rays, 0, rays.length - 1)
    let intersectionPoints = []
    for (let e of rays) {
      intersectionPoints.push(this.getIntersectionPointOnScene(e))
    }
    return intersectionPoints
  }
  drawLightSource() {
    let scenePoints = scene.getLightSourceVertices()
    push()
    noStroke()
    beginShape()
    for (let e of scenePoints) {
      if (e != undefined) {
        vertex(e.x, e.y)
      }
    }
    endShape()
    pop()
  }
}
