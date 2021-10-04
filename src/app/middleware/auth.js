const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
  const authToken = req.headers.authorization;
  
  if (!authToken)
    return res.status(401).send({ error: 'No token provided' });

  const parts = authToken.split(' ');  

  if (!parts.length === 2)
    return res.status(401).send({ error: 'Token error' });

  const [ scheme, token ] = parts;  

  if (!/^Bearer$/i.test(scheme))
    return res.status(401).send({ error: 'Token malformatted' });

  jwt.verify(token, process.env.APP_SECRET, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Token invalid' });

    req.id = decoded.id;
    
    return next();
  });
};
