import Elysia, { t } from "elysia";
import { authSchema } from "./auth.schema";
import { AuthService } from "./auth.service";

export const AuthController = new Elysia({ prefix: "/auth" })
  .post(
    "/register",
    async ({ body, set }) => {
      const userRegister = await AuthService.register(body);
      set.status = "Created";
      return userRegister;
    },
    {
      body: t.Omit(authSchema, ["id", "createdAt", "updatedAt"]),
    }
  )
  .post(
    "/login",
    async ({ body, set, jwt }) => {
      const { username, password } = body;
      const userLogin = await AuthService.login(username, password, jwt);
      set.status = "OK";
      return userLogin;
    },
    {
      body: t.Object({
        username: t.String(),
        password: t.String(),
      }),
    }
  )
  .get("/me", async ({ jwt, set, headers }) => {
    const authHeader = headers["authorization"];
    if (!authHeader) throw new Error("No token");

    const token = authHeader.split(" ") [1]

    const payLoad = await jwt.verify(token);
    set.status = "OK";
    return payLoad;
  });
