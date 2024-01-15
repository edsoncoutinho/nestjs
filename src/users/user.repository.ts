import { Injectable } from "@nestjs/common";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserRepository {
    private users: UserEntity[] = [];

    private getUserById(id: string) {
        const user = this.users.find(
            user => user.id === id
        );

        if (!user) {
            throw new Error('Usuário não encontrado');
        }

        return user;
    }

    async save(user: UserEntity) {
        this.users.push(user);
    }

    async list() {
        return this.users;
    }

    async emailIsUnique(email: string) {
        const user = this.users.find(
            user => user.email === email
        );

        return user !== undefined;
    }

    async updateUser(id: string, userToUpdate: Partial<UserEntity>) {
        const updatedUser = this.getUserById(id);

        Object.entries(userToUpdate).forEach(([key, value]) => {
            if (key === 'id') return;
            updatedUser[key] = value;
        });

        return updatedUser;
    }

    async deleteUser(id: string) {
        const user = this.getUserById(id);
        this.users = this.users.filter(
            userSaved => userSaved.id !== id
        );
        return user;
    }
}