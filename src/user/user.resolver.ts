import { Resolver, Query, Args } from '@nestjs/graphql';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query()
  async user(@Args('id') id: number) {
    return this.userService.findOneById(id);
  }
}
