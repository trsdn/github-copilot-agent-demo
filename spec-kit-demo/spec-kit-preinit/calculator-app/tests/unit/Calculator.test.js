/**
 * Unit tests for Calculator class
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { Calculator } from '../../src/calculator/Calculator.js';
import { OPERATORS } from '../../src/config/constants.js';

describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  describe('inputDigit', () => {
    it('should input a single digit', () => {
      calculator.inputDigit('5');
      expect(calculator.getDisplayValue()).toBe('5');
    });

    it('should append multiple digits', () => {
      calculator.inputDigit('1');
      calculator.inputDigit('2');
      calculator.inputDigit('3');
      expect(calculator.getDisplayValue()).toBe('123');
    });

    it('should replace initial zero', () => {
      calculator.inputDigit('5');
      expect(calculator.getDisplayValue()).toBe('5');
    });

    it('should reject invalid digits', () => {
      const errorHandler = vi.fn();
      calculator.onError(errorHandler);
      calculator.inputDigit('a');
      expect(errorHandler).toHaveBeenCalled();
    });
  });

  describe('inputDecimal', () => {
    it('should add decimal point', () => {
      calculator.inputDigit('5');
      calculator.inputDecimal();
      calculator.inputDigit('2');
      expect(calculator.getDisplayValue()).toBe('5.2');
    });

    it('should not add multiple decimal points', () => {
      calculator.inputDigit('5');
      calculator.inputDecimal();
      calculator.inputDecimal();
      calculator.inputDigit('2');
      expect(calculator.getDisplayValue()).toBe('5.2');
    });
  });

  describe('basic arithmetic', () => {
    it('should add two numbers', () => {
      calculator.inputDigit('5');
      calculator.inputOperator(OPERATORS.ADD);
      calculator.inputDigit('3');
      calculator.calculate();
      expect(calculator.getDisplayValue()).toBe('8');
    });

    it('should subtract two numbers', () => {
      calculator.inputDigit('1');
      calculator.inputDigit('0');
      calculator.inputOperator(OPERATORS.SUBTRACT);
      calculator.inputDigit('4');
      calculator.calculate();
      expect(calculator.getDisplayValue()).toBe('6');
    });

    it('should multiply two numbers', () => {
      calculator.inputDigit('6');
      calculator.inputOperator(OPERATORS.MULTIPLY);
      calculator.inputDigit('7');
      calculator.calculate();
      expect(calculator.getDisplayValue()).toBe('42');
    });

    it('should divide two numbers', () => {
      calculator.inputDigit('1');
      calculator.inputDigit('5');
      calculator.inputOperator(OPERATORS.DIVIDE);
      calculator.inputDigit('3');
      calculator.calculate();
      expect(calculator.getDisplayValue()).toBe('5');
    });
  });

  describe('clear operations', () => {
    it('should clear current entry', () => {
      calculator.inputDigit('5');
      calculator.clear();
      expect(calculator.getDisplayValue()).toBe('0');
    });

    it('should clear all state', () => {
      calculator.inputDigit('5');
      calculator.inputOperator(OPERATORS.ADD);
      calculator.inputDigit('3');
      calculator.allClear();
      expect(calculator.getDisplayValue()).toBe('0');
      expect(calculator.getExpressionDisplay()).toBe('');
    });
  });

  describe('backspace', () => {
    it('should remove last digit', () => {
      calculator.inputDigit('1');
      calculator.inputDigit('2');
      calculator.inputDigit('3');
      calculator.backspace();
      expect(calculator.getDisplayValue()).toBe('12');
    });

    it('should show zero when all digits removed', () => {
      calculator.inputDigit('5');
      calculator.backspace();
      expect(calculator.getDisplayValue()).toBe('0');
    });
  });

  describe('memory operations', () => {
    it('should add to memory', () => {
      calculator.inputDigit('5');
      calculator.memoryAdd();
      expect(calculator.hasMemory()).toBe(true);
    });

    it('should subtract from memory', () => {
      calculator.inputDigit('1');
      calculator.inputDigit('0');
      calculator.memoryAdd();
      calculator.inputDigit('3');
      calculator.memorySubtract();
      expect(calculator.memory.getValue()).toBe(7);
    });

    it('should recall memory value', () => {
      calculator.inputDigit('5');
      calculator.memoryAdd();
      calculator.clear();
      calculator.memoryRecall();
      expect(calculator.getDisplayValue()).toBe('5');
    });

    it('should clear memory', () => {
      calculator.inputDigit('5');
      calculator.memoryAdd();
      calculator.memoryClear();
      expect(calculator.hasMemory()).toBe(false);
    });
  });

  describe('event listeners', () => {
    it('should emit state change events', () => {
      const handler = vi.fn();
      calculator.onStateChange(handler);
      calculator.inputDigit('5');
      expect(handler).toHaveBeenCalled();
    });

    it('should emit calculation events', () => {
      const handler = vi.fn();
      calculator.onCalculation(handler);
      calculator.inputDigit('5');
      calculator.inputOperator(OPERATORS.ADD);
      calculator.inputDigit('3');
      calculator.calculate();
      expect(handler).toHaveBeenCalled();
    });

    it('should emit error events', () => {
      const handler = vi.fn();
      calculator.onError(handler);
      calculator.inputDigit('5');
      calculator.inputOperator(OPERATORS.DIVIDE);
      calculator.inputDigit('0');
      calculator.calculate();
      expect(handler).toHaveBeenCalled();
    });
  });
});
