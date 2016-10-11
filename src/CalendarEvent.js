/* @flow */

'use strict';

import React from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';


const {
  PropTypes,
} = React;

export const CalendarEvent = React.createClass({
  propTypes: {
    style: View.propTypes.style,
    title: PropTypes.string.isRequired,
  },

  render() {
    const { style, title } = this.props;
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
