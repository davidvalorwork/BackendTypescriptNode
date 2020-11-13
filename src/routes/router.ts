import * as express from 'express';

/**
 * Router
 * 
 * Maneja las rutas de la aplicación
 * 
 * @author David Valor <davidvalorwork@gmail.com>
 * @copyright JDV
 */

export class Router
{
    /**
     * El router de express
     */
    protected route:any;

    /**
     * El constructor
     * 
     * @param {Express.express} app     La aplicacion express
     */
    public constructor(app:express.Express)
    {
        this.route = app;

        // Carga las rutas
        this.router();
    }

    /**
     * Rutas principales de la aplicación
     * 
     * Llama a los restantes enrutadores
     */
    public router():void
    {
        /**
         * Manejador de rutas de errores
         *
         * @route /v1/error/...
         */
        this.route.use('/v1/error', require('./errorRoute'));
        
        /**
         * Manejador de rutas de tests
         *
         * @route /v1/tests/...
         */
        this.route.use('/v1/tests', require('./testRoute'));

        /**
         * Manejador de rutas de usuarios
         *
         * @route /v1/user/...
         */
        this.route.use('/v1/user', require('./userRoute'));
    }
}
