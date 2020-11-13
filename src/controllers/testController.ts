import { BaseController } from './baseController';
import { HttpResponse } from '../helpers/httpResponse';
import { Request, Response } from 'express';


import Test from '../models/test';

/**
 * TestController
 * 
 * Controlador para testing
 *  
 * @author David Valor <davidvalorwork@gmail.com>
 * @copyright JDV
 */
 
export class TestController extends BaseController
{
    /**
     * El constructor
     */
    public constructor()
    {
        // Llamamos al constructor padre
        super();
    }

    /**
     * Muestra un test
     * 
     * @route /v1/tests/test/:name
     * 
     * @example
     * 
     * GET /v1/tests/test/Pacman
     */
    public get(request:Request, response:Response)
    {
        // Obtiene el id
        let name:string = request.params.name;

        // El momento actual
        let moment:string = new Date().toLocaleTimeString();

        Test.findByName(name)
            .then((tests: any) => {
                console.log(`[OK] ${moment} Se han obtenido ${tests.length} tests para ${name}.`);
                response.send(`[OK] ${moment} se ha obtenido los tests ${tests}`);
            })
            .catch((error:any) => {
                console.error(`[ERROR] ${moment} ${error}`);
            }); 
    };

    /**
     * Muestra todos los tests
     * 
     * @route /v1/tests
     * 
     * @example
     * 
     * GET /v1/tests
     */
    public all(request:Request, response:Response)
    {
        // El momento actual
        let moment:string = new Date().toLocaleTimeString();

        Test.find()
            .then(tests => {
                console.log(`[OK] ${moment} Se han obtenido ${tests.length} tests`);
                response.send(`[OK] ${moment} Lista de Tests ${tests}`);
            })
            .catch(error => {
                console.error(`[ERROR] ${moment} ${error}`);
            }); 
    };

    /**
     * Crea un test
     * 
     * @route /v1/tests/new
     * 
     * @xample
     * 
     * POST /v1/tests/new name='Space Invaders' vendor='Taito' date='1979-01-01' record=184870
     */
    public new(request:Request, response:Response)
    {
        // Crea un nuevo test
        let test = new Test({
            name      : request.body.name,              // El nombre
            vendor    : request.body.vendor,            // El fabricante
            date      : new Date(request.body.date),    // La fecha de lanzamiento
            record    : request.body.record             // La máxima puntuación conseguida
        });

        // El momento actual
        let moment:string = new Date().toLocaleTimeString();

        // Guarda el test
        test.save()
            .then(test => {
                console.log(`[OK] ${moment} Se ha creado un nuevo test #${test.id} ${test.name}.`);
                response.send(`[OK] ${moment} se ha creado un nuevo test`);
            })
            .catch(error => {
                console.error(`[ERROR] ${moment} ${error}`);
            });
    }
}
