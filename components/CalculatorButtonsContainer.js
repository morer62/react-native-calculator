import React from 'react';
import { View, StyleSheet } from 'react-native';
import CalculatorButton from './CalculatorButton';

class CalculatorButtonsContainer extends React.Component {
  render() {
    const { handleOperationPress, handleButtonPress, handleEqualPress } = this.props;
    const operations = ['+', '-', '×', '÷'];
    const operationButtons = operations.map((op) => {
      return <CalculatorButton operator={op} key={op} handleButtonPress={handleOperationPress} />;
    });

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          {operationButtons}
        </View>

        <View style={styles.row}>
          <CalculatorButton operator={'7'} handleButtonPress={handleButtonPress} />
          <CalculatorButton operator={'8'} handleButtonPress={handleButtonPress} />
          <CalculatorButton operator={'9'} handleButtonPress={handleButtonPress} />
        </View>

        <View style={styles.row}>
          <CalculatorButton operator={'4'} handleButtonPress={handleButtonPress} />
          <CalculatorButton operator={'5'} handleButtonPress={handleButtonPress} />
          <CalculatorButton operator={'6'} handleButtonPress={handleButtonPress} />
        </View>

        <View style={styles.row}>
          <CalculatorButton operator={'1'} handleButtonPress={handleButtonPress} />
          <CalculatorButton operator={'2'} handleButtonPress={handleButtonPress} />
          <CalculatorButton operator={'3'} handleButtonPress={handleButtonPress} />
        </View>

        <View style={styles.row}>
          <CalculatorButton operator={'0'} handleButtonPress={handleButtonPress} />
          <CalculatorButton operator={'.'} handleButtonPress={handleButtonPress} />
          <CalculatorButton operator={'='} handleButtonPress={handleEqualPress} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  row: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default CalculatorButtonsContainer;
