import { IsString, Min, MinLength, IsInt } from 'class-validator'

class DogDTO {
  @MinLength(2, {
    message: 'Name must contains at least 2 symbols'
  })
  @IsString()
  public name: string

  @MinLength(4)
  @IsString()
  public color: string

  @IsInt()
  @Min(0, {
    message: 'Tail must be positive number'
  })
  public tail_length: number

  @IsInt()
  @Min(0, {
    message: 'weight must be positive number'
  })
  public weight: number



  constructor (username: string, password: string, tail_length: number, weight: number) {
    this.name = username
    this.color = password
    this.tail_length = tail_length
    this.weight = weight
  }
}

export default DogDTO