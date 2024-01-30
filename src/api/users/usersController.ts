// src/users/usersController.ts
import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Query,
  Route,
  SuccessResponse,
} from "tsoa";
import { User } from "./user";
import { UsersService, UserCreationParams } from "./usersService";
import { provideSingleton } from "@/util/provideSingleton";
import { inject } from "inversify";

@Route("users")
@provideSingleton(UsersController)
export class UsersController extends Controller {
  constructor(@inject(UsersService) private usersService: UsersService) {
    super();
  }

  @Get("{userId}")
  /**
   * Retrieves the details of an existing user.
   * Supply the unique user ID from either and receive corresponding user details.
   * @param userId The user's identifier
   * @param name Provide a username to display
   */
  public async getUser(
    @Path() userId: number,
    @Query() name?: string
  ): Promise<User> {
    return this.usersService.get(userId, name);
  }

  @SuccessResponse("201", "Created") // Custom success response
  @Post()
  public async createUser(
    @Body() requestBody: UserCreationParams
  ): Promise<void> {
    this.setStatus(201); // set return status 201
    new UsersService().create(requestBody);
    return;
  }
}
