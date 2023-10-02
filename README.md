# node-test-example

An example showing `node:test`, `node --test`, `import 'tap'` and
`tap run` being used together, and how they interoperate.

This contains a `test/tap.test.js` and `test/node.test.js`, which
both run essentially the same tests, one using
[`tap`](https://node-tap.org) and the other using
[`node:test`](https://nodejs.org/api/test.html)

## The tests fail!

I know. That's kinda the point.

* `npm run test:node` Executes both test suite files with the
  `node --test` runner.
* `npm run test:tap` Execute both test suite files with the
  `tap` runner.

In both cases, you can see that the results are pretty similar.

## Differences

- When running with the `tap` runner, they're almost identical.
  The main thing is that the `node:test` doesn't provide
  per-assertion reporting, so you only see a report on the test
  block, and possibly the first failure, not all the assertions
  within it.
- When running with the `node --test` runner, the `tap` test
  provides diffs and source callsite printing, while the
  `node:test` test shows a `console.log()` of the thrown Error.

Of course, the two runners produce very different output overall,
but they should both be pretty sensible.

Personally, I think the tap runner is a lot more useful, and
certainly if you write tests in TypeScript (or use tap's `import`
mocking) it's nice to not have to specify the `--loader` and
`--import` arguments explicitly.

But on the flip side, that fanciness comes with a cost. With
TypeScript disabled, `tap` runs these two tests in about 450ms on
my system (350ms or so with coverage disabled), while `node
--test` does it in around 170ms. In both cases, the
`test/tap.test.js` test takes around 150ms to run, and the
`test/node.test.js` takes under 10ms.

Real world tests doing complicated stuff would show a less
dramatic difference, so this is in no way a representative
benchmark, but as always, performance and features are
fundamentally opposed, because features require running code, and
not running code is always faster.

The goal of the `node:test` interoperability in node-tap is to
make it possible for you to get the best of both worlds. You
could have part of your test suite written as `node:test` tests,
if they don't need `t.mockImport` or TypeScript, and other tests
written in `tap`.

## Coverage

The `test:mix` and `test:cross` show using the `node --test` and
`tap` runners so that they dump coverage into the same folder.
Then you can use `tap report` to report on it.
