// @flow

import test from 'ava';
import {
  sprintf
} from 'sprintf-js';
import surgeon from '../../../src';
import type {
  DenormalizedQueryType
} from '../../../src/types';

test('extracts a single value (expression string)', (t): void => {
  let lastSelector;

  const x = surgeon({
    subroutines: {
      captureSelector: (evaluator, selector) => {
        lastSelector = selector;

        return selector;
      },
      index: (evaluator, element) => {
        // $FlowFixMe
        return element.index() + 1;
      },
      rootSelect: (evaluator, selector) => {
        // $FlowFixMe
        const matches = lastSelector.find(selector);

        if (matches.length !== 1) {
          throw new Error('Unexpected result count.');
        }

        return matches;
      },
      sprintf: (evaluator, value, [format]) => {
        return sprintf(format, value);
      }
    }
  });

  const subject = `
  <h1>My shiny news site</h1>

  <div class="left">
    <ul>
      <li><strong>Title</strong></li>
      <li><a href="...">News article one</a></li>
      <li><a href="...">News article two</a></li>
      <li><a href="...">News article three</a></li>
    </ul>
  </div>

  <div class="right">
    <ul>
      <li><strong>Date</strong></li>
      <li>14 minutes ago</li>
      <li>17 minutes ago</li>
      <li>31 minutes ago</li>
    </ul>
  </div>
  `;

  const query: DenormalizedQueryType = [
    'captureSelector',
    'select .left',
    {
      articles: [
        'select li:not(:first-child) {0,}',
        {
          date: 'index | sprintf ".right ul li:nth-child(%d)" | rootSelect | read property textContent',
          title: 'select a | read property textContent'
        }
      ]
    }
  ];
  const result = x(query, subject);

  const expectedResult = {
    articles: [
      {
        date: '14 minutes ago',
        title: 'News article one'
      },
      {
        date: '17 minutes ago',
        title: 'News article two'
      },
      {
        date: '31 minutes ago',
        title: 'News article three'
      }
    ]
  };

  t.deepEqual(result, expectedResult);
});
