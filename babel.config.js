export default {
  presets: [
    '@vue/cli-plugin-babel/preset',
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'src/components',
        style: false,
      },
    ],
  ],
};
