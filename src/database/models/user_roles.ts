import {
  Table,
  Column,
  Model,
  PrimaryKey,
  ForeignKey,
  Default
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import User from './users';
import { modelDefaults } from '../modeldefaults';

@Table({ ...modelDefaults, tableName: 'user_roles' })
export default class UserRoles extends Model<UserRoles> {
  @PrimaryKey
  @Column({
    type: DataTypes.INTEGER,
    autoIncrement: true
  })
  id: number;

  @Column
  createdAt: Date;

  @Column
  role: string;

  @Default(new Date())
  @Column
  updatedAt: Date;

  @Column
  @ForeignKey(() => User)
  userId: number;
}
