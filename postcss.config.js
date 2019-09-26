module.exports = {
    plugins: {
        'postcss-css-variables': {
            variables: {
                '--green-color': {
                    value: '#31bc86'
                },
                '--blue-color': {
                    value: '#5396d8'
                },
                '--grey-color': {
                    value: '#424a60'
                },
                '--red-color': {
                    value: '#e74856'
                },
                '--back-black-color': {
                    value: '#1e272e'
                },
                '--neo-black-color': {
                    value: '#2C3A47'
                },
                '--white-color': {
                    value: '#f5f6fa'
                },
                '--white-color-back': {
                    value: '#f0f2fa'
                }
            }
        },
        'postcss-preset-env': {
            stage: 4,
            features: {
                'nesting-rules': true
            }
        },
        'postcss-color-function': {},
        'postcss-easings': {
            easings: { easeOne: 'cubic-bezier(0.23, 1, 0.32, 1)' }
        }
    }
};
