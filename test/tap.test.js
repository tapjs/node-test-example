import t from 'tap'
import { stringOrNull, add, thrower, failer } from '../lib/index.mjs'

t.test('add', t => {
  t.equal(add(1, 2), 3)
  t.equal(add('a', 'b'), 'ab')
  t.equal(add(1, 'a'), null)
  t.equal(add('a', 1), null)
  t.equal(add(), null)
  t.equal(add({}, 1), null)
  t.end()
})

t.test('stringOrNull', t => {
  t.equal(stringOrNull('a'), 'a')
  t.equal(stringOrNull({ toString: () => 'x' }), 'x')
  t.equal(stringOrNull(false), null)
  t.equal(stringOrNull(''), null)
  t.equal(stringOrNull(1), '1')
  t.end()
})

t.test('uhoh, this one throws', t => {
  t.equal(thrower(0), '1970-01-01T00:00:00.000Z')
  t.equal(thrower(1234567891011), '2009-02-13T23:31:31.011Z')
  t.equal(thrower({}), 'Invalid Date')
  t.end()
})

t.test('failer', t => {
  t.equal(failer(1), '2')
  t.equal(failer(-1), '0')
  // we expect it to convert string numbers to Number, but doesn't do that
  t.equal(failer('1'), '2')
  // we expect it to convert non-numerics to 0, but that doesn't happen
  t.equal(failer({}), '1')
  t.end()
})
