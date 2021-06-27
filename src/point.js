export class Point {

  constructor(x, y) {
      this.x = x
      this.y = y
  }
  
  [Symbol.for('+')](other) {
      const x = this.x + other.x
      const y = this.y + other.y
      return new Point(x, y)
  }
}
