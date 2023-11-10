import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";
import { JwtPayload } from "../interfaces/payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt") {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: fs.readFileSync(
        path.join(__dirname, "../../../private.key")
      ),
    });
  }
  async validate(payload: JwtPayload) {
    const { userId } = payload;
    const user = await this.usersService.findById(userId);
    const isExpired = await this.usersService.isUserExpired(userId);
    
    if (!user) {
      throw new UnauthorizedException();
    }
    return { userId: user.userId };
  }
}
