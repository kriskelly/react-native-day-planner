# react-native-day-planner

## Installation

`npm install --save react-native-day-planner`

## Example Usage

```
<DayView
  events={[{ title: 'foobar', startDate: myEventStartDate, endDate: myEventEndDate }]}
  hourHeight={50}
  displayDate={moment(this.props.currentDate).startOf('day')}>
    {(event, styles) => <CalendarEvent style={styles} title={event.title}>}
</DayView>
```

### DayView

propTypes:
 - displayDate (required): Date. This should be set to the beginning of the day in question (not the current time).
 - events (required): array of objects containing the following properties: `startDate`, `endDate`. Additionally, if using the default renderer, the object should have a `title` property.
 - children (required): a function returning a react element. receives the following arguments: `event`, `styles`. The styles are calculated by the DayView component and should be applied to the child element.
 - hourHeight: number. Defaults to `60`
 - onLayout: function
 - onScroll: function
 - scrollEnabled: boolean
