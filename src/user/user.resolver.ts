import { Resolver, Query } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { User } from './user.model';
import { firstValueFrom } from 'rxjs';

@Resolver(() => User)
export class UserResolver {
  constructor(
    @Inject('USER_SERVICE') private readonly userService: ClientProxy,
  ) {}
  //Here we are defining a query that will return all users from the user service.
  @Query(() => [User])
  async users() {
    return firstValueFrom(this.userService.send({ cmd: 'get_users' }, {}));
  }
}
