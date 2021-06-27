"use strict";
  
export class Fraction {

  constructor (numerator, denominator) {
    if (Number.isInteger(numerator) && Number.isInteger(denominator)) {
      if (denominator === 0) {
        this.numerator = 1
        this.denominator = 0
      } else if (numerator === 0) {
        this.numerator = 0
        this.denominator = 1
      } else {
        var factor = Fraction.gcd(numerator, denominator)
        denominator /= factor
        if (denominator < 0) {
          this.numerator = -numerator / factor
          this.denominator = -denominator
        } else {
          this.numerator = numerator / factor
          this.denominator = denominator
        }
      }
    } else {
      this.numerator = 1
      this.denominator = 0
    }
  }

  static gcd(a, b) {
    if (b === 0) {
      return a;
    } else {
      return Fraction.gcd(b, a % b)
    }
  }

  static parse(s) {
    let result, numerator, denominator
    if ((result = /^\s*([+-]?\d+)\s+(\d+)\s*\/\s*(\d+)\s*$/.exec(s))) {
      // Fraction with whole part
      const whole = parseInt(result[1])
      numerator = parseInt(result[2])
      denominator = parseInt(result[3])
      numerator = whole >= 0 ? numerator + whole * denominator : -(numerator + -whole * denominator)
    } else if ((result = /^\s*([+-]?\d+)\s*\/\s*(\d+)\s*$/.exec(s))) {
      // Fraction
      numerator = parseInt(result[1])
      denominator = parseInt(result[2])
    } else if ((result = /^\s*([+-]?\d+)\s*$/.exec(s))) {
      // Whole part only
      numerator = parseInt(result[1])
      denominator = 1
    }

    return new Fraction(numerator, denominator)
  }

  isNaN() {
    return this.denominator === 0
  }

  toString() {

    if (this.isNaN()) {
      return Number.NaN.toString()
    }

    var whole = Math.trunc(this.numerator / this.denominator)
    if (whole) {
      var numerator = whole >= 0 ? this.numerator - whole * this.denominator : -this.numerator + whole * this.denominator
      if (numerator === 0) {
        return whole.toString()
      } else {
        return whole + " " + numerator + "/" + this.denominator
      }
    } else {
      return this.numerator + "/" + this.denominator
    }
  }

  valueOf() {
    return this.isNaN() ? Number.NaN : this.numerator / this.denominator
  }

  cmp(value) {
    if (value instanceof Fraction) {
      return (this.numerator * value.denominator) - (value.numerator * this.denominator)
    } else if (typeof(value) === 'number') {
      return this.valueOf() - value
    } else {
      return this - value
    }
  }

  [Symbol.for('==')](other) {
    return this.cmp(other) === 0
  }

  [Symbol.for('!=')](other) {
    return !this.eq(other)
  }

  [Symbol.for('<')](other) {
    return this.cmp(other) < 0
  }

  [Symbol.for('<=')](other) {
    return this.cmp(other) <= 0
  }

  [Symbol.for('>')](other) {
    return this.cmp(other) > 0
  }

  [Symbol.for('>=')](other) {
    return this.cmp(other) >= 0
  }

  [Symbol.for('+')](other) {
    if (other instanceof Fraction) {
      return new Fraction((this.numerator * other.denominator) + (other.numerator * this.denominator), this.denominator * other.denominator);
    } else if (Number.isInteger(other)) {
      return new Fraction(this.numerator + (other * this.denominator), this.denominator);
    } else {
      return this + other;
    }
  };

  [Symbol.for('-')](other) {
    if (other instanceof Fraction) {
      return new Fraction((this.numerator * other.denominator) - (other.numerator * this.denominator), this.denominator * other.denominator);
    } else if (Number.isInteger(other)) {
      return new Fraction(this.numerator - (other * this.denominator), this.denominator);
    } else {
      return this - other;
    }
  };

  [Symbol.for('*')](other) {
    if (other instanceof Fraction) {
      return new Fraction(this.numerator * other.numerator, this.denominator * other.denominator);
    } else if (Number.isInteger(other)) {
      return new Fraction(this.numerator * other, this.denominator);
    } else {
      return this * other;
    }
  };

  [Symbol.for('/')](other) {
    if (other instanceof Fraction) {
      return new Fraction(this.numerator * other.denominator, this.denominator * other.numerator);
    } else if (Number.isInteger(other)) {
      return new Fraction(this.numerator, this.denominator * other);
    } else {
      return this / other;
    }
  };

  abs() {
    return new Fraction(this.numerator >= 0 ? this.numerator : -this.numerator, this.denominator);
  };

  [Symbol.for('minus')](other) {
    return new Fraction(-this.numerator, this.denominator);
  };

  inv() {
    return new Fraction(this.denominator, this.numerator);
  };

  sign() {
    return this.numerator >= 0 ? 1 : -1;
  };

  static fromFloat(x, tolerance) {
    if (!tolerance)
      tolerance = 1.0E-6;

    const sign = x >= 0 ? 1 : -1;
    x *= sign;

    let h1 = 1,
      h2 = 0,
      k1 = 0,
      k2 = 1;
    let b = x
    do {
      const a = Math.floor(b)
      let aux = h1
      h1 = a * h1 + h2
      h2 = aux
      aux = k1
      k1 = a * k1 + k2
      k2 = aux
      b = 1 / (b - a)
    } while (Math.abs(x - h1 / k1) > x * tolerance)

    return new Fraction(Math.trunc(sign * h1), Math.trunc(k1))
  }
}
