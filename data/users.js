import bycrypt from "bcryptjs";

const users = [
  {
    name: "admin user",
    email: "admin@gmail.com",
    password: bycrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "omar selema",
    email: "omarselema@gmail.com",
    password: bycrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "mohamed farid",
    email: "farid@gmail.com",
    password: bycrypt.hashSync("123456", 10),
    isAdmin: false,
  },
];

export default users