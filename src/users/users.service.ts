import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {

  constructor(@InjectModel(User.name)private readonly userModel:Model<User>){}


  async create(createUserDto: CreateUserDto) {
    const {password, ...userData} = createUserDto;
    const hashedPassword = await bcrypt.hash(password,10);
    const createUser = new this.userModel({...userData, password : hashedPassword});
    return createUser.save();

     return 'This action adds a new user';
  }

  async findAll():Promise<Omit<User,'password'>[]> {
    //busca todos los usuarios de la base de datos y excluye la contraseña
  const user = await this.userModel.find().select('-password').exec();
    //  return `This action returns all users`;
    return user;
  }

  //metodo para obtener usuario por correo
  async findByEmail(email:String):promise<User | null>{
    const user = await this.findOne({email}).exec();
    return
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
