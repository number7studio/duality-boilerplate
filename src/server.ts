import { appPromise } from './app';
import config from 'config';

appPromise.then(app => {
  app.listen(config.get('application.port'), () => {
    console.log('Listenting on', config.get('application.port'))
  });
});
