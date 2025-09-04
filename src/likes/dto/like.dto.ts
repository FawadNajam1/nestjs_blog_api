import { IsNotEmpty } from "class-validator";

export class LikesDto {
    @IsNotEmpty()
    id: number;
}