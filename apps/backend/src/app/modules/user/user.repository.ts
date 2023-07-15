import { ConflictException } from "@nestjs/common";
import { InjectDrizzle } from "@backend/modules/drizzle";
import { eq } from "drizzle-orm";

// DTOs
import { CreateUserDto } from "@backend/modules/user/dto";

// Types
import { PostgresError } from "postgres";
import { Database } from "@monitech/types";
import { users } from "@monitech/db";

export class UserRepository {
	constructor(@InjectDrizzle() private readonly db: Database) {}

	async insertUser(createUserDto: CreateUserDto) {
		const insertResult = await this.db
			.insert(users)
			.values({
				name: createUserDto.name,
				email: createUserDto.email,
				password: createUserDto.password,
			})
			.returning({ id: users.id, name: users.name, email: users.email })
			.catch((e: PostgresError) => {
				if (e.code === "23505") {
					throw new ConflictException(e.detail);
				}
				throw e;
			});

		return insertResult.pop();
	}

	async getUser(email: string) {
		return await this.db
			.select({
				id: users.id,
				email: users.email,
				name: users.name,
				password: users.password,
			})
			.from(users)
			.where(eq(users.email, email));
	}
}
