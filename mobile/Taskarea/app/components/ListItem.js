import React, {
  Component
} from 'react';
import {
  View,
  Text
} from 'react-native';

class ListItem extends Component {
  render() {
    // We are going to return a simple list item with just a title for now
    return (
      <View>
        <Text>{this.props.task.title}</Text>
      </View>
    );
  }
}

module.exports = ListItem;