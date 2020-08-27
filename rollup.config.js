// Rollup plugins
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import replace from "rollup-plugin-replace";
import commonjs from "rollup-plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import image from "@rollup/plugin-image";
import json from "@rollup/plugin-json";
import copy from "rollup-plugin-copy";

import pkg from "./package.json";

const plugins = [
  replace({
    "process.env.NODE_ENV": JSON.stringify("production"),
  }),
  postcss(),
  commonjs({
    include: ["node_modules/**"],
    exclude: ["node_modules/process-es6/**"],
    namedExports: {
      "node_modules/react/index.js": [
        "Children",
        "Component",
        "PropTypes",
        "createElement",
        "isValidElement",
        "cloneElement",
        "createRef",
      ],
      "node_modules/react-dom/index.js": ["render"],
    },
  }),
  babel({
    exclude: "node_modules/**",
    runtimeHelpers: true,
  }),
  resolve({
    jsnext: true,
    main: true,
    browser: true,
  }),
  image(),
  json(),
  copy({
    targets: [{ src: "kloudi/images/", dest: "dist/" }],
  }),
];

export default {
  input: "kloudi/components/modal-command-panel/ModalCommandPanel.js",
  external: ["react", "react-dom"],
  output: [
    {
      file: pkg.main,
      format: "umd",
      globals: {
        react: "React",
        "react-dom": "ReactDOM",
      },
      sourcemap: "external",
      name: "ModalCommandPanel",
      exports: "named",
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: "external",
    },
  ],
  plugins,
};
