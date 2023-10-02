import test from 'node:test'
import assert from 'node:assert'
import { stringOrNull, add, thrower, failer } from '../lib/index.mjs'

test('add', () => {
  assert.equal(add(1, 2), 3)
  assert.equal(add('a', 'b'), 'ab')
  assert.equal(add(1, 'a'), null)
  assert.equal(add('a', 1), null)
  assert.equal(add(), null)
  assert.equal(add({}, 1), null)
})

test('stringOrNull', () => {
  assert.equal(stringOrNull('a'), 'a')
  assert.equal(stringOrNull({ toString: () => 'x' }), 'x')
  assert.equal(stringOrNull(false), null)
  assert.equal(stringOrNull(''), null)
  assert.equal(stringOrNull(1), '1')
})

test('suite of tests that fail', async t => {
  await t.test('uhoh, this one throws', () => {
    assert.equal(thrower(0), '1970-01-01T00:00:00.000Z')
    assert.equal(thrower(1234567891011), '2009-02-13T23:31:31.011Z')
    assert.equal(thrower({}), 'Invalid Date')
  })

  await t.test('failer', () => {
    assert.equal(failer(1), '2')
    assert.equal(failer(-1), '0')
    // we expect it to convert string numbers to Number, but doesn't do that
    assert.equal(failer('1'), '2')
    // we expect it to convert non-numerics to 0, but that doesn't happen
    assert.equal(failer({}), '1')
  })
})
