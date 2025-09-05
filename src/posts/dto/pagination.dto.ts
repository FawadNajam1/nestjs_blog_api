import { ApiPropertyOptional } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsOptional, IsPositive, Max } from "class-validator";

export class PaginationDto {
    @ApiPropertyOptional({
        example: 1,
        description: 'Page number'
    })
    @Type(() => Number)
    @IsOptional()
    @IsPositive()
    page?: number = 1;

    @ApiPropertyOptional({
        example: 5,
        description: 'Items per page'
    })
    @Type(() => Number)
    @IsOptional()
    @IsPositive()
    @Max(100)
    limit?: number = 5;
}