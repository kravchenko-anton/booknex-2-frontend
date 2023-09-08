module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ["nativewind/babel"], [
        'babel-plugin-root-import',
        {
          rootPathSuffix: 'app/',
          rootPathPrefix: '@/'
        }
      ],
      [
        'module:react-native-dotenv',
        {
          envName: 'APP_ENV',
          moduleName: '@env',
          path: '.env',
          safe: false,
          allowUndefined: true,
          verbose: false
        }
      ],
      [
        'react-native-reanimated/plugin',
        {
          relativeSourceLocation: true,
          
        }
      ]
    ]
  };
};
