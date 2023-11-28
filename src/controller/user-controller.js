// Controlador para registrar nuevos usuarios
const registerUserController = async (req, res) => {
    try {
      const { username, password, email, avatarURL } = req.body;
  
      // Crear un nuevo usuario utilizando el modelo
      const newUser = new UserModel({
        username,
        password,
        email,
        avatarURL,
        tokens: [], // Aquí se guarda el token generado al registrar un usuario
      });
  
      // Guardar el nuevo usuario en la base de datos
      await newUser.save();
      res.status(201).json({ message: 'Usuario registrado exitosamente.' });
    } catch (error) {
      if (error.code === 11000) {
        // Manejar el error de duplicado (nombre de usuario ya existe)
        res.status(400).json({ error: 'Nombre de usuario duplicado. Por favor, elija otro.' });
      } else {
        console.error(error);
        res.status(500).json({ error: 'Error al registrar el usuario.' });
      }
    }
  };
  
  // Controlador para el inicio de sesión de los usuarios
  const loginUserController = async (req, res) => {
    try {
      const { username, password } = req.body;
      // Buscar al usuario en la base de datos
      const user = await UserModel.findOne({ username });
  
      if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidas.' });
      }
  
      // Verificar la coincidencia de contraseñas utilizando bcrypt
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Credenciales inválidas.' });
      }
  
      // Generar un token de autenticación utilizando jwt
      const token = jwt.sign({ userId: user._id }, config.jwtSecret);
      // Agregar el token a la lista de tokens del usuario
      user.tokens.push({ token });
      // Guardar los cambios en el usuario
      await user.save();
  
      res.status(200).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al iniciar sesión.' });
    }
  };
  
  // Controlador para cerrar sesión de los usuarios
  const logoutUserController = async (req, res) => {
    try {
      const { user } = req;
  
      if (!user) {
        return res.status(401).json({ error: 'No autorizado.' });
      }
  
      // Eliminar el token actual de la lista de tokens del usuario
      user.tokens = user.tokens.filter(tokenObj => tokenObj.token !== req.token);
      // Guardar los cambios en el usuario
      await user.save();
  
      res.status(200).json({ message: 'Sesión cerrada exitosamente.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al cerrar sesión.' });
    }
  };
  
  export {
    registerUserController,
    loginUserController,
    logoutUserController,
  };