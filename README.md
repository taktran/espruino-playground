# Espruino playground

[Espruino](http://www.espruino.com/) playground to play.

Toys are in the `bin/espruino` folder.

## Development

To run the grunt task to watch file changes and deploy automatically (using [grunt-espruino](https://www.npmjs.org/package/grunt-espruino)), run:

    grunt espruino:file
    # eg,
    grunt espruino:led

The file needs to be configured in `Gruntfile.js`.

## Testing

Uses [karma](http://karma-runner.github.io/) and [jasmine](http://pivotal.github.io/jasmine/).

Karma is run automatically when `grunt` is called. To run it manually

    karma start config/karma.conf.js

For continuous integration, run

    grunt ci:test

    # Or,

    npm test
