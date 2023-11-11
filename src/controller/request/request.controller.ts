import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiParam, ApiTags } from "@nestjs/swagger";
import { RequestPaginationParamsDto } from "src/core/dto/request/request-pagination-params.dto";
import { ApiResponseModel } from "src/core/models/api-response.model";
import { RequestService } from "src/services/request.service";
import { Admin } from "typeorm";
import { Request } from "src/db/entities/Request";
import { SAVING_SUCCESS } from "src/common/constant/api-response.constant";
import { RequestDto } from "src/core/dto/request/request.dto";
import { UpdateRequestDescriptionDto } from "src/core/dto/request/request-update.dto";
import { RequestType } from "src/db/entities/RequestType";

@ApiTags("request")
@Controller("request")
export class RequestController {
  constructor(private readonly requestService: RequestService) {}
  @ApiParam({
    name: "requestStatus",
    required: true,
    example: "PENDING",
    description: "status: PENDING,TOPAY,PROCESSING,TOCOMPLETE,CLOSED",
  })
  @Post("/page/:requestStatus")
  //   @UseGuards(JwtAuthGuard)
  async getPaginatedAdminUsers(
    @Param("requestStatus") requestStatus: string,
    @Body() params: RequestPaginationParamsDto
  ) {
    const res: ApiResponseModel<{ results: Request[]; total: number }> =
      {} as any;
    try {
      res.data = await this.requestService.getRequestPagination(
        requestStatus,
        params
      );
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Get("/:requestNo")
  //   @UseGuards(JwtAuthGuard)
  async getAdminDetails(@Param("requestNo") requestNo: string) {
    const res = {} as ApiResponseModel<Request>;
    try {
      res.data = await this.requestService.getByRequestNo(requestNo);
      res.success = true;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }


  @Post("")
  //   @UseGuards(JwtAuthGuard)
  async create(@Body() requestDto: RequestDto) {
    const res: ApiResponseModel<Request> = {} as any;
    try {
      res.data = await this.requestService.create(requestDto);
      res.success = true;
      res.message = `Request ${SAVING_SUCCESS}`;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }

  @Put("/:requestNo/updateDescription")
  //   @UseGuards(JwtAuthGuard)
  async update(
    @Param("requestNo") requestNo: string,
    @Body() dto: UpdateRequestDescriptionDto
  ) {
    const res: ApiResponseModel<Request> = {} as any;
    try {
      res.data = await this.requestService.updateDescription(requestNo, dto);
      res.success = true;
      res.message = `Request ${SAVING_SUCCESS}`;
      return res;
    } catch (e) {
      res.success = false;
      res.message = e.message !== undefined ? e.message : e;
      return res;
    }
  }
}
