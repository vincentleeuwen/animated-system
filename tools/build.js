import webpack from 'webpack';
import webpackConfig from '../webpack.config.prod';
import colors from 'colors';

// this assures Babel dev config (hot reloading etc.) doesn't apply
process.env.NODE_ENV = 'production';

console.log('Generating minified bundle for production via Webpack....'.blue);

webpack(webpackConfig).run((err, stats) => {
  if (err) { // so a fatal error occurred. Stop here.
    console.log(err.bold.red);
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    console.log('Webpack generated the following warnings: '.bold.yellow);
    jsonStats.warnings.map(warning => console.log(warning.yellow));
  }

  console.log(`Webpack stats: ${stats}`);

  // if we got this far, the build succeeded.
  console.log('Your app has been compiled in production mode and written to /dist. Lets go!'.green);

  return 0;

});
