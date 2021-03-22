import { configureActions } from '@storybook/addon-actions';
import '../src/styles.css';

export const parameters = {
    actions: { argTypesRegex: "^on[A-Z].*" },
    backgrounds: {
        default: 'light',
        values: [
            {
                name: 'light',
                value: '#F0F0F0',
            },
            {
                name: 'dark',
                value: '#212121',
            },
        ],
    },
}

configureActions({
  depth: 3,
  // Limit the number of items logged into the actions panel
  limit: 20,
});
