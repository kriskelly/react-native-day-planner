/* @flow */

'use strict';

var React = require('react-native');
var {
  PropTypes,
  ScrollView,
  StyleSheet,
  Text,
  View,
} = React;

var { calculateHeightFromDates } = require('./utils');

var moment = require('moment');

var DayView = React.createClass({
  propTypes: {
    displayDate: PropTypes.object.isRequired,
    events: PropTypes.array.isRequired,
    onLayout: PropTypes.func.isRequired,
    onScroll: PropTypes.func.isRequired,
    hourHeight: PropTypes.number.isRequired,
    scrollEnabled: PropTypes.bool.isRequired,
  },

  renderEvents(): Array<ReactElement> {
    var renderer = this.props.children;
    var { hourHeight } = this.props;
    return this.props.events.map((event) => {
      var height = calculateHeightFromDates(
        event.startDate,
        event.endDate,
        hourHeight
      );

      var top = calculateHeightFromDates(
        this.props.displayDate,
        event.startDate,
        hourHeight
      );

      var styles = {
        height,
        top,
        left: 0, // TODO: Customize for stacked events.
        right: 0 // TODO: Customize for stacked events.
      };

      return renderer(event, styles);
    });
  },

  renderHourSlots(): Array<ReactElement> {
    var slots = [];
    for (var i = 0; i < 24; i++) {
      slots.push((
        <View
          key={'slot' + i}
          style={[styles.hourSlot, {height: this.props.hourHeight}]} />
      ));
    }
    return slots;
  },

  renderTimeLabels(): Array<ReactElement> {
    var timeLabels = [];
    for (var i = 0; i < 24; i++) {
      var time = moment(this.props.displayDate).hours(i);
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

  render() {
    var {
      onLayout,
      onScroll,
      scrollEnabled,
    } = this.props;

    return (
      <ScrollView
        scrollEnabled={scrollEnabled}
        onLayout={onLayout}
        scrollEventThrottle={1}
        onScroll={onScroll}>
        <View style={styles.container}>
          <View style={styles.timeLabelsContainer}>
            {this.renderTimeLabels()}
          </View>
          <View style={styles.hourSlotsContainer}>
            {this.renderHourSlots()}
            {this.renderEvents()}
          </View>
        </View>
      </ScrollView>
    );
  }
});

var styles = StyleSheet.create({
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
  timeLabelText: {
    marginRight: 10,
    fontSize: 12,
    textAlign: 'right',
  }
});

module.exports = DayView;