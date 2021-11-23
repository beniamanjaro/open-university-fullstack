const bcrypt = require("bcrypt");
const User = require("../models/user");
const helper = require("./test_helper");

describe("When there's initially one user in db", async () => {
  beforeEach(async () => {
    await User.deleteMany({});
    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ name: "root", passwordHash });
    await user.save();
  });

  test("creation succedes with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "benogre",
      name: "beni",
      password: "secret",
    };

    await api.post("/api/users").send(newUser).expect(200);
  });
});
