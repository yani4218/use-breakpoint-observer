import { useEffect, useMemo, useState } from 'react';

import { useBreakpoints } from './breakpoints';

/**
 * @description React-hook for work with media breakpoints, based on Resize Observer https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver
 * @param breakpoint name of prop from breakpoints object, for which we check matches
 */
export const useBreakpointObserver = <T extends Record<string, string>>(
    breakpoint: keyof T
): boolean => {
    const breakpoints = useBreakpoints() as T;
    const getBreakpointsMatcher = () => window.matchMedia(breakpoints[breakpoint]).matches;
    const [breakpointsMatcher, setBreakpointsMatcher] = useState<boolean>(getBreakpointsMatcher());
    const cachedBreakpointsMatcher = useMemo(() => breakpointsMatcher, [breakpointsMatcher]);

    useEffect(() => {
        const observer = new ResizeObserver(() => setBreakpointsMatcher(getBreakpointsMatcher()));

        observer.observe(document.body);

        return () => observer.disconnect();
    }, []);

    return cachedBreakpointsMatcher;
};
