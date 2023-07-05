import { Injectable } from "@nestjs/common";
import { AES, enc } from "crypto-ts";

/* Abstract class */
import { AbstractEncryptionService } from "./encryption.class";

@Injectable()
export class EncryptionService extends AbstractEncryptionService {
	async encrypt(value: string, password: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			try {
				const encryptedValue = AES.encrypt(value, password).toString();
				resolve(encryptedValue);
			} catch (error) {
				reject(error);
			}
		});
	}

	async decrypt(encryptedValue: string, password: string): Promise<string> {
		return new Promise<string>((resolve, reject) => {
			try {
				const decryptedValue = AES.decrypt(encryptedValue, password).toString(
					enc.Utf8
				);
				resolve(decryptedValue);
			} catch (error) {
				reject(error);
			}
		});
	}
}
