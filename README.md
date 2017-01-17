# Surgeon

[![Travis build status](http://img.shields.io/travis/gajus/surgeon/master.svg?style=flat-square)](https://travis-ci.org/gajus/surgeon)
[![Coveralls](https://img.shields.io/coveralls/gajus/surgeon.svg?style=flat-square)](https://coveralls.io/github/gajus/surgeon)
[![NPM version](http://img.shields.io/npm/v/surgeon.svg?style=flat-square)](https://www.npmjs.org/package/surgeon)
[![Canonical Code Style](https://img.shields.io/badge/code%20style-canonical-blue.svg?style=flat-square)](https://github.com/gajus/canonical)
[![Twitter Follow](https://img.shields.io/twitter/follow/kuizinas.svg?style=social&label=Follow)](https://twitter.com/kuizinas)

<img src='https://rawgit.com/gajus/surgeon/master/.README/chop.svg' height='200' />

DOM extraction expression evaluator.

* Supports [selector nesting](#nest-the-selectors).
* Integrates [match validation](#validate-the-result).
* Works in Node.js or in browser.
* Uses domain-specific language (DSL) to:
  * select a defined number of nodes ([Quantifier expression](#quantifier-expression))
  * select a single node out of a matching list of nodes  ([Accessor expression](#accessor-expression))
  * access [attribute](#attribute-selector) and [property](#property-selector) values

Powerful, succinct API:

```js
x('body', {
  title: x('title'),
  articles: x('article {0,}', {
    body: x('.body@.innerHTML'),
    summary: x('.body p {0,}[0]'),
    imageUrl: x('img@src'),
    title: x('.title')
  })
});

```

> * `{0,}` is a [quantifier expression](#quantifier-expression).
> * `[0]` is an [accessor expression](#accessor-expression).
> * `@.innerHTML` is a [property selector](#property-selector).
> * `@src` is an [attribute selector](#attribute-selector).

Have you got suggestions for improvement? [I am all ears](https://github.com/gajus/surgeon/issues).

---

* [Configuration](#configuration)
* [Cookbook](#cookbook)
  * [Extract a single node](#extract-a-single-node)
  * [Extract multiple nodes](#extract-multiple-nodes)
  * [Nest the selectors](#nest-the-selectors)
  * [Validate the result](#validate-the-result)
* [Conventions](#conventions)
  * [Quantifier expression](#quantifier-expression)
  * [Accessor expression](#accessor-expression)
  * [Attribute selector](#attribute-selector)
  * [Property selector](#property-selector)
* [Error handling](#error-handling)
* [Debugging](#debugging)
* [FAQ](#faq)
  * [Whats the difference from x-ray?](#whats-the-difference-from-x-ray)

## Configuration

|Name|Description|Default value|
|---|---|---|
|`evaluator`|HTML parser and selector engine. Possible values: `cheerio`, `browser`. Use `cheerio` if you are running Surgeon in Node.js. Use `browser` if you are running Surgeon in a browser or a headless browser (e.g. PhantomJS).|`browser` if `window` and `document` variables are present, `cheerio` otherwise.|

## Cookbook

Unless redefined, all examples assume the following initialisation:

```js
import surgeon from 'surgeon';

/**
 * @param configuration {@see https://github.com/gajus/surgeon#configuration}
 */
const x = surgeon();

```

> Note:
>
> For simplicity, strict-equal operator (`===`) is being used to demonstrate deep equality.

### Extract a single node

The default behaviour of a query is to match a single node and extract value of the [`textContent`](https://developer.mozilla.org/en/docs/Web/API/Node/textContent) property, i.e. `{1}[0]@.textContent`.

```js
const document = `
  <div class="title">foo</div>
`;

x('.title')(document) === 'foo';
x('.title {1}[0]')(document) === 'foo';
x('.title {0,1}[0]')(document) === 'foo';
x('.title {1,1}[0]')(document) === 'foo';
```

### Extract multiple nodes

To extract multiple nodes, you need to specify a [quantifier expression](#quantifier-expression).

```js
const document = `
  <div class="title">foo</div>
  <div class="title">bar</div>
  <div class="title">baz</div>
`;

const result = x('.title {0,}')(document);

result === [
  'foo',
  'bar',
  'baz'
];

```

### Nest the selectors

Surgeon selectors (queries) can be nested. Result of the parent query becomes the root element of the descending query.

```js
const document = `
  <article>
    <div class='title'>foo title</div>
    <div class='body'>foo body</div>
  </article>
  <article>
    <div class='title'>bar title</div>
    <div class='body'>bar body</div>
  </article>
`;

const result = x('article {0,}', {
  body: x('.body'),
  title: x('.title')
})(document);

result === [
  {
    body: 'foo body',
    title: 'foo title'
  },
  {
    body: 'bar body',
    title: 'bar title'
  }
];

```

You can use the `:root` selector to select the current element, e.g.

```js
const document = `
  <article class='foo'>A</article>
  <article class='bar'>B</article>
`;

const result = x('article {0,}', {
  className: x(':root @class'),
  textContent: x(':root')
})(document);

result === [
  {
    className: 'foo',
    textContent: 'A'
  },
  {
    className: 'bar',
    textContent: 'B'
  }
];

```

### Validate the result

Validation is performed using regular expression.

```js
const document = `
  <div class="title">foo</div>
`;

x('.title', /foo/)(document) === 'foo';

```

If the regular expression does not match the data, an `InvalidDataError` error is thrown (see [Handling errors](#handling-errors)).

## Conventions

### Quantifier expression

A *quantifier expression* is used to assert that the query matches a set number of nodes.

The default quantifier expression value is `{1}`.

#### Syntax

|Name|Syntax|
|---|---|
|Fixed quantifier|`{n}` where `n` is an integer `>= 1`|
|Greedy quantifier|`{n,m}` where `n >= 0` and `m >= n`|
|Greedy quantifier|`{n,}` where `n >= 0`|
|Greedy quantifier|`{,m}` where `m >= 1`|

If this looks familiar, its because I have adopted the syntax from regular expression language. However, unlike in regular expression, a quantifier in the context of Surgeon selector will produce an error (`UnexpectedResultCountError`) if selector result count is out of the quantifier range.

#### Example

```css
.title {1}
.title {0,1}
.title {0,}

```

### Accessor expression

An *accessor expression* can be used to return a single item from an array of matches. An accessor expression must precede a [quantifier expression](#quantifier-expression).

The default accessor expression value is `[0]`. The default applies only if a quantifier expression is not specified. If a quantifier expression is specified, then by default all matches are returned.

#### Syntax

`[n]` where `n` is a zero-based index.

#### Example

```css
.title {1}[0]

```

### Attribute selector

An *attribute selector* is used to select a value of an `HTMLElement` attribute.

#### Syntax

`@n` where `n` is the attribute name.

#### Example

```css
.title@data-id

```

### Property selector

A *property selector* is used to select a value of an `HTMLElement` property.

#### Syntax

`@.n` where `n` is the property name.

#### Example

```css
.title@.textContent

```

## Error handling

There are many errors that Surgeon can throw. Use `instanceof` operator to determine the error type.

|Name|Description|
|---|---|
|`NotFoundError`|Thrown when an attempt is made to retrieve a non-existent attribute or property.|
|`UnexpectedResultCountError`|Thrown when a [quantifier expression](#quantifier-expression) is not satisfied.|
|`InvalidDataError`|Thrown when a resulting data does not pass the [validation](#validate-the-result).|

Example:

```js
import {
  InvalidDataError
} from 'surgeon';

const document = `
  <div class="title">foo</div>
`;

try {
  x('.title', /bar/)(document);
} catch (error) {
  if (error instanceof InvalidDataError) {
    // Handle data validation error.
  } else {
    throw error;
  }
}

```

## Debugging

Surgeon is using [`debug`](https://www.npmjs.com/package/debug) to provide additional debugging information.

To enable Surgeon debug output run program with a `DEBUG=surgeon:*` environment variable.

## FAQ

### Whats the difference from x-ray?

[x-ray](https://github.com/lapwinglabs/x-ray) is a web scraping library.

The primary difference between Surgeon and x-ray is that Surgeon does not implement HTTP request layer. I consider this an advantage for the reasons that I have described in the following x-ray [issue](https://github.com/lapwinglabs/x-ray/issues/245).
