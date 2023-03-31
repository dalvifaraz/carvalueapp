import { BadRequestException, Injectable } from '@nestjs/common';
import { UsersService } from './users.service';
import { promisify } from 'util';
import { scrypt as _scrypt, randomBytes } from 'crypto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signup(email: string, password: string) {
    //See if email is in use
    const user = await this.usersService.find(email);
    if (user) {
      throw new BadRequestException('Email in use');
    }

    //Hash the user password
    // - Generate the salt
    const salt = randomBytes(8).toString('hex');

    // - Hash the salt and password together
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    // - Join both hash and salt and Store both hashed value and salt in DB
    const result = salt + '.' + hash.toString('hex');

    //Creating a new user and save it

    // return the user
  }

  signin() {}
}
