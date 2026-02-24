const config = {
  plugins: {
    "postcss-preset-env": {
      stage: 3,
      features: {
        /**
         * We want to use CSS Nesting Rules, which are currently Stage 2. Once
         * these rules go to Stage 3, we can probably update our dependencies
         * and remove this config file again to defer to Next's defualts.
         *
         * https://preset-env.cssdb.org/features/#nesting-rules
         */
        "nesting-rules": true,
      },
    },
  },
};

export default config;
