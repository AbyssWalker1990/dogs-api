import { DataTypes, Model, ModelStatic, Sequelize } from "sequelize"


export function dog (sequelize: Sequelize): ModelStatic<Model<any, any>> {
  const attributes = {
    name: { type: DataTypes.STRING, allowNull: false },
    color: { type: DataTypes.STRING, allowNull: false },
    tail_length: { type: DataTypes.INTEGER, allowNull: false },
    weight: { type: DataTypes.INTEGER, allowNull: false }
  };


  return sequelize.define('Dog', attributes)
}
