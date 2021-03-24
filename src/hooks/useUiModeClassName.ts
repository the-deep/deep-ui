import React from 'react';
import UiModeContext, { UiModeType } from '../components/UiModeContext';

function useUiModeClassName(
    uiModeFromProps: UiModeType | undefined,
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
