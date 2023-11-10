import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ApiTags, ApiQuery } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/core/auth/jwt.auth.guard";
import {
  UpdateAdminUserResetPasswordDto,
  UpdateMemberUserResetPasswordDto,
} from "src/core/dto/auth/reset-password.dto";
import { PaginationParams } from "src/core/dto/pagination-params.dto";
import {
  MemberVerificationDto,
  UpdateMemberUserDto,
} from "src/core/dto/user/user-member.dto";
import {
  CreateAdminUserDto,
  UpdateAdminUserDto,
} from "src/core/dto/user/users-admin.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { Admin } from "src/db/entities/Admin";
import { Member } from "src/db/entities/Member";
import { UsersService } from "src/services/users.service";

@ApiTags("users")
@Controller("users")
// @ApiBearerAuth("jwt")
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get("/admin/all")
  //   @UseGuards(JwtAuthGuard)
  async getAllAdmin() {
    const res = {} as ApiResponseModel<Admin[]>;
    try {
      res.data = await this.userService.getAllAdmin();
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Get("/admin/:adminCode/details")
  //   @UseGuards(JwtAuthGuard)
  async getAdminDetails(@Param("adminCode") adminCode: string) {
    const res = {} as ApiResponseModel<Admin>;
    try {
      res.data = await this.userService.getAdminByCode(adminCode);
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Get("/member/:memberCode/details")
  //   @UseGuards(JwtAuthGuard)
  async getMemberDetails(@Param("memberCode") memberCode: string) {
    const res = {} as ApiResponseModel<Member>;
    try {
      res.data = await this.userService.getMemberByCode(memberCode);
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Post("/admin/page")
  //   @UseGuards(JwtAuthGuard)
  async getPaginatedAdminUsers(@Body() paginationParams: PaginationParams) {
    const res: ApiResponseModel<{ results: Admin[]; total: number }> =
      {} as any;
    try {
      res.data = await this.userService.getUserPaginationAdmin(
        paginationParams
      );
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Post("/member/page/:status")
  //   @UseGuards(JwtAuthGuard)
  async getPaginatedMemberUsers(
    @Param("status") status: string,
    @Body() paginationParams: PaginationParams
  ) {
    const res: ApiResponseModel<{ results: Member[]; total: number }> =
      {} as any;
    try {
      res.data = await this.userService.getUserPaginationMember(
        paginationParams,
        status == "verified"
      );
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Post("/admin")
  //   @UseGuards(JwtAuthGuard)
  async createAdmin(@Body() createAdminUserDto: CreateAdminUserDto) {
    const res: ApiResponseModel<Admin> = {} as any;
    try {
      res.data = await this.userService.createAdmin(createAdminUserDto);
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Put("/admin/:adminCode")
  //   @UseGuards(JwtAuthGuard)
  async updateAdmin(
    @Param("adminCode") adminCode: string,
    @Body() updateAdminUserDto: UpdateAdminUserDto
  ) {
    const res: ApiResponseModel<Admin> = {} as any;
    try {
      res.data = await this.userService.updateAdmin(
        adminCode,
        updateAdminUserDto
      );
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Put("/member/:memberCode")
  //   @UseGuards(JwtAuthGuard)
  async updateMember(
    @Param("memberCode") memberCode: string,
    @Body() updateMemberUserDto: UpdateMemberUserDto
  ) {
    const res: ApiResponseModel<Member> = {} as any;
    try {
      res.data = await this.userService.updateMember(
        memberCode,
        updateMemberUserDto
      );
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Put("/admin/:adminCode/resetPassword")
  //   @UseGuards(JwtAuthGuard)
  async resetAdminPassword(
    @Param("adminCode") adminCode: string,
    @Body() updateAdminUserDto: UpdateAdminUserResetPasswordDto
  ) {
    const res: ApiResponseModel<Admin> = {} as any;
    try {
      res.data = await this.userService.resetAdminPassword(
        adminCode,
        updateAdminUserDto
      );
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Put("/member/:memberCode/resetPassword")
  //   @UseGuards(JwtAuthGuard)
  async resetMemberPassword(
    @Param("memberCode") memberCode: string,
    @Body() updateMemberUserDto: UpdateMemberUserResetPasswordDto
  ) {
    const res: ApiResponseModel<Member> = {} as any;
    try {
      res.data = await this.userService.resetMemberPassword(
        memberCode,
        updateMemberUserDto
      );
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Delete("/admin/:adminCode")
  //   @UseGuards(JwtAuthGuard)
  async deleteAdmin(@Param("adminCode") adminCode: string) {
    const res: ApiResponseModel<Admin> = {} as any;
    try {
      res.data = await this.userService.deleteAdmin(adminCode);
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Post("/member/approve")
  //   @UseGuards(JwtAuthGuard)
  async approveMember(@Body() dto: MemberVerificationDto) {
    const res: ApiResponseModel<{ success: Member[]; failed: Member[] }> =
      {} as any;
    try {
      res.data = await this.userService.approveMemberBatch(dto);
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }
}
