import { createHmac } from 'crypto'
import secretKey from './config/auth.js'
import pkg from 'jsonwebtoken'
import fetch from 'node-fetch'
import { Request } from 'express'
const { sign } = pkg;

/**
 * generates random characters
 * @returns {string} 20/19 random caracters
 **/
function generatePasswordSalt () {
    return Math.random().toString(8)
}

/**
* encripts provided password and salt together
* @param password password to be encripted
* @param salt random caracters to join with password to encript
* @returns {Object} object with salt and hash with encripted password
**/
function sha512(password: string, salt: string){
    let hash = createHmac('sha512', salt); // sha512 crypto algorithm
    hash.update(password);
    let digest = hash.digest('hex')
    return {
        salt,
        digest,
    };
}

/**
 * check if value is Float
 * @param value value to check
 * @returns {Boolean} boolean if is Float or not
 */
function isFloat(value: any) {
    return !isNaN(value) && 
           parseFloat(value) == value && 
           !isNaN(parseFloat(value));
}

/**
* gets parameter value in URL
* @param req express request to get URL
* @param param parameter you need the value
* @returns {string} parameter value
**/
function getURLInternalParams (req: Request, param:string) {
    return new URL(req.headers.host + req.url).searchParams.get(param)
}

/**
 * Authenticates string passed with hash on database
 * @param loginPassword password attempt
 * @param hashOnDb hash stored in database
 * @param saltOnDb salt in database the password was hashed with
 * @returns {boolean} Boolean if hashes matched or not
 */
function authenticatePassword(loginPassword: string, hashOnDb: string, saltOnDb: string) {
    return hashOnDb === sha512(loginPassword, saltOnDb).digest
}

/**
 * generates JWT token
 * @param {Object} params object with userId
 * @returns {}
 */
function generateToken (params = {}) {
    return sign(params, secretKey, { expiresIn: 86400 })
}

/**
 * get location info with provided CEP
 * @param cep ex: 88010000 or 88010-000
 * @returns {Object} JSON with location info
 */
async function getLocationWithCEP (cep: string) {
    try {
        const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
        const data = await response.json()
        return data
    } catch (err) {
        return err
    }
}

/**
 * ADD DOCUMENTATION WHEN DONE
 * @param ip 
 * @returns 
 */
async function getLocationWithIP (ip: string) {
    try {
        // NOT FINISHED - MUST PROVID APIKEY
        const response = await fetch(`https://ip-api.com/json/${ip}`)
        const data = await response.json()
        return data
    } catch(err) {
        return err
    }
}

/**
 * Gets IP address
 * @returns {Object} JSON with IP address - ex: 189.4.79.001
 */
async function getIp () {
    try {
        const response = await fetch('https://api.ipify.org/?format=json')
        const data = await response.json()
        return data
    }
    catch (err){
        return err
    }
}

export default {
    generatePasswordSalt, 
    sha512, 
    authenticatePassword, 
    generateToken,
    getLocationWithCEP,
    getLocationWithIP,
    getIp,
    getURLInternalParams,
    isFloat
}
