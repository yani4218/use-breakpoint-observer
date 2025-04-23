import './App.css';

import { useBreakpointObserver } from '../lib/main';

export const App = () => {
    const isXSmall = useBreakpointObserver('XSmall');
    const isSmall = useBreakpointObserver('Small');

    return (
        <>
            <div>{isXSmall ? 'XSmall' : 'not XSmall'}</div>
            <div>{isSmall ? 'isSmall' : 'not isSmall'}</div>
        </>
    );
};
