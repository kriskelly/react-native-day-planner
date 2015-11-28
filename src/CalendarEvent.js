/* @flow */

'use strict';

import React from 'react-native';
const {
  PropTypes,
  StyleSheet,
  Text,
  View,
} = React;

export const CalendarEvent = React.createClass({
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

const styles = StyleSheet.create({
  calendarEvent: {
    position: 'absolute',
  },
});