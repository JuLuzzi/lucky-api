import { createParamDecorator } from "@nestjs/common"
import { UserProfileDto } from "../user/dto/user.profile.dto";

export const GetUser = createParamDecorator(
    (data, request): UserProfileDto => {
        return request.user;
    }
);