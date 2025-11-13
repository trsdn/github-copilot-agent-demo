/**
 * Unit tests for OperationEngine
 */

import { describe, it, expect } from 'vitest';
import { OperationEngine } from '../../src/calculator/OperationEngine.js';
import { OPERATORS } from '../../src/config/constants.js';

describe('OperationEngine', () => {
  describe('evaluate', () => {
    it('should evaluate simple addition', () => {
      const expression = [5, OPERATORS.ADD, 3];
      const result = OperationEngine.evaluate(expression);
      expect(result).toBe(8);
    });

    it('should evaluate simple subtraction', () => {
      const expression = [10, OPERATORS.SUBTRACT, 4];
      const result = OperationEngine.evaluate(expression);
      expect(result).toBe(6);
    });

    it('should evaluate simple multiplication', () => {
      const expression = [6, OPERATORS.MULTIPLY, 7];
      const result = OperationEngine.evaluate(expression);
      expect(result).toBe(42);
    });

    it('should evaluate simple division', () => {
      const expression = [15, OPERATORS.DIVIDE, 3];
      const result = OperationEngine.evaluate(expression);
      expect(result).toBe(5);
    });

    it('should handle operator precedence (multiplication before addition)', () => {
      const expression = [2, OPERATORS.ADD, 3, OPERATORS.MULTIPLY, 4];
      const result = OperationEngine.evaluate(expression);
      expect(result).toBe(14); // 2 + (3 × 4) = 14
    });

    it('should handle operator precedence (division before subtraction)', () => {
      const expression = [10, OPERATORS.SUBTRACT, 8, OPERATORS.DIVIDE, 2];
      const result = OperationEngine.evaluate(expression);
      expect(result).toBe(6); // 10 - (8 ÷ 2) = 6
    });

    it('should evaluate complex expressions with multiple operators', () => {
      const expression = [
        2,
        OPERATORS.ADD,
        3,
        OPERATORS.MULTIPLY,
        4,
        OPERATORS.SUBTRACT,
        5,
      ];
      const result = OperationEngine.evaluate(expression);
      expect(result).toBe(9); // 2 + (3 × 4) - 5 = 9
    });

    it('should handle single number', () => {
      const expression = [42];
      const result = OperationEngine.evaluate(expression);
      expect(result).toBe(42);
    });

    it('should handle empty expression', () => {
      const expression = [];
      const result = OperationEngine.evaluate(expression);
      expect(result).toBe(0);
    });

    it('should handle decimal numbers', () => {
      const expression = [2.5, OPERATORS.MULTIPLY, 4];
      const result = OperationEngine.evaluate(expression);
      expect(result).toBe(10);
    });

    it('should handle negative results', () => {
      const expression = [5, OPERATORS.SUBTRACT, 10];
      const result = OperationEngine.evaluate(expression);
      expect(result).toBe(-5);
    });
  });

  describe('division by zero', () => {
    it('should throw error when dividing by zero', () => {
      const expression = [5, OPERATORS.DIVIDE, 0];
      expect(() => OperationEngine.evaluate(expression)).toThrow('Cannot divide by zero');
    });
  });

  describe('overflow and underflow', () => {
    it('should throw error on overflow', () => {
      const expression = [1e16, OPERATORS.MULTIPLY, 1e16];
      expect(() => OperationEngine.evaluate(expression)).toThrow('Overflow');
    });

    it('should throw error on underflow', () => {
      const expression = [1e-16, OPERATORS.DIVIDE, 1e16];
      expect(() => OperationEngine.evaluate(expression)).toThrow('Underflow');
    });
  });

  describe('simple operations', () => {
    it('should add two numbers', () => {
      const result = OperationEngine.add(5, 3);
      expect(result).toBe(8);
    });

    it('should subtract two numbers', () => {
      const result = OperationEngine.subtract(10, 4);
      expect(result).toBe(6);
    });

    it('should multiply two numbers', () => {
      const result = OperationEngine.multiply(6, 7);
      expect(result).toBe(42);
    });

    it('should divide two numbers', () => {
      const result = OperationEngine.divide(15, 3);
      expect(result).toBe(5);
    });

    it('should throw on division by zero', () => {
      expect(() => OperationEngine.divide(5, 0)).toThrow('Cannot divide by zero');
    });
  });
});
