import bcrypt from "bcryptjs";

const users = [
  {
    name: "Dave Bacay Admin",
    email: "dave@testdata.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Dave Spencer Admin",
    email: "spencer@testdata.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
];

export default users;
