import { Injectable, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  private readonly saltRounds = 12;

  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(userDto: any): Promise<UserDocument> {
    try {
      const userExists = await this.userModel.findOne({ email: userDto.email }).exec();
      if (userExists) {
        throw new BadRequestException('Email already exists');
      }

      const hashedPassword = await bcrypt.hash(userDto.password, this.saltRounds);
      const createdUser = new this.userModel({
        ...userDto,
        password: hashedPassword,
      });
      return createdUser.save();
    } catch (error) {
      throw new InternalServerErrorException('Error creating user');
    }
  }

  async findOne(email: string): Promise<UserDocument | null> {
    try {
      return this.userModel.findOne({ email }).exec();
    } catch (error) {
      throw new InternalServerErrorException('Error finding user');
    }
  }
}
