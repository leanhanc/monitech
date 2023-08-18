import {
	Injectable,
	InternalServerErrorException,
	NotFoundException,
	UnauthorizedException,
} from "@nestjs/common";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import { randomBytes } from "crypto";

// Services
import { UserService } from "@backend/modules/user/user.service";
import { EncryptionService } from "@backend/modules/encryption/encryption.service";

// DTOs
import { LocalRegisterDto, LocalLoginDto } from "@backend/modules/auth/dto";

// Types
import { User } from "@monitech/types";

@Injectable()
export class AuthService {
	constructor(
		private userService: UserService,
		private encryptionService: EncryptionService,
	) {}

	/* Private */
	private async emitSessionToken(userId: number) {
		const token = jwt.sign(
			{ id: userId },
			process.env.JWT_SECRET || "mysecret",
			{
				expiresIn: "15d",
			},
		);

		return token;
	}

	private async emitIdToken(userData: Partial<User>) {
		return jwt.sign(userData, process.env.JWT_SECRET || "mysecret", {
			expiresIn: "60d",
		});
	}

	/* Public */
	public async localRegister(localRegisterDto: LocalRegisterDto) {
		const hashedPassword = await argon2.hash(localRegisterDto.password, {
			salt: randomBytes(32),
		});
		const encryptedName = await this.encryptionService.encrypt(
			localRegisterDto.name,
			hashedPassword,
		);

		// Create user in DB
		const newUser = await this.userService.createUser({
			...localRegisterDto,
			name: encryptedName,
			password: hashedPassword,
		});

		if (!newUser) {
			throw new InternalServerErrorException();
		}

		// Automatically log-in user
		return this.localLogin({
			email: newUser.email,
			password: localRegisterDto.password,
		});
	}

	public async localLogin(localLoginDto: LocalLoginDto) {
		const userRecord = await this.userService.findUserByEmail({
			email: localLoginDto.email,
		});

		if (!userRecord) {
			return new NotFoundException();
		}

		// Check password
		const userHashedPassword = userRecord.password;
		const isValidPassword = await argon2.verify(
			userHashedPassword,
			localLoginDto.password,
		);

		if (!isValidPassword) {
			throw new UnauthorizedException();
		}

		// Decrypt  user name
		const decrypedName = await this.encryptionService.decrypt(
			userRecord.name,
			userRecord.password,
		);

		// Emit tokens
		const sessionToken = await this.emitSessionToken(userRecord.id);
		const idToken = await this.emitIdToken({
			id: userRecord.id,
			email: userRecord.email,
			name: decrypedName,
		});

		return { sessionToken, idToken };
	}
}
