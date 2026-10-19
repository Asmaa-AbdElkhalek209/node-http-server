const http = require("node:http");

const users = [{ id: 1, name: "Ahmed", email: "ahmed@example.com" }];

class HttpError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
  }
}

// Middleware: تسجيل الطلبات
function logger(req, res, next) {
  console.log(`${req.method} ${req.url}`);
  next();
}

// قراءة الـ Request Body
async function readJsonBody(req) {
  let body = "";
  const maxSize = 1024 * 1024;

  for await (const chunk of req) {
    body += chunk;

    if (Buffer.byteLength(body, "utf8") > maxSize) {
      throw new HttpError(413, "Request body too large");
    }
  }

  try {
    return JSON.parse(body);
  } catch {
    throw new HttpError(400, "Invalid JSON body");
  }
}

// توحيد شكل الـ Error Response
function sendError(res, error) {
  if (res.writableEnded) return;

  const statusCode = error.statusCode || 500;

  if (statusCode === 500) {
    console.error(error);
  }

  res.statusCode = statusCode;
  res.end(
    JSON.stringify({
      message: statusCode === 500 ? "Internal server error" : error.message,
    }),
  );
}

const server = http.createServer(async (req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  try {
    logger(req, res, () => {});

    if (req.method === "GET" && req.url === "/api/users") {
      res.statusCode = 200;
      res.end(JSON.stringify({ data: users }));
      return;
    }

    if (req.method === "POST" && req.url === "/api/users") {
      const userData = await readJsonBody(req);

      if (
        typeof userData.name !== "string" ||
        !userData.name.trim() ||
        typeof userData.email !== "string" ||
        !userData.email.trim()
      ) {
        throw new HttpError(400, "Name and email are required");
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
      return;
    }

    throw new HttpError(404, "Route not found");
  } catch (error) {
    sendError(res, error);
  }
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
