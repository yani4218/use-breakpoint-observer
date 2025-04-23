import { FC } from 'react';
import { render, screen } from '@testing-library/react';
import { useBreakpointObserver } from './useBreakpointObserver';
import { useBreakpoints } from './breakpoints';
import { act } from 'react-dom/test-utils';

interface TestComponentProps {
    breakpoint: string;
}

const TestComponent: FC<TestComponentProps> = ({ breakpoint }) => {
    const matches = useBreakpointObserver(breakpoint);
    return <div data-testid="breakpoint-status">{matches ? 'Matches' : 'Does not match'}</div>;
};

jest.mock('./breakpoints/useBreakpoints', () => ({
    useBreakpoints: jest.fn()
}));

const observeMock = jest.fn();
const disconnectMock = jest.fn();
let resizeObserverCallback: ResizeObserverCallback | null = null;

beforeAll(() => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: query === '(min-width: 600px)',
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn()
        }))
    });

    global.ResizeObserver = jest.fn().mockImplementation((callback: ResizeObserverCallback) => {
        resizeObserverCallback = callback;
        return {
            observe: observeMock,
            disconnect: disconnectMock
        };
    });
});

describe('useBreakpointObserver', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Сбрасываем window.matchMedia для каждого теста
        window.matchMedia = jest.fn().mockImplementation((query) => ({
            matches: query === '(min-width: 600px)',
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn()
        }));
    });

    it('should return true if window matches the breakpoint', () => {
        (useBreakpoints as jest.Mock).mockReturnValue({
            small: '(min-width: 600px)',
            large: '(min-width: 1024px)'
        });

        render(<TestComponent breakpoint="small" />);

        expect(screen.getByTestId('breakpoint-status')).toHaveTextContent('Matches');
    });

    it('should return false if window does not match the breakpoint', () => {
        (useBreakpoints as jest.Mock).mockReturnValue({
            small: '(min-width: 1200px)',
            large: '(min-width: 1400px)'
        });

        render(<TestComponent breakpoint="small" />);

        expect(screen.getByTestId('breakpoint-status')).toHaveTextContent('Does not match');
    });

    it('should update the value when the window is resized', () => {
        (useBreakpoints as jest.Mock).mockReturnValue({
            small: '(min-width: 600px)',
            large: '(min-width: 1024px)'
        });

        render(<TestComponent breakpoint="small" />);
        expect(screen.getByTestId('breakpoint-status')).toHaveTextContent('Matches');

        // Мокаем window.matchMedia, чтобы для данного брейкпоинта возвращался false
        window.matchMedia = jest.fn().mockImplementation((query) => ({
            matches: query === '(min-width: 1200px)', // Теперь условие не выполняется
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn()
        }));

        act(() => {
            if (resizeObserverCallback) {
                resizeObserverCallback([], {} as ResizeObserver);
            }
        });

        expect(screen.getByTestId('breakpoint-status')).toHaveTextContent('Does not match');
    });

    it('should disconnect ResizeObserver on cleanup', () => {
        (useBreakpoints as jest.Mock).mockReturnValue({
            small: '(min-width: 600px)',
            large: '(min-width: 1024px)'
        });

        const { unmount } = render(<TestComponent breakpoint="small" />);

        expect(disconnectMock).not.toHaveBeenCalled();

        unmount();

        expect(disconnectMock).toHaveBeenCalled();
    });
});
