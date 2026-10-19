const users = [{ id: 1, name: "Ahmed", email: "ahmed@example.com" }];

async function getUsers(req, res) {
  res.statusCode = 200;
  res.end(JSON.stringify({ data: users }));
}

async function createUser(req, res) {
  try {
    let body = "";

    for await (const chunk of req) {
      body += chunk;
    }

    const userData = JSON.parse(body);

    if (
      typeof userData.name !== "string" ||
      !userData.name.trim() ||
      typeof userData.email !== "string" ||
      !userData.email.trim()
    ) {
      res.statusCode = 400;
      res.end(
        JSON.stringify({
          message: "Name and email are required",
        }),
      );
      return;
    }

    const newUser = {
      id: users.length + 1,
      name: userData.name,
      email: userData.email,
    };

    users.push(newUser);

    res.statusCode = 201;
    res.end(
      JSON.stringify({
        message: "User created successfully",
        data: newUser,
      }),
    );
  } catch (error) {
    res.statusCode = 400;
    res.end(
      JSON.stringify({
        message: "Invalid JSON body",
      }),
    );
  }
}

module.exports = { getUsers, createUser };
