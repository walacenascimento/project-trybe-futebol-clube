import { NUMBER } from 'sequelize';
import { Model, STRING } from 'sequelize';
import db from '.';
// import OtherModel from './OtherModel';

// Tipagem do TypeScript
class User extends Model {
  id: number;
  username: string;
  role: string;
  email: string;
  password: string;
}

// configuraçaõ do Sequelize
User.init({
  id: NUMBER,
  username: STRING,
  role: STRING,
  email: STRING,
  password: STRING,
}, {
  underscored: true,
  sequelize: db,
  modelName: 'user',
  timestamps: false,
});

export default User;
