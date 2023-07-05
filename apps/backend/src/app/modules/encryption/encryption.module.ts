import { Module } from "@nestjs/common";

/* Layers */
import { EncryptionService } from "./encryption.service";

@Module({
	imports: [],
	controllers: [],
	providers: [EncryptionService],
	exports: [EncryptionService],
})
export class EncryptionModule {}
