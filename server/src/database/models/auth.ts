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

@Table({ ...modelDefaults, tableName: 'user_auth' })
export default class Auth extends Model<Auth> {
  @PrimaryKey
  @Column({
    type: DataTypes.INTEGER,
    autoIncrement: true
  })
  id: number;

  @Column
  password: string;

  @Column
  createdAt: Date;

  @Default(new Date())
  @Column
  updatedAt: Date;

  @Column
  @ForeignKey(() => User)
  userId: number;
}
