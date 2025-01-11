import { Table, Column, Model, DataType } from "sequelize-typescript";

@Table({
	tableName: "tasks",
	timestamps: true,
})
export default class Task extends Model {
	@Column({
		type: DataType.INTEGER,
		autoIncrement: true,
		primaryKey: true,
	})
	uid!: number;

	@Column({
		type: DataType.STRING,
		allowNull: false,
	})
	title!: string;

	@Column({
		type: DataType.TEXT,
		allowNull: true,
	})
	description!: string;

	@Column({
		type: DataType.BOOLEAN,
		defaultValue: false,
	})
	completed!: boolean;
}
