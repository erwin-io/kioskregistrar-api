import { condition } from "@automapper/core";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { type } from "os";
import { skip, take } from "rxjs";
import { columnDefToTypeORMCondition } from "src/common/utils/utils";
import { FirebaseProvider } from "src/core/provider/firebase/firebase-provider";
import { Admin } from "src/db/entities/Admin";
import { Member } from "src/db/entities/Member";
import { Users } from "src/db/entities/Users";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    private firebaseProvoder: FirebaseProvider,
    @InjectRepository(Users) private readonly userRepo: Repository<Users>
  ) {}

  async getUserPaginationAdmin({ pageSize, pageIndex, order, columnDef }) {
    const skip =
      Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
    const take = Number(pageSize);
    const condition = columnDefToTypeORMCondition(columnDef);
    if (!condition.user || condition.user === undefined) {
      condition.user = {
        active: true,
      };
    } else {
      condition.user.active = true;
    }
    const [results, total] = await Promise.all([
      this.userRepo.manager.find(Admin, {
        select: {
          user: {
            userId: true,
            userName: true,
            userType: true,
            active: true,
            accessGranted: true,
            profileFile: {
              fileId: true,
              fileName: true,
              url: true,
            },
          },
        },
        where: condition,
        relations: {
          user: true,
        },
        skip,
        take,
        order,
      }),
      this.userRepo.manager.count(Admin, {
        where: condition,
      }),
    ]);
    return {
      results,
      total,
    };
  }

  async getUserPaginationMember({
    pageSize,
    pageIndex,
    order,
    columnDef,
    verified,
  }) {
    const skip =
      Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
    const take = Number(pageSize);
    const condition = columnDefToTypeORMCondition(columnDef);
    if (!condition.user || condition.user === undefined) {
      condition.user = {
        active: true,
      };
    } else {
      condition.user.active = true;
    }
    if (verified === undefined || verified === null) {
      condition.isVerified = verified;
    }
    const [results, total] = await Promise.all([
      this.userRepo.manager.find(Admin, {
        select: {
          user: {
            userId: true,
            userName: true,
            userType: true,
            active: true,
            accessGranted: true,
            profileFile: {
              fileId: true,
              fileName: true,
              url: true,
            },
          },
        },
        where: condition,
        relations: {
          user: true,
        },
        skip,
        take,
        order,
      }),
      this.userRepo.manager.count(Admin, {
        where: condition,
      }),
    ]);
    return {
      results,
      total,
    };
  }
}
