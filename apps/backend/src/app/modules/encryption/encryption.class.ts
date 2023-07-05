import { Injectable } from "@nestjs/common";

@Injectable()
export abstract class AbstractEncryptionService {
	abstract encrypt(value: string, password: string): Promise<string>;

	abstract decrypt(encryptedValue: string, password: string): Promise<string>;
}
