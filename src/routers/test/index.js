import Controller from 'lib/controller';

import services from 'service/test/index';

const controller = new Controller();

controller.register('get', '/', (req, res) => services.testApi(req, res))

export default controller.router;