/**
 * @type {import('postcss').ProcessOptions}
 */
const postcssConfig = {
  plugins: {
    '@csstools/postcss-global-data': {
      files: ['./src/app/media.css'],
    },
    'postcss-custom-media': {},
    'postcss-nesting': {},
    'postcss-flexbugs-fixes': {},
    'postcss-preset-env': {
      autoprefixer: {
        flexbox: 'no-2009',
      },
      stage: 3,
      features: {
        'custom-properties': false,
      },
    },
  },
};

export default postcssConfig;
