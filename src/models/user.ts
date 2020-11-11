import { createSchema, Type, typedModel } from 'ts-mongoose';

/**
 * Esquema de Usuario
 */
const schema = createSchema({
    name: Type.string({ required: true }),
    last_name: Type.string({ required: true }),
    email: Type.string({ required: true, unique: true }),
    password: Type.string(),
    create: Type.date({ default: Date.now }),
    role: Type.string({ enum: ['user', 'admin'], default: 'user' }),
    verified: Type.boolean({ default: false }),
    attempts: Type.number({ default: 0 }),
    photo: Type.string({ default: 'profile.jpg' }),
    deleted: Type.boolean({ default: false }),
    verification_token: Type.string({ default: null }),
    recover_password_token: Type.string({ default: null })
});



const User = typedModel('User', schema, undefined, undefined, {

    /**
     * Obtiene el usuario por su id
     * 
     * @param {string} id   El id del usuario 
     */
    async findByUserId(id:string)
    {
        return await User.findById(id);
    },

    /**
     * Obtiene el usuario por su email
     * 
     * @param {string} email   El email del usuario 
     */
    findByEmail(email:string)
    {
        return User.findOne({ email : email});
    },

    /**
     * Obtiene el usuario por el token de recuperación de contraseña
     * 
     * @param {string} token    El token de recuperación de contraseña 
     */
    findByRecoveryPasswordToken(token: string)
    {
        return User.findOne({ recover_password_token: token });
    },

    /**
     * Crea un nuevo usuario
     * 
     * @param  {User}    user   El usuario a crear 
     * 
     * @return {User}           El usuario guardado
     * @throws {Error}          El usuario ya está registrado
     */
    async create(user:any) 
    {
        // Comprueba si la dirección de correo suministrada ya está registrada
        let userExists = await User.findByEmail(user.email);
        
        if (userExists) {
            // El usuario ya existe
            console.warn(`[WARN] El usuario ${user.email} ya está registrado. No se creará una nueva cuenta`);
            throw 'user-already-exists';
        } else {
            // Guarda el nuevo usuario
            return user.save();
        }
    },

    /**
     * Cambia la contraseña de acceso del usuario
     * 
     * @param {string} token        El token de usuario
     * @param {string} password     La contraseña cifrada
     */
    newPassword(token: string, password: string) {
        return User.findOneAndUpdate({ recover_password_token: token }, 
            { 
                password                : password, 
                recover_password_token  : null      // El token una vez usado es eliminado 
            });
    },

    /**
     * Envía el email para cambiar la contraseña del usuario
     * 
     * @param {string} email    El email
     * @param {string} token    El token
     * 
     * @return {User} user      El usuario actualizado
     */

    async forgot(email: string, token: string) {
        // Obtiene el usuario de email dado, y un token para recuperar su contraseña
        var user = await User.findOne({ email, deleted: false });

        // Si el usuario existe
        if (user) {
            // Actualiza el usuario con el token
            var user = await User.findByIdAndUpdate(user._id, { recover_password_token: token });

            return user;
        } else {
            throw 'User not found';
        }
    },

    /**
     * Verifica la cuenta de usuario
     * 
     * @param {string} token El token de verificación de la cuenta
     * 
     * @return {User}        El usuario de token dado
     */
    async verification(token:string) 
    {
        console.log(token);
        
        let user = await User.findOneAndUpdate(
            { 
                verification_token  : token 
            }, 
            { 
                verification_token: 'v', 
                verified: true 
            }
        );

        if (user) {
            return user;
        } else {
            throw 'Invalid token';
        }
    },

    /**
     * Autentica el usuario por email y contraseña
     * 
     * @param {string} email        La dirección de email
     * @param {string} password     La contraseña
     * 
     * @return {user}               El usuario
     * @throws {error}              No existe el usuario con las credenciales suministradas
     */
    async auth(email:string, password: string)
    {
        let user = await User.findOne({ email: email });

        if (!user) {
            throw 'User not found';
        }

        return user;
    },

    /**
     * Incrementa el número de intentos fallidos
     * 
     * @param {User} user El usuario
     * 
     * @return {number}   El número de intentos fallidos desde el inicio de sesión
     */
    async incrementAccessAttemps(user)
    {
        let userUpdated = await User.findByIdAndUpdate(user._id, { $inc: { attempts: 1 }},{ new : true });
          
        return userUpdated.attempts;
    },

    /**
     * Reinicia el número de intentos fallidos
     * 
     * @param {User} user   El usuario 
     */
    resetAccessAttemps(user)
    {
        return User.findByIdAndUpdate(user._id, { attempts: 0 });
    }

});

/**
 * Exporta el modelo
 */
export default User;
