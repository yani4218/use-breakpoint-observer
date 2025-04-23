import { createContext } from 'react';

// Здесь контекст может быть либо объектом, либо null
type BreakpointsContextType = Record<string, string> | null;

/**
 * @description Context for setup custom breakpoints object for useBreakpointObserver.
 */
export const BreakpointsContext = createContext<BreakpointsContextType>(null);
