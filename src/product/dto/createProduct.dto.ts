import { Type } from "class-transformer";
import { IsArray, IsNumber, IsString, ValidateNested } from "class-validator";

export class ProductCharacteristicDTO {
    @IsString()
    name: string;
    
    @IsString()
    description: string;
}

export class ProductImageDTO {
    @IsString()
    url: string;

    @IsString()
    description: string;
}

export class CreateProductDTO {
    @IsString()
    name: string;

    @IsNumber()
    value: number;

    @IsNumber()
    amount: number;

    @IsString()
    description: string;

    @ValidateNested()
    @IsArray() 
    @Type(() => ProductCharacteristicDTO)
    characteristics: ProductCharacteristicDTO[];

    @ValidateNested()
    @IsArray() 
    @Type(() => ProductImageDTO)
    images: ProductImageDTO[];

    @IsString()
    category: string;
}