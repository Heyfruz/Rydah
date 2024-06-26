module.exports = function (api) {
  api.cache(true);
  return {
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            assets: './app/assets',
            components: './app/components',
            constant: './app/constant',
            core: './app/core',
            data: './app/data',
            hooks: './app/hooks',
            navigation: './app/navigation',
            screens: './app/screens',
            service: './app/service',
            store: './app/store',
            utils: './app/utils',
          },
          extensions: ['.js', '.ts', '.tsx'],
          root: ['./'],
        },
      ],
      'react-native-reanimated/plugin',
    ],
    presets: ['babel-preset-expo'],
  };
};
