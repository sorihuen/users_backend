const validateUser = require('../Middleware/validationMiddleware');
const User = require('../Model/users'); 


//***** Función para crear un nuevo usuario ******
const createUser = async (req, res) => {
  try {
    const { name, email, age, addresses } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "El email ya está en uso. Intenta con otro." });
    }

    const newUser = new User({ name, email, age, addresses });
    await newUser.save();

    res.status(201).json({
      message: "Usuario creado exitosamente",
      user: newUser 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error interno del servidor. Intenta más tarde." });
  }
};



//****** Obtener todos los usuarios *******

const getUsers = async (req, res) => {
  try {
    // Extraer parámetros de consulta (query params)
    const { page = 1, limit = 10, sortBy = 'created_at', order = 'desc', name} = req.query;

    // Construir opciones de paginación
    const options = {
      page: parseInt(page, 10), // Convertir a número
      limit: parseInt(limit, 10), // Convertir a número
      sort: { [sortBy]: order === 'asc' ? 1 : -1 }, // Ordenar por el campo especificado
    };

    // filtro 
    const filter = {};
    if (name) filter.name = { $regex: name, $options: 'i' }; // Buscar por nombre (insensible a mayúsculas/minúsculas)

    // Usar `paginate` de mongoose-paginate-v2 para paginar los resultados
    const users = await User.paginate(filter, options);

    res.status(200).json({
      message: "Usuarios obtenidos exitosamente",
      data: users.docs, // Los documentos (usuarios)
      total: users.totalDocs, // Total de usuarios
      page: users.page, // Página actual
      totalPages: users.totalPages, // Total de páginas
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los usuarios", error: error.message });
  }
};

//***** Obtener usuario por ID *******

const getUserById = async (req, res) => {
  try {
    const { id } = req.params; // Obtener el ID desde los parámetros de la URL

    // Buscar usuario por ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    res.status(200).json({
      message: "Usuario encontrado",
      user,
    });

  } catch (error) {
    console.error(error);

    // Verificar si el error es por un ID inválido
    if (error.kind === "ObjectId") {
      return res.status(400).json({ message: "ID de usuario inválido" });
    }

    res.status(500).json({ message: "Error al obtener el usuario", error: error.message });
  }
};


const updateUser = async (req, res) => {
  try {
      const { id } = req.params; // Obtener el ID de los parámetros
      const updates = req.body; // Datos a actualizar

      // Buscar y actualizar el usuario, devolviendo el documento actualizado
      const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true });

      if (!updatedUser) {
          return res.status(404).json({ error: "Usuario no encontrado" });
      }

      res.status(200).json({
          message: "Usuario actualizado exitosamente",
          user: updatedUser 
      });

  } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Error interno del servidor. Intenta más tarde." });
  }
};


module.exports = { 
  createUser, 
  validateUser, 
  getUsers,
  getUserById, 
  updateUser,

};




