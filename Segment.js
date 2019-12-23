class Segment {
  constructor(x1, y1, a, b, type) {
    this.origin = createVector(x1, y1)
    if (type == "cartesian") {
      this.end = createVector(a, b)
      this.angle = this.calculateAngle()
    } else if (type == "polar") {
      this.angle = a
      this.end = createVector(x1 + Math.cos(this.angle) * b, y1 + Math.sin(this.angle) * b)
    }
    this.direction = createVector(this.end.x - this.origin.x, this.end.y - this.origin.y)
  }
  draw() {
    line(this.origin.x, this.origin.y, this.end.x, this.end.y)
  }
  static getIntersectionScalarS1(s1, s2) {
    let o1x = s1.origin.x
    let o1y = s1.origin.y
    let d1x = s1.direction.x
    let d1y = s1.direction.y
    let o2x = s2.origin.x
    let o2y = s2.origin.y
    let d2x = s2.direction.x
    let d2y = s2.direction.y
    return ((-o2y + o1y) * d2x - d2y * (o1x - o2x)) / (d1x * d2y - d1y * d2x)
  }
  static getIntersectionScalarS2(s1, s2) {
    let o1x = s1.origin.x
    let o1y = s1.origin.y
    let d1x = s1.direction.x
    let d1y = s1.direction.y
    let o2x = s2.origin.x
    let o2y = s2.origin.y
    let d2x = s2.direction.x
    let d2y = s2.direction.y
    return ((-o2y + o1y) * d1x - d1y * (o1x - o2x)) / (d1x * d2y - d1y * d2x)
  }
  static isOverlapping(s1, s2) {
    let t = Segment.getIntersectionScalarS1(s1, s2);
    let s = Segment.getIntersectionScalarS2(s1, s2);
    return (0 <= t && t <= 1 && 0 <= s && s <= 1)
  }
  static getRayIntersection(ray, s2) {
    let t = Segment.getIntersectionScalarS1(ray, s2);
    let s = Segment.getIntersectionScalarS2(ray, s2);
    if (0 <= s && s <= 1 && 0 <= t) {
      return p5.Vector.add(s2.origin, p5.Vector.mult(s2.direction, s))
    } else {
      return undefined
    }
  }
  calculateAngle() {
    let angle = Math.atan((this.end.y - this.origin.y) / (this.end.x - this.origin.x))
    if (this.origin.x > this.end.x) {
      angle += PI
    } else if (this.origin.y > this.end.y) {
      angle += TWO_PI
    }
    return angle
  }
}
