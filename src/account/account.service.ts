import { Injectable } from '@nestjs/common'
import { CreateAccountDto } from './dto/create-account.dto'
import { UpdateAccountDto } from './dto/update-account.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Account } from './entities/account.entity'
import { Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
      private jwtService: JwtService
  ) { }
  async findWUserName(user_name: string) {
    return this.accountRepository.findOne({ where: { user_name } });
  }
  async createToken(payload: any) {
    const token = this.jwtService.sign(payload)
    return token
  }
  async payload(token: string) {
    const payload = await this.jwtService.verify(token)
    return payload
  }
}
