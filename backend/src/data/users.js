import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@email.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Umar",
    email: "umar@email.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Ammar",
    email: "ammar@email.com",
    password: bcrypt.hashSync("123456", 10),
  },
];
export default users;
