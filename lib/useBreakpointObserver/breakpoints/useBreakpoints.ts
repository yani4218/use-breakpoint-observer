import { useContext } from 'react';

import { BreakpointsContext } from './breakpointsContext';
import { defaultBreakpoints } from './defaultBreakpoints';

export const useBreakpoints = (): Record<string, string> => {
    const context = useContext(BreakpointsContext);
    return context || defaultBreakpoints;
};
