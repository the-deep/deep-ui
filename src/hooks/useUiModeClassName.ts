import React from 'react';
import UiModeContext, { UiMode } from '../components/UiModeContext';

function useUiModeClassName(
    uiModeFromProps: UiMode | undefined,
    lightClassName: string,
    darkClassName: string,
) {
    const { uiMode } = React.useContext(UiModeContext);
    const className = React.useMemo(() => {
        const map = {
            light: lightClassName,
            dark: darkClassName,
        };

        return map[uiModeFromProps || uiMode];
    }, [uiModeFromProps, uiMode, lightClassName, darkClassName]);

    return className;
}

export default useUiModeClassName;
