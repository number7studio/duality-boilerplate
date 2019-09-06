import {
  Table,
  Column,
  Model,
  PrimaryKey,
  ForeignKey,
  HasMany
} from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import User from './users';
import { modelDefaults } from '../modeldefaults';
import MoodEntryItem from './mood_entry_items';

@Table({ ...modelDefaults, tableName: 'mood_entries' })
export default class MoodEntry extends Model<MoodEntry> {
  @PrimaryKey
  @Column({
    type: DataTypes.INTEGER,
    autoIncrement: true
  })
  id: number;

  @Column
  @ForeignKey(() => User)
  userId: number;

  @HasMany(() => MoodEntryItem)
  moodEntryItems: MoodEntryItem[];
}
