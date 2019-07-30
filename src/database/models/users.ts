import { Table, Column, Model, PrimaryKey, HasOne, UpdatedAt, Default, HasMany } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import Auth from './auth';
import UserRoles from './user_roles';
import { modelDefaults } from '../modeldefaults';

@Table({ ...modelDefaults,
    tableName: 'users',
})
export default class User extends Model<User> {

    @PrimaryKey
    @Column({
        type: DataTypes.INTEGER,
        autoIncrement: true
    })
    id: number;

    @Column({
        unique: true
    })
    username: string;

    @Column
    createdAt: Date;


    @Default(new Date())
    @Column 
    updatedAt: Date;


    @Column
    firstName: string;

    @HasOne(() => Auth)
    Auth: Auth;

    @HasMany(() => UserRoles)
    Roles: UserRoles;
}