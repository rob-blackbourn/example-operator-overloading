'operator-overloading enabled'

import { Fraction } from './fraction'
import { Point } from './point'

// Check primitives still work
const i1 = 3
const i2 = 4
const i3 = i1 + i2
console.log(i3)

// Check overloads work
const p1 = new Point(5, 5)
const p2 = new Point(2, 3)
const p3 = p1 + p2
console.log(p3)

// What happens with nulls?
const s1 = null
const s2 = 'hello'
const s3 = s1 + s2
console.log(s3)

// Fun with fractions.
const f1 = new Fraction(1, 2)
const f2 = f1 * f1
console.log(f2.toString())


console.log('Done')