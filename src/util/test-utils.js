import React from 'react';
import { render, queries } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import reset from 'styled-reset';
import { applyMiddleware, createStore } from 'redux';
import rootReducer from '../reducers';
import moxios from 'moxios';
import {
  crashReporter,
  logger,
  rafScheduler,
  readyStatePromise,
  thunk,
  timeoutScheduler,
  vanillaPromise,
} from './customMiddleWare.js';

const GlobalStyle = createGlobalStyle`
${reset}
`;

/**
 * @typedef AppStore store
 * @type {Store}
 */
const store = createStore(
  rootReducer,
  applyMiddleware(
    rafScheduler,
    timeoutScheduler,
    thunk,
    vanillaPromise,
    readyStatePromise,
    logger,
    crashReporter
  )
);

/**
 * @type {ThemeProvider}
 */
const theme = {
  lightLightGray: '#D7D7D7',
  lightGray: '#c4c4c4',
  gray: '#C4C4C4',
  darkGray: '#585858',
  darkDarkGray: '#3a3a3a',

  largeRadius: 14,
  smallRadius: 6,

  navBarTopHeight: 75,
  footerHeight: 50,

  screenHeight: window.innerHeight,
  screenWidth: window.outerWidth,
};

/**
 *
 * @param ui
 * @param options
 * @return {
 *   RenderResults: {RenderResults},
 *   providers: {theme: {ThemeProvider}, store: {Store}},
 *   TestLib: {TestingLibraryReact}
 * }
 *
 */
const customRender = (ui, options) =>
  render(ui, {
    wrapper: AllTheProviders,
    ...options,
  });

/**
 * Wraps a component in the provides and then returns the wrapped
 * commponent.
 * @param children Reach child components
 * @returns {*}
 * @constructor
 */
const AllTheProviders = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <GlobalStyle />
        {children}
      </Provider>
    </ThemeProvider>
  );
};

/**
 *
 * @param {HTMLElement} c
 * @return {[{HTMLElement}]}
 */
export const getChildNodes = c => {
  console.log('inside of get next node.');
  const childNodes = [];
  if (c.hasChildNodes()) {
    c.childNodes.forEach(child => {
      childNodes.push(child);
    });
  }
  return childNodes;
};

/**
 *
 * @param {HTMLElement} c
 * @param {string} type
 * @return {[HTMLElement]}
 */
export const getNodesByType = (c, type) => {
  const stack = [];
  const toReturn = [];
  stack.push(c);
  while (stack.length > 0) {
    let node = stack.pop();
    if (node.hasChildNodes()) {
      node.childNodes.forEach(child => {
        stack.push(child);
      });
    }
    if (node.nodeName === type.toUpperCase()) {
      toReturn.push(node);
    }
  }

  return toReturn;
};

export * from '@testing-library/react';

export { customRender, theme, store };
