// @flow

import test from 'ava';
import parseCommand from '../../../src/parsers/parseCommand';

test('parses a single command', (t): void => {
  t.deepEqual(parseCommand('foo'), [
    {
      parameters: [],
      subroutine: 'foo'
    }
  ]);
});

test('parses a single command with parameters', (t): void => {
  t.deepEqual(parseCommand('foo bar baz'), [
    {
      parameters: [
        'bar',
        'baz'
      ],
      subroutine: 'foo'
    }
  ]);
});

test('parses multiple commands (separated using the pipe operator)', (t): void => {
  t.deepEqual(parseCommand('foo | bar'), [
    {
      parameters: [],
      subroutine: 'foo'
    },
    {
      parameters: [],
      subroutine: 'bar'
    }
  ]);
});

test('parses multiple commands with parameters (separated using the pipe operator)', (t): void => {
  t.deepEqual(parseCommand('foo a0 b0 c0 | bar a1 b1 c1'), [
    {
      parameters: [
        'a0',
        'b0',
        'c0'
      ],
      subroutine: 'foo'
    },
    {
      parameters: [
        'a1',
        'b1',
        'c1'
      ],
      subroutine: 'bar'
    }
  ]);
});

test('parses a single command with escaped parameters', (t): void => {
  t.deepEqual(parseCommand('foo a \'b\' "c"'), [
    {
      parameters: [
        'a',
        'b',
        'c'
      ],
      subroutine: 'foo'
    }
  ]);
});
