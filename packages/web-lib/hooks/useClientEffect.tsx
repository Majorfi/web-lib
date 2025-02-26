import {useEffect, useLayoutEffect} from 'react';

const isBrowser = typeof window !== 'undefined';
const useClientEffect = isBrowser ? useLayoutEffect : useEffect;

export {useClientEffect};
export default useClientEffect;
