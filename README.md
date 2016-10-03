# Espruino playground

[Espruino](http://www.espruino.com/) playground to play.

Toys are in the `bin/espruino` folder.

## Development

To run the grunt task to watch file changes and deploy automatically to the espruino (using [grunt-espruino](https://www.npmjs.org/package/grunt-espruino)), run:

    grunt watchFile:file

where `file` is the filename (excluding the `.js` extension), stored in `bin/espruino`.

eg, to watch `bin/espruino/led.js`

    grunt watchFile:led

To jshint the files automatically, run

    grunt watch:espruino

## Deployment

To deploy files to the espruino, run

    grunt deployFile:file

where `file` is the filename (excluding the `.js` extension), stored in `bin/espruino`.

## Testing

Uses [karma](http://karma-runner.github.io/) and [jasmine](https://jasmine.github.io/).

Karma is run automatically when `grunt` is called. To run it manually

    karma start config/karma.conf.js

For continuous integration, run

    grunt ci:test

    # Or,

    npm test
