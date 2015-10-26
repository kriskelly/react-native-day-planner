/* @flow */

'use strict';

var moment = require('moment');

function roundSecondsToHours(seconds: number, roundingIntervalInMinutes: number = 15): number {
  var roundedSeconds;
  if (seconds > 0) {
    roundedSeconds = Math.floor(seconds / (roundingIntervalInMinutes * 60.0)) * (roundingIntervalInMinutes * 60);
  } else {
    roundedSeconds = Math.ceil(seconds / (roundingIntervalInMinutes * 60.0)) * (roundingIntervalInMinutes * 60);
  }
  return roundedSeconds / 3600.0;
}

function calculateHeightFromDates(startDate: Date, endDate: Date, hourHeight: number): number {
  // Diff the event start and end.
  var start = moment(startDate);
  var end = moment(endDate);
  var diff = end.diff(start, 'seconds');
  return calculateHeightFromTimeLength(diff, hourHeight);
}

function calculateHeightFromTimeLength(timeLengthInSeconds, hourHeight: number): number {
  return roundSecondsToHours(timeLengthInSeconds) * hourHeight;
}

module.exports = {
  calculateHeightFromDates
};