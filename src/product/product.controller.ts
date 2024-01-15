import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProductRepository } from "./product.repository";
import { CreateProductDTO } from "./dto/createProduct.dto";

@Controller('/products')
export class ProductController {
    constructor(private productRepository: ProductRepository) {}
    @Post()
    async createProduct(@Body() product: CreateProductDTO) {
        this.productRepository.save(product);
        return product;
    }

    @Get()
    async listProduct() {
        return this.productRepository.list();
    }
}