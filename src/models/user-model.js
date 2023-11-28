import {Schema, model} from "mongoose"
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import {config} from '../setting/config.js'

const userSchema = new Schema ( {
    username: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
      },
      avatarURL: {
        type: String,
      },
      tokens: [
        {
          token: {
            type: String,
            required: true,
          },
        },
      ],
    });


// hasheamos la contraseña
userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  next();
});

// creamos el token
userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ userId: user._id }, config.jwtSecret);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

export const UserModel = model("User", userSchema)