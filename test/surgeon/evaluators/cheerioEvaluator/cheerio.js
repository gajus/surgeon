// @flow

import test from 'ava';
import cheerio from 'cheerio';

// @see https://github.com/cheeriojs/cheerio/issues/1211
// eslint-disable-next-line ava/no-skip-test
test.skip('returns innerHTML property value', (t) => {
  const $ = cheerio.load('<script>"<br>"</script>', {
    xmlMode: true
  });

  t.true($.html() === '<script>"<br>"</script>');
});
