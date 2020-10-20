import { api } from "../config/routes";
export default {
  openapi: "3.0.1",
  info: {
    version: "1.3.0",
    title: "Api documentation",
    description: "Boilerplate",
    contact: {
      name: "Lucas Ferreira",
      email: "lucsferreira.dev@gmail.com",
      url: "https://github.com/lucasfgs",
    },
  },
  servers: [
    {
      url: `http://localhost:8000/${api.name}/${api.version}`,
      description: "Local server",
    },
    {
      url: "https://api_url_testing",
      description: "Testing server",
    },
    {
      url: "https://api_url_production",
      description: "Production server",
    },
  ],
  security: [
    {
      ApiKeyAuth: [],
    },
  ],
  tags: [
    {
      name: "Users",
    },
  ],
  paths: {
    "/users/{id}": {
      get: {
        tags: ["Users"],
        summary: "Get a specific user by id.",
        description: "Return a user",
        operationId: "getSpecificUser",
        parameters: [
          {
            name: "id",
            in: "path",
            schema: {
              type: "integer",
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: "A specific user were obtained",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
          400: {
            description: "User does not exist",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/users": {
      get: {
        tags: ["Users"],
        summary: "Returns a list of all users.",
        description: "Get all users",
        operationId: "getUsers",
        parameters: [
          {
            name: "page",
            in: "query",
            schema: {
              type: "integer",
              default: 1,
            },
            required: false,
          },
          {
            name: "orderBy",
            in: "query",
            schema: {
              type: "string",
              enum: ["asc", "desc"],
              default: "asc",
            },
            required: false,
          },
        ],
        responses: {
          200: {
            description: "Users were obtained",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Users",
                },
              },
            },
          },
          400: {
            description: "Missing parameters",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Users"],
        summary: "Create a new user.",
        description: "Create users",
        operationId: "createUsers",
        parameters: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "New user were created",
          },
          400: {
            description: "Invalid parameters",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      patch: {
        tags: ["Users"],
        summary: "Update a user.",
        description: "Update user",
        operationId: "updateUser",
        parameters: [
          {
            name: "user_id",
            in: "header",
            schema: {
              type: "number",
              required: true,
            },
            required: true,
            description: "User id",
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/User",
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "User were updated",
          },
          400: {
            description: "Invalid parameters",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Users"],
        summary: "Delete a user.",
        description: "Delete user",
        operationId: "deleteUser",
        parameters: [
          {
            name: "user_id",
            in: "header",
            schema: {
              type: "number",
              required: true,
            },
            required: true,
            description: "User id",
          },
        ],
        responses: {
          200: {
            description: "User were deleted",
          },
          400: {
            description: "Invalid parameters",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          name: {
            type: "string",
            example: "Lucas Ferreira",
          },
          email: {
            type: "string",
            example: "test@test.com",
          },
          password: {
            type: "string",
            example: "123",
          },
        },
      },
      Users: {
        type: "object",
        properties: {
          users: {
            type: "array",
            items: {
              $ref: "#/components/schemas/User",
            },
          },
        },
      },
      Error: {
        type: "object",
        properties: {
          message: {
            type: "string",
          },
          internal_code: {
            type: "string",
          },
        },
      },
    },
    securitySchemes: {
      ApiKeyAuth: {
        type: "apiKey",
        in: "header",
        name: "x-api-key",
      },
    },
  },
};
