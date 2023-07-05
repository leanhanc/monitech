import { Injectable } from "@nestjs/common";

/* Services */
import { EncryptionService } from "@backend/modules/encryption/encryption.service";

@Injectable()
export class AppService {
	constructor(private encriptyonService: EncryptionService) {}

	async getData(message: string) {
		const encrypted = await this.encriptyonService.encrypt(message, "123456");

		const decryped = await this.encriptyonService.decrypt(encrypted, "123456");

		return { encrypted, decryped };
	}
}
