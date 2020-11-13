import { TestController } from "../controllers/testController";

/**
 * testRoute
 * 
 * @author David Valor <davidvalorwork@gmail.com>
 * @copyright JDV
 */

/**
 * Carga el controlador
 */
const testController = new TestController();

/**
 * Habilita el Router
 */
const TestRouter:any = testController.router();

/**
 * Tests
 * 
 * Muestra todos los tests
 * 
 * @route /v1/tests
 * @method get
 */
TestRouter.get('/', testController.all);

/**
 * Test
 * 
 * Muestra el resultado de un test
 * 
 * @route /v1/tests/test/:name
 * @method get
 */
TestRouter.get('/test/:name', testController.get);

/**
 * New
 * 
 * Crea un nuevo test
 * 
 * @route /v1/tests/new
 * @method post
 */
TestRouter.post('/new', testController.new);

module.exports = TestRouter;
