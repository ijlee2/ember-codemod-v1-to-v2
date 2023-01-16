import { findAll, render } from '@ember/test-helpers';
import albumData from 'test-app/data/album';
import { setupRenderingTest } from 'test-app/tests/helpers';
import { hbs } from 'ember-cli-htmlbars';
import { module, test } from 'qunit';

module('Integration | Component | tracks/table', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function (assert) {
    assert.isTrackCorrect = (trackElement, trackProperties) => {
      const { explicit, length, title, trackNumber } = trackProperties;

      assert
        .dom('[data-test-column="Title"]', trackElement)
        .hasText(
          title,
          `For track #${trackNumber}, the Title column is correct.`
        );

      assert
        .dom('[data-test-column="Length"]', trackElement)
        .hasText(
          length,
          `For track #${trackNumber}, the Length column is correct.`
        );

      assert
        .dom('[data-test-column="Explicit"]', trackElement)
        .hasText(
          explicit ? 'Yes' : '',
          `For track #${trackNumber}, the Explicit column is correct.`
        );
    };
  });

  hooks.afterEach(function (assert) {
    delete assert.isTrackCorrect;
  });

  module('When @tracks is an empty array', function () {
    test('The component renders an empty table', async function (assert) {
      this.tracks = [];

      await render(hbs`
        <Tracks::Table
          @tracks={{this.tracks}}
        />
      `);

      assert.dom('[data-test-row]').doesNotExist('There are 0 tracks.');
    });
  });

  module('When @tracks is a non-empty array', function () {
    test('The component renders a non-empty table', async function (assert) {
      this.tracks = albumData.tracks;

      await render(hbs`
        <Tracks::Table
          @tracks={{this.tracks}}
        />
      `);

      const tracks = findAll('[data-test-row]');

      assert.strictEqual(tracks.length, 11, 'There are 11 tracks.');

      assert.isTrackCorrect(tracks[0], {
        trackNumber: 1,
        title: 'Life Itself',
        length: '4:41',
        explicit: false,
      });

      assert.isTrackCorrect(tracks[10], {
        trackNumber: 11,
        title: 'Agnes',
        length: '4:32',
        explicit: true,
      });
    });
  });
});
