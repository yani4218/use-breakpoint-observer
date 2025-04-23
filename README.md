# react-breakpoint-observer-hook

React-hook for work with media breakpoints, based on Resize Observer https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver

## Run eslint

```PowerShell
    npm run lint
```

## Run test

```PowerShell
    npm run test
```

## Getting started

1. Install

```PowerShell
    npm i react-breakpoint-observer-hook
```
or 

```PowerShell
    yarn add react-breakpoint-observer-hook
```

2. Default breakpoints

defaultBreakpoints constant take from the Material Design specification. https://m1.material.io/layout/responsive-ui.html

```typescript
    export const defaultBreakpoints = {
      XSmall: '(max-width: 599.98px)',
      Small: '(min-width: 600px) and (max-width: 959.98px)',
      Medium: '(min-width: 960px) and (max-width: 1279.98px)',
      Large: '(min-width: 1280px) and (max-width: 1919.98px)',
      XLarge: '(min-width: 1920px)',
      Handset:
          '(max-width: 599.98px) and (orientation: portrait), (max-width: 959.98px) and (orientation: landscape)',
      Tablet: '(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait), (min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)',
      Web: '(min-width: 840px) and (orientation: portrait), (min-width: 1280px) and (orientation: landscape)',
      HandsetPortrait: '(max-width: 599.98px) and (orientation: portrait)',
      TabletPortrait: '(min-width: 600px) and (max-width: 839.98px) and (orientation: portrait)',
      WebPortrait: '(min-width: 840px) and (orientation: portrait)',
      HandsetLandscape: '(max-width: 959.98px) and (orientation: landscape)',
      TabletLandscape: '(min-width: 960px) and (max-width: 1279.98px) and (orientation: landscape)',
      WebLandscape: '(min-width: 1280px) and (orientation: landscape)'
  };
```

3. Based usage:

```typescript
    import React from 'react';
    import { useBreakpointObserver } from 'use-resize-observer';

    const App = () => {
      const isSmall = useBreakpointObserver('Small');

      return (
          <>
              <div>{isSmall ? 'isSmall' : 'not isSmall'}</div>
          </>
      );
    };

    export default App;
```

4. Usage with custom breakpoints: 

Add BreakpointsContext with your breakpoints object, then useBreakpointObserver should using your matchers for ResizeObserver. 
For example main.tsx:

```typescript
    import { StrictMode } from 'react';
    import { createRoot } from 'react-dom/client';

    import { BreakpointsContext } from 'use-resize-observer';

    import App from './App.tsx';

    const myBreakpoints = {
        XSmall: '(max-width: 599.98px)',
        CustomSmall: '(min-width: 600px) and (max-width: 959.98px)',
        Medium: '(min-width: 960px) and (max-width: 1279.98px)',
        Large: '(min-width: 1280px) and (max-width: 1919.98px)',
        XLarge: '(min-width: 1920px)'
    } as const;

    createRoot(document.getElementById('root')!).render(
        <StrictMode>
            <BreakpointsContext.Provider value={myBreakpoints}>
                <App />
            </BreakpointsContext.Provider>
        </StrictMode>
    );
```

In component:

```typescript
    import React from 'react';
    import { useBreakpointObserver } from 'use-resize-observer';

    const App = () => {
      const isSmall = useBreakpointObserver('CustomSmall');

      return (
          <>
              <div>{isSmall ? 'isSmall' : 'not isSmall'}</div>
          </>
      );
    };

    export default App;
```
