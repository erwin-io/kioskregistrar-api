import { LocalAuthGuard } from "../../core/auth/local.auth.guard";
import {
  Controller,
  Body,
  Post,
  Get,
  Req,
  UseGuards,
  Param,
  Headers,
  Query,
} from "@nestjs/common";
import { AuthService } from "../../services/auth.service";
import { LogInDto, RegisterMemberUserDto } from "src/core/dto/auth";
import { AdminModel } from "src/core/models/admin";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { MemberModel } from "src/core/models/member";

// @ApiTags("auth")
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register/member")
  public async register(@Body() createUserDto: RegisterMemberUserDto) {
    let res: ApiResponseModel<MemberModel>;
    try {
      res.data = await this.authService.registerMember(createUserDto);
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Post("login/:type")
  public async loginAdmin(
    @Param("type") type: string,
    @Body() loginUserDto: LogInDto
  ) {
    let res: ApiResponseModel<AdminModel>;
    try {
      res.data = await this.authService.loginAdmin(loginUserDto);
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Post("login/member")
  public async login(@Body() loginUserDto: LogInDto) {
    let res: ApiResponseModel<AdminModel>;
    try {
      res.data = await this.authService.loginAdmin(loginUserDto);
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }
}
