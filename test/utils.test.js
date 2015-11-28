/* @flow weak */

'use strict';

import {expect} from 'chai';
import {
  calculateHeightFromDates,
  roundSecondsToHours,
} from '../src/utils';

describe('calendar utility functions', function () {
  describe('#roundSecondsToHours', function () {
    it('rounds seconds to hours', function () {
      expect(roundSecondsToHours(7200)).to.equal(2);
    });

    it('defaults to 15 minute intervals', function () {
      expect(roundSecondsToHours(4740)).to.equal(1.25);
    });

    it('rounds negative numbers correctly', function () {
      expect(roundSecondsToHours(-4740)).to.equal(-1.25);
    });
  });

  describe('#calculateHeightFromDates', function () {
    it('calculates distance (in points) between two dates', function () {
      const dayStartDate = new Date(2015, 10, 12, 0, 0, 0);
      const eventDate = new Date(2015, 10, 12, 5, 15, 0);
      expect(calculateHeightFromDates(dayStartDate, eventDate, 50))
        .to.equal(5.25 * 50);
    });
  });
});