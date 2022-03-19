import { scrypt, randomBytes } from 'crypto';
import { promisify } from 'util';


const scryptAsync = promisify(scrypt);

export class Password{

  static async toHash(password: string): Promise<string> {
    const salt = randomBytes(8).toString('hex');
    return this.toHashWithSalt(password, salt)
  }

  static async toHashWithSalt(password: string, salt: string): Promise<string> {
    const buf = (await scryptAsync(password, salt, 64)) as Buffer;
    return `${buf.toString('hex')}.${salt}`
  }

  static async compare(storedPassword: string, suppliedPassword: string): Promise<boolean> {
    const [, salt] = storedPassword.split('.');
    const hashedPassword = await this.toHashWithSalt(suppliedPassword,salt );
    return hashedPassword === storedPassword;
  }

}