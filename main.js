import React from 'react';
import Expo, { LinearGradient } from 'expo';
import { StyleSheet, StatusBar } from 'react-native';
import CalculatorResponse from './components/CalculatorResponse';
import CalculatorButtonsContainer from './components/CalculatorButtonsContainer';

class App extends React.Component {
  constructor() {
    super();

    this.mathOperations = {
      '+': (x, y) => x + y,
      '-': (x, y) => x - y,
      '×': (x, y) => x * y,
      '÷': {
        operation: (x, y) => x / y,
        validator: (x, y) => (y === 0) && 'Error: Zero div',
      },
    };

    this.state = {
      result: 0,
      operands: {
        first: null,
        second: null,
      },
      computed: false,
      operation: null,
    };

    this.handleButtonPress = this.handleButtonPress.bind(this);
    this.handleOperationPress = this.handleOperationPress.bind(this);
    this.handleEqualPress = this.handleEqualPress.bind(this);
    this.refresh = this.refresh.bind(this);
  }

  handleButtonPress(button) {
    let { operands, operation } = this.state;
    if (this.state.computed) {
      operands = { first: null, second: null };
      operation = null;
    }

    const operandOrder = (this.state.operation === null || this.state.computed) ? 'first' : 'second';

    const currentOperand = operands[operandOrder];
    const newValue = (currentOperand === null) ? button : currentOperand + button;
    operands[operandOrder] = newValue;

    this.setState({
      operands,
      operation,
      computed: false,
    });
  }

  handleOperationPress(operation) {
    if (this.state.operation === null) {
      this.setState({ operation });
    }
  }

  getResult(first, second, operation) {
    let mathOperation = this.mathOperations[operation];
    if (typeof mathOperation !== 'function') {
      const validatorError = mathOperation.validator(first, second);
      if (validatorError) {
        return validatorError;
      }
      mathOperation = mathOperation.operation;
    }
    const result = mathOperation(first, second);
    return (Math.round(result) !== result ? result.toFixed(2) : result);
  }

  refresh() {
    this.setState({
      result: 0,
      operands: {
        first: null,
        second: null,
      },
      computed: false,
      operation: null,
    });
  }

  handleEqualPress() {
    const { operands, operation } = this.state;
    const { first, second } = operands;
    const allValues = [first, second, operation].every(v => v !== null);
    if (allValues) {
      const result = this.getResult(parseFloat(first, 10),
                                    parseFloat(second, 10), operation);
      this.setState({ result, computed: true });
    }
  }

  render() {
    const { result, operands, operation } = this.state;

    return (
      <LinearGradient
        colors={['#3498db', '#8e44ad']}
        style={styles.container}
      >

        <CalculatorResponse
          result={result}
          firstOperand={operands.first}
          secondOperand={operands.second}
          operation={operation}
          refresh={this.refresh}
        />

        <CalculatorButtonsContainer
          handleButtonPress={this.handleButtonPress}
          handleOperationPress={this.handleOperationPress}
          handleEqualPress={this.handleEqualPress}
        />

        <StatusBar barStyle="light-content" />
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

Expo.registerRootComponent(App);
