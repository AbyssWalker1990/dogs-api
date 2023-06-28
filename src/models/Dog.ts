import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../config/Sequelize'

interface DogAttribute {
    name: string
    color: string
    tail_length: number
    weight: number
}

export interface DogInput extends Optional<DogAttribute, 'name'> { }
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
        allowNull: false
    },
    color: {
        type: DataTypes.STRING,
        allowNull: false,

    },
    tail_length: {
        type: DataTypes.INTEGER
    },
    weight: {
        type: DataTypes.INTEGER
    }
}, {
    sequelize
})

export default Dog