# ProtonCMS Core

These are the core components and interfaces for ProtonCMS. You have two options. Either use a couple of other ProtonCMS-components to create a complete CMS our implement the other functionality yourself.

Godspeed!

## Developer Notes ###

### Running Tests ###
To run tests you can either run the whole suite:

    npm test

Or a specified set of tests:

    ./node_modules/mocha/bin/mocha --reporter mocha-better-spec-reporter  --compilers .:test/util-jsxcompiler.js test/test-app*.js

And if you need to debug a test just add --debug-brk and start node-inspector.


