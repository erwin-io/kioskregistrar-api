import { Module } from "@nestjs/common";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfigService } from "./db/typeorm/typeorm.service";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./controller/auth/auth.module";
import { FirebaseProviderModule } from "./core/provider/firebase/firebase-provider.module";
import { UsersService } from "./services/users.service";
import * as Joi from "@hapi/joi";
import { getEnvPath } from "./common/utils/utils";
const envFilePath: string = getEnvPath(`${__dirname}/common/envs`);
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath,
      isGlobal: true,
      validationSchema: Joi.object({
        UPLOADED_FILES_DESTINATION: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    AuthModule,
    FirebaseProviderModule,
  ],
  providers: [AppService, UsersService],
  controllers: [],
})
export class AppModule {}