import * as React from 'react';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  navigationRef.current?.navigate(name, params);
}

export function reset(...args) {
  navigationRef.current?.reset(...args);
}

export function goBack() {
  navigationRef.current?.goBack();
}

export function replace(...args) {
  navigationRef.current?.replace(...args);
}

export function getCurrentRoute() {
  // console.log('new route', navigationRef);
  return navigationRef.current?.getCurrentRoute();
}
