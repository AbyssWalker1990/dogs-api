import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/Sequelize'

interface DogAttribute {
    name: string
    color: string
    tail_length: number
    weight: number
}

export interface DogInput extends Required<DogAttribute> { }
export interface DogOuput extends Required<DogAttribute> { }

class Dog extends Model<DogAttribute, DogInput> implements DogAttribute {
    public name!: string
    public color!: string
    public tail_length!: number
    public weight!: number
}

Dog.init({
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        unique: true
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false
    },
    tail_length: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    weight: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize
})

export default Dog
