import { Table, Column, Model, PrimaryKey, Max, IsInt, Min, ForeignKey } from 'sequelize-typescript';
import { DataTypes } from 'sequelize';
import User from './users';
import { modelDefaults } from '../modeldefaults';
import MoodEntry from './mood_entries';

@Table({ ...modelDefaults,
    tableName: 'mood_entry_items',
})
export default class MoodEntryItem extends Model<MoodEntryItem> {

    @PrimaryKey
    @Column({
        type: DataTypes.INTEGER,
        autoIncrement: true
    })
    id: number;

    @Column
    mood: string;

    @IsInt
    @Max(5)
    @Min(1)
    @Column
    rating: number;

    @Column
    @ForeignKey(() => User)
    userId: number;

    @Column
    @ForeignKey(() => MoodEntry)
    moodEntryId: number;
}