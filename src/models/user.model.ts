import {
	Table,
	Column,
	Model,
	DataType,
	PrimaryKey,
	IsEmail,
	Unique,
	AllowNull,
	Default,
	IsUUID,
} from "sequelize-typescript";

@Table({
	tableName: "users",
	timestamps: true,
})
export default class User extends Model {
	@IsUUID(4)
	@PrimaryKey
	@Default(DataType.UUIDV4)
	@Column(DataType.UUID)
	uid!: string;

	@IsEmail
	@Unique
	@AllowNull(false)
	@Column(DataType.STRING)
	email!: string;

	@AllowNull(false)
	@Column(DataType.STRING)
	password!: string;
}
