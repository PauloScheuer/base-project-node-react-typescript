import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { user, admin } from '../config/auth';
const authUser = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  console.log(req.headers.authorization);
  if (!authHeader) {
    return res.status(401).send({ error: 'Nenhum token recebido' });
  }
  const parts = authHeader.split(' ');
  if (parts.length !== 2) {
    return res.status(401).send({ error: 'Formato do token inválido' });
  }
  const [scheme, token] = parts;
  if (!scheme.includes('BEARER')) {
    return res.status(401).send({ error: 'Token errado' });
  }
  jwt.verify(token, user, (err, decoded: any) => {
    if (err) {
      return res.status(401).send({ error: 'Token inválido' });
    }
    req.body.idToken = decoded.id;
    return next();
  });
};
const authAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ error: 'Nenhum token recebido' });
  }
  const parts = authHeader.split(' ');
  if (parts.length !== 2) {
    return res.status(401).send({ error: 'Formato do token inválido' });
  }
  const [scheme, token] = parts;
  if (!scheme.includes('BEARER')) {
    return res.status(401).send({ error: 'Token errado' });
  }
  jwt.verify(token, admin, (err, decoded: any) => {
    if (err) {
      return res.status(401).send({ error: 'Token inválido' });
    }
    req.body.idToken = decoded.id;
    return next();
  });
};
const authBoth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ error: 'Nenhum token recebido' });
  }
  const parts = authHeader.split(' ');
  if (parts.length !== 2) {
    return res.status(401).send({ error: 'Formato do token inválido' });
  }
  const [scheme, token] = parts;
  if (!scheme.includes('BEARER')) {
    return res.status(401).send({ error: 'Token errado' });
  }
  let isOk: Boolean = false;
  jwt.verify(token, admin, (err) => {
    if (!err) {
      isOk = true;
      req.body.idToken = 0;
    }
  });
  jwt.verify(token, user, (err, decoded: any) => {
    if (!err) {
      isOk = true;
      req.body.idToken = decoded.id;
    }
  });
  if (isOk === true) {
    return next();
  } else {
    return res.status(401).send({ error: 'Token inválido' });
  }
};
export { authUser, authAdmin, authBoth };
