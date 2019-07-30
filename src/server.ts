import { appPromise } from "./app";

appPromise.then((app) => {
  app.listen(3000);
})