import { REQUEST_TYPE_ERROR_NOT_FOUND } from "src/common/constant/request-type.constant";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import {
  CONST_REQUEST_STATUS_ENUM,
  REQUEST_ERROR_NOT_FOUND,
} from "src/common/constant/request.constant";
import { USER_ERROR_MEMBER_NOT_FOUND } from "src/common/constant/user-error.constant";
import {
  columnDefToTypeORMCondition,
  generateRequestNo,
} from "src/common/utils/utils";
import { RequestDto } from "src/core/dto/request/request.dto";
import { Member } from "src/db/entities/Member";
import { Request } from "src/db/entities/Request";
import { RequestType } from "src/db/entities/RequestType";
import { Admin, Repository } from "typeorm";
import { UpdateRequestDescriptionDto } from "src/core/dto/request/request-update.dto";

@Injectable()
export class RequestService {
  constructor(
    @InjectRepository(Request) private readonly requestRepo: Repository<Request>
  ) {}

  async getRequestPagination(
    requestStatus,
    { pageSize, pageIndex, order, columnDef, assignedAdminId }
  ) {
    const skip =
      Number(pageIndex) > 0 ? Number(pageIndex) * Number(pageSize) : 0;
    const take = Number(pageSize);

    let condition = columnDefToTypeORMCondition(columnDef);
    if (!condition.requestStatus || condition.requestStatus === "") {
      if (!requestStatus || requestStatus === "") {
        requestStatus = "PENDING";
      }
      condition.requestStatus = requestStatus;
    }
    if (
      condition.requestStatus.toUpperCase() !==
        CONST_REQUEST_STATUS_ENUM.PENDING &&
      (!condition?.assignedAdmin?.adminId ||
        condition?.assignedAdmin?.adminId === "")
    ) {
      if (assignedAdminId && assignedAdminId !== "") {
        condition = {
          ...condition,
          assignedAdmin: {
            adminId: assignedAdminId,
          },
        };
      }
    }
    const [results, total] = await Promise.all([
      this.requestRepo.find({
        relations: {
          requestedBy: {
            user: true,
          },
          assignedAdmin: {
            user: true,
          },
          requestType: {
            requestRequirements: true,
          },
        },
        where: condition,
        skip,
        take,
        order,
      }),
      this.requestRepo.count({ where: condition }),
    ]);
    return {
      results,
      total,
    };
  }

  async getByRequestNo(requestNo) {
    return await this.requestRepo.findOne({
      where: {
        requestNo,
      },
      relations: {
        requestedBy: {
          user: true,
        },
        assignedAdmin: {
          user: true,
        },
        requestType: {
          requestRequirements: true,
        },
      },
    });
  }

  async create(dto: RequestDto) {
    return await this.requestRepo.manager.transaction(async (entityManager) => {
      const request = new Request();
      request.description = dto.description;
      const requestedBy = await entityManager.findOne(Member, {
        where: {
          memberId: dto.requestedById,
        },
      });
      if (!requestedBy) {
        throw Error(USER_ERROR_MEMBER_NOT_FOUND);
      }
      request.requestedBy = requestedBy;
      const requestType = await entityManager.findOne(RequestType, {
        where: {
          requestTypeId: dto.requestTypeId,
        },
      });
      if (!requestType) {
        throw Error(REQUEST_TYPE_ERROR_NOT_FOUND);
      }
      request.requestType = requestType;
      const _res = await entityManager.save(request);
      _res.requestNo = generateRequestNo(_res.requestId);
      return await entityManager.save(Request, _res);
    });
  }

  async updateDescription(requestNo, dto: UpdateRequestDescriptionDto) {
    return await this.requestRepo.manager.transaction(async (entityManager) => {
      const request = await entityManager.findOne(Request, {
        where: {
          requestNo,
        },
      });
      if (!request) {
        throw Error(REQUEST_ERROR_NOT_FOUND);
      }
      request.description = dto.description;
      return await entityManager.save(Request, request);
    });
  }
}
