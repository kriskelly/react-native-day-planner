/* @flow */

'use strict';

var React = require('react-native');
var {
  PropTypes,
  StyleSheet,
  Text,
  View,
} = React;

var CalendarEvent = React.createClass({
  propTypes: {
    style: View.propTypes.style,
    title: PropTypes.string.isRequired,
  },

  render() {
    var { style, title } = this.props;
    return (
      <View style={[styles.calendarEvent, style]}>
        <Text>{title}</Text>
      </View>
    );
  },
});

var styles = StyleSheet.create({
  calendarEvent: {
    backgroundColor: 'lightgreen',
    position: 'absolute',
  },
});

module.exports = CalendarEvent;