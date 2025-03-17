const { body, validationResult } = require('express-validator');

const validateUser = [
  body('name').notEmpty().withMessage('El nombre es obligatorio'),
  body('email')
    .isEmail().withMessage('Debe ser un email válido')
    .notEmpty().withMessage('El email es obligatorio'),
  body('age')
    .optional()
    .isNumeric().withMessage('La edad debe ser un número'),
  body('addresses')
    .custom((value) => {
      if (!Array.isArray(value)) {
        throw new Error('Las direcciones deben ser un array');
      }
      if (!value.every(addr => 
          typeof addr === 'object' && 
          addr.street && 
          addr.city && 
          addr.country && 
          addr.postal_code)) {
        throw new Error('Cada dirección debe contener street, city, country y postal_code');
      }
      return true;
    }),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Enviar errores de forma estructurada
      const formattedErrors = errors.array().reduce((acc, err) => {
        acc[err.path] = err.msg;
        return acc;
      }, {});

      return res.status(400).json({ errors: formattedErrors });
    }
    next();
  }
];

module.exports = validateUser;

