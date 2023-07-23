import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from "@nestjs/common";

// Services
import { UserRepository } from "@backend/modules/user/user.repository";

// DTOs
import { CreateUserDto, FindUserByEmailDto } from "@backend/modules/user/dto";
import { EncryptionService } from "@backend/modules/encryption/encryption.service";

@Injectable()
export class UserService {
	constructor(
		public userRepository: UserRepository,
		public encryptionService: EncryptionService,
	) {}

	/* Create */
	async createUser(createUserDto: CreateUserDto) {
		return this.userRepository.insertUser(createUserDto);
	}

	/* Read */
	async findUserByEmail(findUserByEmailDto: FindUserByEmailDto) {
		const [userFromDb] = await this.userRepository.getUser(
			findUserByEmailDto.email,
		);

		return userFromDb;
	}
}
