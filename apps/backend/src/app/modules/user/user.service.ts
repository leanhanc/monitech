import { Injectable } from "@nestjs/common";

import { CreateUserDto } from "@backend/modules/user/dto/createUser.dto";
import { UserRepository } from "@backend/modules/user/user.repository";

@Injectable()
export class UserService {
	constructor(public userRepository: UserRepository) {}

	async createUser(createUserDto: CreateUserDto) {
		return this.userRepository.insertUser(createUserDto);
	}
}
