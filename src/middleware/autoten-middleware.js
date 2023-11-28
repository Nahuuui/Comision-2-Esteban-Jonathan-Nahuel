import jwt from 'jsonwebtoken';
import {UserModel} from '../models/user-model.js'
import {dbConfig} from '../db/db-config.js'


export const autotenMiddleware = async (req, res, next) => {
    try {
      // Obtener el token de la cabecera y decodificarlo
      const token = req.header('Authorization').replace('Bearer ', '');
      const decoded = jwt.verify(token, dbConfig.jwtSecret);
  
      // Buscar al usuario en la base de datos por su ID y verificar que el token coincida
      const user = await UserModel.findOne({ _id: decoded.userId, 'tokens.token': token });
  
      if (!user) {
        throw new Error();
      }
  
      // Almacenar el token y el usuario en el objeto de solicitud (req) para su uso posterior
      req.token = token;
      req.user = user;
      next();
    } catch (error) {
      // Enviar una respuesta de error si la autenticación falla
      res.status(401).json({ error: 'Autenticación requerida.' });
    }
  };