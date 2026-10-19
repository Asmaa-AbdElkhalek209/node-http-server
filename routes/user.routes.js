const { getUsers, createUser } = require("../controllers/user.controller");

async function userRoutes(req, res) {
  if (req.method === "GET" && req.url === "/api/users") {
    await getUsers(req, res);
    return true;
  }

  if (req.method === "POST" && req.url === "/api/users") {
    await createUser(req, res);
    return true;
  }

  return false;
}

module.exports = userRoutes;
