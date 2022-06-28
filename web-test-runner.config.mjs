import { visualRegressionPlugin } from "@web/test-runner-visual-regression/plugin";

export default {
  plugins: [
    visualRegressionPlugin({
      update: process.argv.includes("--update-visual-baseline")
    })
  ],
  testRunnerHtml: (testFramework) =>
    `<html>
      <head><link rel="stylesheet" href="dist/calcite/calcite.css" /></head>
      <body>
        <script>window.process = { env: { NODE_ENV: "development" } }</script>
        <script type="module" src="${testFramework}"></script>
      </body>
    </html>`
};
