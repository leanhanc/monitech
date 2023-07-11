import { InjectDrizzle } from "@backend/modules/drizzle";
import { CreateUserDto } from "@backend/modules/user/dto/createUser.dto";

// Types
import { Database } from "@monodev/types";
import { users } from "@monodev/db";
import { PostgresError } from "postgres";
import { ConflictException } from "@nestjs/common";

export class UserRepository {
	constructor(@InjectDrizzle() private readonly db: Database) {}

	async insertUser(createUserDto: CreateUserDto) {
		const insertResult = await this.db
			.insert(users)
			.values({
				username: createUserDto.username,
				email: createUserDto.email,
				password: createUserDto.password,
			})
			.onConflictDoNothing()
			.returning({ id: users.id })
			.catch((e: PostgresError) => {
				if (e.code === "23505") {
					throw new ConflictException(e.detail);
				}
				throw e;
			});

		return insertResult.pop();
	}
}
