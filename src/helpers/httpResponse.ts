/**
 * Enumeración HttpResponseCode
 * 
 * Codigos de respuesta HTTP estándar
 * 
 * @author David Valor <davidvalorwork@gmail.com>
 * @copyright JDV
 *
 */

export enum HttpResponse
{
    // Mensajes HTTP
    Ok              = 200,
    
    // Errores HTTP
    BadRequest      = 400,
    Unauthorized     = 401,
    Forbidden       = 403,
    NotFound        = 404
}
