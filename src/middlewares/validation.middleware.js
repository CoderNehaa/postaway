import { body, validationResult} from 'express-validator';

const valMiddleware = async ( req, res, next ) => {
  // 1. Setup rules for validation.
  const rules = [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is not valid'),
    body('password').isStrongPassword({minLength:6, minUppercase:1, minSymbols:1, minNumbers:1}).withMessage(
        "Password length should be 6 and it must contain minimum one capital letter, one symbol and one digit"
    )];

  // 2. run those rules.
  await Promise.all(rules.map(rule => rule.run(req)));

  // 3. check if there are any errors after running the rules.
  var validationErrors = validationResult(req);

  // 4. if errros, return the error message
  if (!validationErrors.isEmpty()) {
    return res.status(503).send(validationErrors);
  }
  next();
};

export default valMiddleware;
