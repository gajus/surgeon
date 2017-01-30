# Surgeon

[![Travis build status](http://img.shields.io/travis/gajus/surgeon/master.svg?style=flat-square)](https://travis-ci.org/gajus/surgeon)
[![Coveralls](https://img.shields.io/coveralls/gajus/surgeon.svg?style=flat-square)](https://coveralls.io/github/gajus/surgeon)
[![NPM version](http://img.shields.io/npm/v/surgeon.svg?style=flat-square)](https://www.npmjs.org/package/surgeon)
[![Canonical Code Style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)
[![Twitter Follow](https://img.shields.io/twitter/follow/kuizinas.svg?style=social&label=Follow)](https://twitter.com/kuizinas)

<img src='https://rawgit.com/gajus/surgeon/master/.README/chop.svg' height='200' />

Declarative DOM extraction expression evaluator.

* Supports [selector nesting](#nest-the-selectors).
* Integrates [match validation](#validate-the-result).
* Works in Node.js or in browser.
* Uses domain-specific language (DSL) to:
  * select a defined number of nodes ([Quantifier expression](#quantifier-expression))
  * access [attribute](#attribute-selector) and [property](#property-selector) values
  * use [user-defined functions](#user-defined-functions) to format, filter and validate data

Powerful, succinct, declarative API.

```json
{
  "adopt": {
    "articles": {
      "imageUrl": {
        "extract": {
          "name": "href",
          "type": "attribute"
        },
        "select": "img"
      },
      "summary": "p:first-child",
      "title": ".title"
    },
    "pageTitle": "h1"
  },
  "select": "main"
}

```

> Or even shorter using [action expressions](#action-expressions).
>
> ```json
> {  
>   "adopt": {
>     "pageTitle": "::self",
>     "articles": {
>       "body": ".body @extract(attribute, innerHtml)",
>       "imageUrl": "img @extract(attribute, src)",
>       "summary": "p:first-child @extract(attribute, innerHtml)",
>       "title": ".title"
>     }
>   },
>   "pageTitle": "main > h1"
> }
>
> ```

Have you got suggestions for improvement? [I am all ears](https://github.com/gajus/surgeon/issues).

---

<TOC>

## Query reference

### Query actions

#### `select` action

`select` is used to select an element/ elements.

Default: `::self` (present node selecting itself).

```js
// Selects a single ".foo" element.
// Throws an error if there is more than one match.
x('.foo');

x({
  select: '.foo'
});

x({
  select: {
    selector: '.foo'
  }
});

```

`select` action has a `quantifier` property.

`quantifier` property is used to assert the total match count. When `quantifier` is configured, the response type is an array.

A `quantifier` can be specified as part of the selector using the [quantifier expression](#quantifier-expression).

* Defaults to returning a single node.
* When a quantifier `max` property is equal `1`, returns a single node (or `null` if `min` permits).
* When quantifier is specified (`min` or `max` option) and `max` is greater than `1` (or undefined), returns multiple nodes. `min` defaults to `0` and `max` defaults to `Infinity`.
* When a [`select` action](#select-action) is a direct descendant of an [`adopt` action](#adopt-action), defaults to multiple nodes. `min` defaults to `0` and `max` defaults to `Infinity`.

```js
// Selects 0 or more nodes.
// {@see [quantifier expression](#quantifier-expression)}
x('.foo {0,}');

// Selects 1 or more nodes.
// Throws an error if 0 matches found.
x('.foo {1,}');

// Selects between 0 and 5 nodes.
// Throws an error if more than 5 matches found.
x('.foo {0,5}');

// Selects 0 or more nodes.
x({
  select: {
    quantifier: {
      min: 0
    },
    selector: '.foo'
  }
});

// Select 1 ".foo" node and all descending ".bar" nodes.
x({
  adopt: {
    bar: '.bar'
  },
  select: '.foo'
});
```

#### `extract` action

`extract` is used to extract data from a node.

Extract has two properties:

* `type` can be `property` or `attribute`.
* `name` is the name of the property or the attribute.


Default: uses [property selector](#property-selector) to get the value of the `textContent` property

```js
// Extracts textContent property from .foo element.
x('.foo');

x({
  extract: {
    name: 'innerHTML',
    type: 'property'
  }
  select: '.foo'
});

```

#### `adopt` action

`adopt` is used to adopt other selectors and to name extracted values.

Using `adopt` makes the selector result an object.

```js
// Select all `article` tags.
// For each `article` tag select `.name` and `.body` elements.
x({
  adopt: {
    name: {
      select: '.name'
    },
    body: {
      select: '.body'
    }
  },
  select: 'article'
});

```

## Action expressions

All actions (test, format) can be expressed as part of the [`select` action] string expression, e.g.

```js
x({
  select: '.title',
  test: 'regex(/foo/)'
});

```

The above is an example of [`test` action](#test-action) invocation. The following examples are equivalent invocations using action expression:

```js
x('.title @test(regex, /foo/)');

x({
  select: '.title @test(regex, /foo/)'
});

```

### Quantifier expression

A *quantifier expression* is used to assert that the query matches a set number of nodes. A quantifier expression is a modifier of the [`select` action](#select-action). It uses the following syntax to define a quantifier.

|Name|Syntax|
|---|---|
|Fixed quantifier|`{n}` where `n` is an integer `>= 1`|
|Greedy quantifier|`{n,m}` where `n >= 0` and `m >= n`|
|Greedy quantifier|`{n,}` where `n >= 0`|
|Greedy quantifier|`{,m}` where `m >= 1`|

If this looks familiar, its because I have adopted the syntax from regular expression language. However, unlike in regular expression, a quantifier in the context of Surgeon selector will produce an error (`UnexpectedResultCountError`) if selector result count is out of the quantifier range.

Example:

```js
// Matches 1 result. Returns a single node.
x('.title {1}');

// Matches 0 or 1 result. Returns null or a single node.
x('.title {0,1}');

// Matches any number of results. Returns an array.
x('.title {0,}');

```

## Configuration

|Name|Type|Description|Default value|
|---|---|---|---|
|`evaluator`|[`EvaluatorType`](./src/types.js)|HTML parser and selector engine. |[`browser` evaluator](#browser-evaluator) if `window` and `document` variables are present, [`cheerio`](#cheerio-evaluator) otherwise.|
|`subroutines`|[`$PropertyType<UserConfigurationType, 'subroutines'>`](./src/types.js)|User defined subroutines. See [subroutines](#subroutines).|N/A|

## Subroutines

All Surgeon [query actions](#query-actions) (test, format) can be implemented using subroutines.

Subroutines can be invoked using [action expressions](#action-expressions).

> Note:
>
> The reason these functions are called "subroutines" is to emphasize the platform independent design.

Example:

```js
x('.title @test(regex, /foo/)');

x({
  select: '.title',
  test: 'regex(/foo/)'
});

```

This example invokes [`test` action] using an [built-in `regex` subroutine](#built-in-subroutines).

### Built-in subroutines

Surgeon implements subroutines that can be used out of the box. It is assumed that if Surgeon were to be reimplemented in a different programming language, these subroutines are to exist and behave the same way.

#### Built-in test subroutines

|Name|Description|Example|
|---|---|---|
|`regex(rule: string)`|Used to validate that string matches a regular expression.|`regex(/foo/g)`|

### User-defined subroutines

Subroutines are defined at a time of constructing a Surgeon instance (see [configuration](#configuration)).

#### Test subroutines

A test subroutine is defined as a factory function.

```js
import {
  InvalidValueSentinel
} from 'surgeon';

const myTestSubroutineFactory = (probability) => {
  return (value) => {
    if (Math.rand() > Number(probability)) {
      return new InvalidValueSentinel('random test failure');
    }
  };
};

const x = surgeon({
  subroutines: {
    test: {
      myTest: myTestSubroutineFactory
    }
  }
});

```

A test routine must return a boolean to indicate success or failure.

A test subroutine can return an instance of `InvalidValueSentinel` to indicate test failure. `InvalidValueSentinel` allows to include a custom message with the error.

Also, see [test example using a predefined test subroutine](#test-example-using-a-predefined-test-subroutine).

## Evaluators

Evaluators are used to parse input (i.e. convert a string into a DOM) and to select nodes in the resulting document.

For example implementation of an evaluator, refer to:

* [`./src/evaluators/browserEvaluator.js`](./src/evaluators/browserEvaluator.js)
* [`./src/evaluators/cheerioEvaluator.js`](./src/evaluators/cheerioEvaluator.js)

> Note:
>
> Evaluator constructor is exposed for transparency purposes only.
>
> Have a use case for another evaluator? [Raise an issue](https://github.com/gajus/surgeon/issues).

### `browser` evaluator

Uses native browser methods to parse the document.

Use [`browser` evaluator](#browser-evaluator) if you are running Surgeon in a browser or a headless browser (e.g. PhantomJS).

```js
import {
  browserEvaluator
} from './evaluators';

surgeon({
  evaluator: browserEvaluator()
});

```

### `cheerio` evaluator

Uses [cheerio](https://github.com/cheeriojs/cheerio) to parse the document.

Use [`cheerio` evaluator](#cheerio-evaluator) if you are running Surgeon in Node.js.

```js
import {
  cheerioEvaluator
} from './evaluators';

surgeon({
  evaluator: cheerioEvaluator()
});

```

## Cookbook

Unless redefined, all examples assume the following initialisation:

```js
import surgeon from 'surgeon';

/**
 * @param configuration {@see https://github.com/gajus/surgeon#configuration}
 */
const x = surgeon();

```

### Extract a single node

The default behaviour of a [`select` action] is to match a single node and extract ([`extract` action](#extract-action)) value of the [`textContent`](https://developer.mozilla.org/en/docs/Web/API/Node/textContent) property.

```js
const subject = `
  <div class="title">foo</div>
`;

x('.title', subject);

// 'foo'

x({
  select: '.title'
}, subject);

// 'foo'

```

The default behaviour changes when a [`select` action](#select-action) is a direct descendant of an [`adopt` action](#adopt-action). In this case, it is assumed that there multiple results, i.e. the response time is an array.

```js
const subject = `
  <div class="title">foo</div>
`;

x({
  adopt: {
    name: '::self'
  },
  select: '.title'
}, subject);

// [
//   'foo'
// ]

```

### Extract multiple nodes

To extract multiple nodes, you need to specify a quantifier of the "select" action.

A quantifier can be specified using a "quantifier" property of the "select" action, e.g.

```js
const subject = `
  <div class="foo">bar</div>
  <div class="foo">baz</div>
  <div class="foo">qux</div>
`;

x({
  select: {
    quantifier: {
      min: 0
    },
    selector: '.title'
  }
}, subject);

// [
//   'bar',
//   'baz',
//   'qux'
// ]

```

A quantifier can be specified using a [quantifier expression](#quantifier-expression), e.g.

```js
const subject = `
  <div class="title">foo</div>
  <div class="title">bar</div>
  <div class="title">baz</div>
`;

x({
  select: '.title {0,}'
}, subject);

// [
//   'foo',
//   'bar',
//   'baz'
// ]

```

The default value of the quantifier depends on the type of the query (see [`select` action](#select-action)).

### Nest the selectors

Use `adopt` verb to name a group of selectors. Result of the parent selector becomes the root element of the adopted selector.

```js
const subject = `
  <article>
    <div class='title'>foo title</div>
    <div class='body'>foo body</div>
  </article>
  <article>
    <div class='title'>bar title</div>
    <div class='body'>bar body</div>
  </article>
`;

x({
  adopt: {
    body: '.body',
    title: '.title'
  },
  select: {
    selector: 'article'
  }
}, subject);

// [
//   {
//     body: 'foo body',
//     title: 'foo title'
//   },
//   {
//     body: 'bar body',
//     title: 'bar title'
//   }
// ]

```

### Validate the result

Validation is performed using [`test` action](#test-action). `test` can be:

* an instace of `RegExp`
* a `TestActionQueryType` `Function`
* a DSL invocation of a predefined test subroutine

If validation does not pass, an `InvalidDataError` error is thrown (see [Handling errors](#handling-errors)).

#### Test example using `RegExp`

```js
x({
  select: '.foo',
  test: /bar/
}, subject);

```

#### Test example using a user-defined test function

```js
x({
  select: '.foo',
  test: (InvalidValueSentinel, value) => {
    if (Math.rand() > 0.5) {
      return new InvalidValueSentinel('random test failure');
    }
  }
}, subject);

```

#### Test example using a predefined test subroutine

This example demonstrates use of a test function defined at the time of constructing a Surgeon instance (see [configuration](#configuration)).

This method is designed to be used when all scraping instructions reside in a non-JavaScript file, e.g. JSON.

```js
import {
  InvalidValueSentinel
} from 'surgeon';

const x = surgeon({
  subroutines: {
    test: {
      myTest: (probability) => {
        return (value) => {
          if (Math.rand() > Number(probability)) {
            return new InvalidValueSentinel('random test failure');
          }
        };
      }
    }
  }
});

// The following examples are functionally equivalent.

x('.foo @test(myTest, 0.5)', subject);

x({
  select: '.foo',
  test: 'myTest(0.5)'
}, subject);

```

There are several [built-in test subroutines](#built-in-test-subroutines) that can be used out of the box.

## Error handling

Surgeon throws the following errors to indicate a predictable error state. Use `instanceof` operator to determine the error type.

> Note:
>
> Surgeon errors are non-recoverable, i.e. a selector cannot proceed if it encounters an error.
> This design ensures that your selectors are capturing the expected data.
>
> If a selector breaks, adjust the select query to increase selector specificity, adjust filter and/or validation criteria.

|Name|Description|
|---|---|
|`NotFoundError`|Thrown when an attempt is made to retrieve a non-existent attribute or property.|
|`UnexpectedResultCountError`|Thrown when a [`select` action quantifier](#select-action) is not satisfied.|
|`InvalidDataError`|Thrown when a resulting data does not pass the [validation](#validate-the-result).|
|`SurgeonError`|A generic error. All other Surgeon errors extend from `SurgeonError`.|

Example:

```js
import {
  InvalidDataError
} from 'surgeon';

const subject = `
  <div class="foo">bar</div>
`;

try {
  x({
    select: '.foo',
    test: /baz/
  }, subject);
} catch (error) {
  if (error instanceof InvalidDataError) {
    // Handle data validation error.
  } else {
    throw error;
  }
}

```

## Debugging

Surgeon is using [`debug`](https://www.npmjs.com/package/debug) to log debugging information.

Export `DEBUG=surgeon:*` environment variable to enable Surgeon debug log.
