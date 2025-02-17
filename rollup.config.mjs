import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import postcss from "rollup-plugin-postcss";
import terser from "@rollup/plugin-terser";
import peerDepsExternal from "rollup-plugin-peer-deps-external";

export default {
  input: "packages/components/src/index.ts",
  output: [
    {
      file: "packages/components/dist/index.js",
      format: "cjs",
      sourcemap: true
    },
    {
      file: "packages/components/dist/index.esm.js",
      format: "esm",
      sourcemap: true
    }
  ],
  external: [
    "react", 
    "react-dom",
    "@radix-ui/react-slot",
    "@radix-ui/react-avatar",
    "class-variance-authority",
    "clsx",
    "lucide-react",
    "tailwind-merge",
    "tailwindcss-animate"
  ],
  plugins: [
    peerDepsExternal(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: "./packages/components/tsconfig.json",
      declaration: true,
      declarationDir: "packages/components/dist",
      exclude: ["**/*.test.ts", "**/*.test.tsx"]
    }),
    postcss({
      config: {
        path: "./postcss.config.js"
      },
      extensions: [".css"],
      minimize: true,
      inject: {
        insertAt: "top"
      }
    }),
    terser()
  ]
};