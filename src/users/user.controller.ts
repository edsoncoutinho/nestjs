import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { CreateUserDTO } from "./dto/createUser.dto";
import { UserEntity } from "./user.entity";
import { v4 as uuid } from "uuid";
import { ListUserDTO } from "./dto/listUser.dto";
import { UpdateUserDTO } from "./dto/updateUser.dto";

@Controller('/users')
export class UserController {
    constructor(private userRepository: UserRepository) {}

    @Post()
    async createUser(@Body() user: CreateUserDTO) {
        const userEntity = new UserEntity();
        userEntity.id =  uuid();
        userEntity.name = user.name;
        userEntity.email = user.email;
        userEntity.password = user.password;
        this.userRepository.save(userEntity);
        return { user: new ListUserDTO(userEntity.id, userEntity.name), message: 'Usuário criado com sucesso' };
    }

    @Get()
    async listUsers() {
        const users = await this.userRepository.list();
        const listUsers = users.map(
            user => new ListUserDTO(user.id, user.name)
        );

        return listUsers;
    }

    @Put('/:id')
    async updateUser(@Param('id') id: string, @Body() user: UpdateUserDTO) {
        const updatedUser = await this.userRepository.updateUser(id, user);

        return { user: new ListUserDTO(updatedUser.id, updatedUser.name), message: 'Usuário atualizado com sucesso' };
    }

    @Delete('/:id')
    async deleteUser(@Param('id') id: string) {
        const deletedUser =  await this.userRepository.deleteUser(id);

        return { user: new ListUserDTO(deletedUser.id, deletedUser.name), message: 'Usuário removido com sucesso' };
    }
}