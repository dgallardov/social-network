import {Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
 import { Document } from 'mongoose' 

 @Schema()
 export class User extends Document {
    @Prop({required : true})
    username : string;
    @Prop({required : true})
    email : string;
    @Prop({required : true})
    password : string;
 }
 export const UserSchema = SchemaFactory.createForClass(User);

 //este userSchema puede ser utilizado para definir un modelo de mongoose
 //que nos permita interactuar con la base de datos