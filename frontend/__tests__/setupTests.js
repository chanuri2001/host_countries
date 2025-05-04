import '@testing-library/jest-dom';
import { configure } from '@testing-library/react';

// Mock global objects if needed
global.matchMedia = global.matchMedia || function() {
  return {
    matches: false,
    addListener: jest.fn(),
    removeListener: jest.fn(),
  };
};

configure({ testIdAttribute: 'data-test' });