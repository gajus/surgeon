// @flow

import test from 'ava';
import createQuery from '../../../src/factories/createQuery';

test('does not effect a normalized query (extract query)', (t): void => {
  // The onle effected value is {quantifier: {multiple: true}}.
  // This value is implicit – user cannot set it.
  // The value is configured based on the presence of the {quantifier} configuration.

  const denormalizedQuery = {
    extract: {
      name: 'textContent',
      type: 'property'
    },
    select: {
      quantifier: {
        max: 5,
        min: 1
      },
      selector: 'div'
    }
  };

  const normalizedQuery = {
    extract: {
      name: 'textContent',
      type: 'property'
    },
    select: {
      quantifier: {
        max: 5,
        min: 1,
        multiple: true
      },
      selector: 'div'
    }
  };

  t.deepEqual(createQuery(denormalizedQuery), normalizedQuery);
});

test('does not effect a normalized query (adopt query)', (t): void => {
  // The onle effected value is {quantifier: {multiple: true}}.
  // This value is implicit – user cannot set it.
  // The value is configured based on the presence of the {quantifier} configuration.

  const denormalizedQuery = {
    adopt: {
      name: {
        extract: {
          name: 'textContent',
          type: 'property'
        },
        select: {
          selector: '::self'
        }
      }
    },
    select: {
      selector: 'div'
    }
  };

  const normalizedQuery = {
    adopt: {
      name: {
        extract: {
          name: 'textContent',
          type: 'property'
        },
        select: {
          quantifier: {
            max: 1,
            min: 1,
            multiple: false
          },
          selector: '::self'
        }
      }
    },
    select: {
      quantifier: {
        max: 1,
        min: 1,
        multiple: false
      },
      selector: 'div'
    }
  };

  t.deepEqual(createQuery(denormalizedQuery), normalizedQuery);
});

test('adds an extract expression (not adopt query; does not define extract)', (t): void => {
  const denormalizedQuery = {
    select: {
      selector: 'div'
    }
  };

  const expectedQuery = {
    extract: {
      name: 'textContent',
      type: 'property'
    },
    select: {
      quantifier: {
        max: 1,
        min: 1,
        multiple: false
      },
      selector: 'div'
    }
  };

  t.deepEqual(createQuery(denormalizedQuery), expectedQuery);
});

test('adds a quantifier', (t): void => {
  const denormalizedQuery = {
    extract: {
      name: 'textContent',
      type: 'property'
    },
    select: {
      selector: 'div'
    }
  };

  const expectedQuery = {
    extract: {
      name: 'textContent',
      type: 'property'
    },
    select: {
      quantifier: {
        max: 1,
        min: 1,
        multiple: false
      },
      selector: 'div'
    }
  };

  t.deepEqual(createQuery(denormalizedQuery), expectedQuery);
});

test('multiple quantifier defaults to permit any number of results', (t): void => {
  const denormalizedQuery = {
    extract: {
      name: 'textContent',
      type: 'property'
    },
    select: {
      quantifier: {
        min: 0
      },
      selector: 'div'
    }
  };

  const expectedQuery = {
    extract: {
      name: 'textContent',
      type: 'property'
    },
    select: {
      quantifier: {
        max: Infinity,
        min: 0,
        multiple: true
      },
      selector: 'div'
    }
  };

  t.deepEqual(createQuery(denormalizedQuery), expectedQuery);
});

test('explicit quantifier (max === 1) defaults to permit a single result', (t): void => {
  const denormalizedQuery = {
    extract: {
      name: 'textContent',
      type: 'property'
    },
    select: {
      quantifier: {
        max: 1,
        min: 0
      },
      selector: 'div'
    }
  };

  const expectedQuery = {
    extract: {
      name: 'textContent',
      type: 'property'
    },
    select: {
      quantifier: {
        max: 1,
        min: 0,
        multiple: false
      },
      selector: 'div'
    }
  };

  t.deepEqual(createQuery(denormalizedQuery), expectedQuery);
});

test('explicit quantifier (max > 1) defaults to permit multiple number of results', (t): void => {
  const denormalizedQuery = {
    extract: {
      name: 'textContent',
      type: 'property'
    },
    select: {
      quantifier: {
        max: 2,
        min: 0
      },
      selector: 'div'
    }
  };

  const expectedQuery = {
    extract: {
      name: 'textContent',
      type: 'property'
    },
    select: {
      quantifier: {
        max: 2,
        min: 0,
        multiple: true
      },
      selector: 'div'
    }
  };

  t.deepEqual(createQuery(denormalizedQuery), expectedQuery);
});

test('recursively normalizes adopt action fields', (t): void => {
  const denormalizedQuery = {
    adopt: {
      name: {
        select: {
          selector: '::self'
        }
      }
    },
    select: {
      selector: 'div'
    }
  };

  const expectedQuery = {
    adopt: {
      name: {
        extract: {
          name: 'textContent',
          type: 'property'
        },
        select: {
          quantifier: {
            max: 1,
            min: 1,
            multiple: false
          },
          selector: '::self'
        }
      }
    },
    select: {
      quantifier: {
        max: 1,
        min: 1,
        multiple: false
      },
      selector: 'div'
    }
  };

  t.deepEqual(createQuery(denormalizedQuery), expectedQuery);
});
