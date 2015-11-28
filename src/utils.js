/* @flow */

'use strict';

import moment from 'moment';

export function roundSecondsToHours(seconds: number, roundingIntervalInMinutes: number = 15): number {
  let roundedSeconds;
  if (seconds > 0) {
    roundedSeconds = Math.floor(seconds / (roundingIntervalInMinutes * 60.0)) * (roundingIntervalInMinutes * 60);
  } else {
    roundedSeconds = Math.ceil(seconds / (roundingIntervalInMinutes * 60.0)) * (roundingIntervalInMinutes * 60);
  }
  return roundedSeconds / 3600.0;
}

export function calculateHeightFromDates(startDate: Date, endDate: Date, hourHeight: number): number {
  // Diff the event start and end.
  const start = moment(startDate);
  const end = moment(endDate);
  const diff = end.diff(start, 'seconds');
  return calculateHeightFromTimeLength(diff, hourHeight);
}

export function calculateHeightFromTimeLength(timeLengthInSeconds, hourHeight: number): number {
  return roundSecondsToHours(timeLengthInSeconds) * hourHeight;
}

export function calculateTimeLengthFromPosition(yPos: number, hourHeight: number): number {
  const hours = yPos / hourHeight;
  return roundSecondsToHours(hours * 3600);
}

export function calculateDateFromPositionOffset(yOffset: number, originalDate: Date, hourHeight: number): Date {
  const timeLengthInHours = calculateTimeLengthFromPosition(yOffset, hourHeight);
  return moment(originalDate).add(timeLengthInHours, 'hours').toDate();
}

export function calculateDateFromHourOffset(hourOffset: number, originalDate: Date): Date {
  return moment(originalDate).add(hourOffset, 'hours').toDate();
}