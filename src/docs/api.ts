import { api } from "../config/routes";
export default {
  openapi: "3.0.1",
  info: {
    version: "1.0.0",
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
      bearerAuth: [],
    },
  ],
  tags: [
    {
      name: "Authentication",
    },
    {
      name: "Users",
    },
    {
      name: "Roles",
    },
    {
      name: "Companies",
    },
  ],
  paths: {
    "/auth": {
      post: {
        tags: ["Authentication"],
        summary: "User authentication.",
        operationId: "authenticateUser",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Auth",
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "Success",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
              },
            },
          },
          400: {
            description: "Email or password incorrect",
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
    "/companies/{id}": {
      get: {
        tags: ["Companies"],
        summary: "Get a specific company by id.",
        description: "Return a company",
        operationId: "getSpecificCompany",
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
            description: "A specific company were obtained",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Company",
                },
              },
            },
          },
          400: {
            description: "Company does not exist",
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
    "/companies": {
      get: {
        tags: ["Companies"],
        summary: "Returns a list of all companies.",
        description: "Get all companies",
        operationId: "getCompanies",
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
            description: "Companies were obtained",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Companies",
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
        tags: ["Companies"],
        summary: "Create a new company.",
        description: "Create companies",
        operationId: "createCompanies",
        parameters: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Company",
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "New company were created",
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
        tags: ["Companies"],
        summary: "Update a company.",
        description: "Update company",
        operationId: "updateCompany",
        parameters: [
          {
            name: "company_id",
            in: "header",
            schema: {
              type: "number",
              required: true,
            },
            required: true,
            description: "Company id",
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Company",
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "Company were updated",
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
        tags: ["Companies"],
        summary: "Delete a company.",
        description: "Delete company",
        operationId: "deleteCompany",
        parameters: [
          {
            name: "company_id",
            in: "header",
            schema: {
              type: "number",
              required: true,
            },
            required: true,
            description: "Company id",
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
    "/roles": {
      get: {
        tags: ["Roles"],
        summary: "Returns a list of all roles.",
        description: "Get all roles",
        operationId: "getRoles",
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
            description: "Roles were obtained",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Roles",
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
        tags: ["Roles"],
        summary: "Create a new company.",
        description: "Create roles",
        operationId: "createRoles",
        parameters: [],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Role",
              },
            },
          },
          required: true,
        },
        responses: {
          201: {
            description: "New company were created",
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
        tags: ["Roles"],
        summary: "Update a role.",
        description: "Update role",
        operationId: "updateRole",
        parameters: [
          {
            name: "role_id",
            in: "header",
            schema: {
              type: "number",
              required: true,
            },
            required: true,
            description: "Role id",
          },
        ],
        requestBody: {
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Role",
              },
            },
          },
          required: true,
        },
        responses: {
          200: {
            description: "Role were updated",
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
        tags: ["Roles"],
        summary: "Delete a role.",
        description: "Delete role",
        operationId: "deleteRole",
        parameters: [
          {
            name: "role_id",
            in: "header",
            schema: {
              type: "number",
              required: true,
            },
            required: true,
            description: "Role id",
          },
        ],
        responses: {
          200: {
            description: "Role were deleted",
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
      Auth: {
        type: "object",
        properties: {
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
          companyId: {
            type: "number",
            example: 1,
          },
          roleId: {
            type: "number",
            example: 1,
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
      Company: {
        type: "object",
        properties: {
          name: {
            type: "string",
            example: "Coca Cola",
          },
        },
      },
      Companies: {
        type: "object",
        properties: {
          roles: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Company",
            },
          },
        },
      },
      Role: {
        type: "object",
        properties: {
          name: {
            type: "string",
            example: "ADMIN",
          },
        },
      },
      Roles: {
        type: "object",
        properties: {
          roles: {
            type: "array",
            items: {
              $ref: "#/components/schemas/Role",
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
      bearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" },
    },
  },
};
