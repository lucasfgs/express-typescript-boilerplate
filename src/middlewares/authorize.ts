import { Response, NextFunction, RequestHandler } from "express";
import jwt from "express-jwt";

export function authorize(
  roles: string | string[]
): [jwt.RequestHandler, RequestHandler] {
  // roles param can be a single role string (e.g. Role.User or 'User')
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  if (typeof roles === "string") {
    roles = [roles];
  }

  return [
    // authenticate JWT token and attach user to request object (req.user)
    jwt({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }),

    // authorize based on user role
    (req: any, res: Response, next: NextFunction) => {
      if (roles.length && !roles.includes(req.user.role)) {
        // user's role is not authorized
        return res.status(401).json({ message: "Unauthorized" });
      }

      // authentication and authorization successful
      next();
    },
  ];
}
