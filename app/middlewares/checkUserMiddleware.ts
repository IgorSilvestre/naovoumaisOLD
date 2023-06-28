import secretKey from '../config/auth.js'
import { Request, Response, NextFunction } from 'express'
import pkg from 'jsonwebtoken';
const { verify } = pkg;

export default (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization

    if(!authHeader)
        return res.status(401).send({ error: 'No token provided'})
    
    const tokenParts = authHeader?.split(' ')
    if(tokenParts?.length !== 2)
        return res.status(401).send({ error: 'Dividing token parts'})
    
    const [ scheme, token ] = tokenParts || []

    if(!/^Bearer$/i.test(scheme))
        return res.status(401).send({ error: 'Token syntax error' })

    verify(token, secretKey, (err: any, decoded: any) => {
        if(err)
            return res.status(401).send({ error: 'Invalid token' })
        req.body.userId = decoded.id
    })
    
    next()
}