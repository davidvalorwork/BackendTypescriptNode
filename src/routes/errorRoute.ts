import { HttpErrorController } from '../controllers/httpErrorController';

/**
 * errorRoute
 * 
 * @author David Valor <davidvalorwork@gmail.com>
 * @copyright JDV
 */



/**
 * Carga el controlador
 */
const httpErrorController = new HttpErrorController();

/**
 * Habilita el Router
 */
const HttpErrorRouter:any = httpErrorController.router();

/**
 * Error
 * 
 * Muestra un error HTTP
 * 
 * @route /error/:code
 * @method get
 */
HttpErrorRouter.get('/:code', httpErrorController.index);

module.exports = HttpErrorRouter;
