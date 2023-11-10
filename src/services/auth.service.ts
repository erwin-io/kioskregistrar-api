/* eslint-disable no-var */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UsersService } from "../services/users.service";
import { JwtPayload } from "../core/interfaces/payload.interface";
import { JwtService } from "@nestjs/jwt";
import * as fs from "fs";
import * as path from "path";
import {
  compare,
  generateMemberCode,
  getFullName,
  hash,
} from "src/common/utils/utils";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { RegisterMemberUserDto } from "src/core/dto/auth";
import moment from "moment";
import { Member } from "src/db/entities/Member";
import { Users } from "src/db/entities/Users";
import { type } from "os";
import { UserTypeConstant } from "src/common/constant/user-type.constant";
import { Admin } from "src/db/entities/Admin";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users) private readonly userRepo: Repository<Users>,
    private readonly jwtService: JwtService
  ) {}

  async registerMember(dto: RegisterMemberUserDto) {
    try {
      let user = new Users();
      user.userName = dto.userName;
      user.password = await hash(dto.password);
      user.userType = "MEMBER";
      user.accessGranted = true;
      let member = new Member();
      member.firstName = dto.firstName;
      member.lastName = dto.lastName;
      member.middleName = dto.middleName;
      member.fullName = getFullName(
        dto.firstName,
        dto.middleName,
        dto.lastName
      );
      member.email = dto.email;
      member.mobileNumber = dto.mobileNumber;
      member.birthDate = moment(dto.birthDate.toString()).format("YYYY-MM-DD");
      member.address = dto.address;
      member.gender = dto.gender;
      member.courseTaken = dto.courseTaken;
      member.major = dto.major;
      member.isAlumni = dto.isAlumni;
      member.schoolYearLastAttended = dto.schoolYearLastAttended;
      member.primarySchoolName = dto.primarySchoolName;
      member.primarySyGraduated = dto.primarySyGraduated;
      member.secondarySchoolName = dto.secondarySchoolName;
      member.secondarySyGraduated = dto.secondarySyGraduated;
      member = await this.userRepo.manager.transaction(
        async (transactionalEntityManager) => {
          user = await transactionalEntityManager.save(user);
          member.user = user;
          member = await transactionalEntityManager.save(member);
          member.memberCode = generateMemberCode(member.memberId);
          return await transactionalEntityManager.save(Member, member);
        }
      );
      delete member.user.password;
      return member;
    } catch (ex) {
      throw ex;
    }
  }

  async loginAdmin({ userName, password }: any) {
    try {
      let res = await this.userRepo.manager.findOne(Admin, {
        where: {
          user: {
            userName,
            userType: UserTypeConstant.ADMIN,
            active: true,
          },
        },
        relations: {
          user: {
            profileFile: true,
          },
        },
      });
      if (!res) {
        throw Error("Not found!");
      }
      const passwordMatch = await compare(res.user.password, password);
      if (!passwordMatch) {
        throw Error("Invalid password!");
      }
      if (!res.user.accessGranted) {
        throw Error("Pending access request!");
      }
      delete res.user.password;
  
      return res;
    } catch(ex) {
      throw ex;
    }
  }

  async loginMember({ userName, password }: any) {
    try {
      let res = await this.userRepo.manager.findOne(Member, {
        where: {
          user: {
            userName,
            userType: UserTypeConstant.MEMBER,
            active: true,
          },
        },
        relations: {
          user: {
            profileFile: true,
          },
        },
      });
      if (!res) {
        throw Error("Not found!");
      }
      const passwordMatch = await compare(res.user.password, password);
      if (!passwordMatch) {
        throw Error("Invalid password!");
      }
      if (!res.user.accessGranted) {
        throw Error("Pending access request!");
      }
      delete res.user.password;
  
      return res;
    } catch(ex) {
      throw ex;
    }
  }
}