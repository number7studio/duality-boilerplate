import serverStart from './app';
import config from 'config';

serverStart.then(app => {
  app.listen(config.get('application.port'), () => {
    console.log('Listenting on', config.get('application.port'))
  });
});
