import { Injectable } from "@nestjs/common";
import * as argon2 from "argon2";
import { randomBytes } from "crypto";

// Services
import { UserService } from "@backend/modules/user/user.service";
import { EncryptionService } from "@backend/modules/encryption/encryption.service";

// DTOs
import { LocalRegisterDto } from "@backend/modules/auth/dto/local.register.dto";

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private encryptionService: EncryptionService,
	) {}

	public async localRegister(localRegisterDto: LocalRegisterDto) {
		const hashedPassword = await argon2.hash(localRegisterDto.password, {
			salt: randomBytes(32),
		});
		const encryptName = this.encryptionService.encrypt(
			localRegisterDto.username,
			hashedPassword,
		);
		const encryptEmail = this.encryptionService.encrypt(
			localRegisterDto.email,
			hashedPassword,
		);

		const [encryptedName, encryptedEmail] = await Promise.all([
			encryptName,
			encryptEmail,
		]);

		return await this.userService.createUser({
			...localRegisterDto,
			username: encryptedName,
			email: encryptedEmail,
			password: hashedPassword,
		});
	}
}
