// vetur.config.js
/** @type {import('vls').VeturConfig} */
module.exports = {
  settings: {
    "vetur.useWorkspaceDependencies": true,
    "vetur.experimental.templateInterpolationService": true
  },
  projects: [
    './packages/repo2', // Shorthand for specifying only the project root location
    {
      root: './vue-component',
    }
  ]
}