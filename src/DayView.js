/* @flow */

'use strict';

import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const {
  PropTypes,
} = React;

import { calculateHeightFromDates } from './utils';
import { CurrentTimeIndicator } from './CurrentTimeIndicator';
import moment from 'moment';

const DEFAULT_HOUR_HEIGHT = 60;
export const DayView = React.createClass({
  propTypes: {
    contentOffset: PropTypes.object,
    dayStartDate: PropTypes.instanceOf(Date).isRequired,
    events: PropTypes.array.isRequired,
    currentTime: PropTypes.instanceOf(Date),
    hourHeight: PropTypes.number,
    onLayout: PropTypes.func,
    onScroll: PropTypes.func,
    scrollEnabled: PropTypes.bool,
  },

  scrollView: (null: ?Object),

  hourHeight(): number {
    return this.props.hourHeight ? this.props.hourHeight : DEFAULT_HOUR_HEIGHT;
  },

  scrollTo(destY?: number, destX?: number) {
    this.scrollView && this.scrollView.scrollTo(destY, destX);
  },

  renderEvents(): Array<ReactElement> {
    const renderer = this.props.children;
    const hourHeight = this.hourHeight();
    return this.props.events.map((event) => {
      const height = calculateHeightFromDates(
        event.startDate,
        event.endDate,
        hourHeight
      );

      const top = calculateHeightFromDates(
        this.props.dayStartDate,
        event.startDate,
        hourHeight
      );

      const styles = {
        height,
        top,
        left: 0, // TODO: Customize for stacked events.
        right: 0 // TODO: Customize for stacked events.
      };

      return renderer(event, styles);
    });
  },

  renderHourSlots(): Array<ReactElement> {
    const slots = [];
    for (let i = 0; i <= 24; i++) {
      slots.push((
        <View
          key={'slot' + i}
          style={[styles.hourSlot, {height: this.props.hourHeight}]} />
      ));
    }
    return slots;
  },

  renderTimeLabels(): Array<ReactElement> {
    const timeLabels = [];
    for (let i = 0; i <= 24; i++) {
      const time = moment(this.props.dayStartDate).hours(i);
      timeLabels.push((
        <View
          key={'label' + i}
          style={{height: this.props.hourHeight}}>
          <Text style={styles.timeLabelText}>{time.format('h A')}</Text>
        </View>
      ));
    }
    return timeLabels;
  },

  renderTimeIndicator(currentTime: Date): ReactElement {
    return (
      <CurrentTimeIndicator
        displayTime={moment(currentTime).format('h:mm')}
        top={this.timeIndicatorTop(currentTime)} />
    );
  },

  timeIndicatorTop(currentTime: Date): number {
    return calculateHeightFromDates(
      this.props.dayStartDate,
      currentTime,
      this.hourHeight()
    );
  },

  render() {
    const {
      contentOffset,
      currentTime,
      onLayout,
      onScroll,
      scrollEnabled,
      style,
    } = this.props;

    let timeIndicator;
    if (currentTime) {
      timeIndicator = this.renderTimeIndicator(currentTime);
    }

    return (
      <ScrollView
        contentOffset={contentOffset}
        scrollEnabled={scrollEnabled}
        onLayout={onLayout}
        scrollEventThrottle={1}
        ref={component => this.scrollView = component}
        style={style}
        onScroll={onScroll}>
        <View style={styles.container}>
          <View style={styles.timeLabelsContainer}>
            {this.renderTimeLabels()}
          </View>
          <View style={styles.hourSlotsContainer}>
            {this.renderHourSlots()}
            {this.renderEvents()}
          </View>
          {timeIndicator}
        </View>
      </ScrollView>
    );
  }
});

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  timeLabelsContainer: {
    width: 50,
  },
  hourSlotsContainer: {
    flex: 1,
  },
  hourSlot: {
    borderStyle: 'solid',
    borderTopColor: 'lightgray',
    borderTopWidth: 1,
    borderBottomWidth: 0,
  },
  scrollView: {
    flex: 1,
    width: 200,
  },
  timeLabelText: {
    marginRight: 10,
    fontSize: 12,
    textAlign: 'right',
  }
});
