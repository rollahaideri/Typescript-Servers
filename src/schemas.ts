export const LoginSchema = {
  body: {
    type: "object",
    required: ["email", "password"],
    properties: {
      email: { description: "Name of the author", type: "string" },
      password: { description: "Year of the book", type: "string" },
    },
  },
  response: {
    200: {
      type: "object",
      description: "Success response",

      properties: {
        token: { type: "string" },
      },
    },
  },
};

export const RegisterSchema = {
  body: {
    type: "object",
    required: ["name", "email", "password"],
    properties: {
      name: { description: "Name of the author", type: "string" },
      email: { description: "Name of the author", type: "string" },
      password: { description: "Year of the book", type: "string" },
    },
  },
  response: {
    201: {
      type: "object",
      description: "Success response",

      properties: {
        success: { type: "boolean" },
        message: { type: "string" },
      },
    },
  },
};

export const AddBookSchema = {
  body: {
    type: "object",
    required: ["author", "year", "title", "isbn"],
    properties: {
      author: { description: "Name of the author", type: "string" },
      year: { description: "Year of the book", type: "number" },
      title: { description: "Title of the book", type: "string" },
      isbn: { description: "ISBN-coe of the book", type: "string" },
    },
  },
  response: {
    201: {
      type: "object",
      description: "Success response",

      properties: {
        success: { type: "boolean" },
        message: { type: "string" },
      },
    },
  },
};

export const GetBooksSchema = {
  response: {
    200: {
      description: "List of all books",
      type: "array",
      items: {
        type: "object",
        properties: {
          author: { description: "Name of the author", type: "string" },
          year: { description: "Year of the book", type: "number" },
          title: { description: "Title of the book", type: "string" },
          isbn: { description: "ISBN-coe of the book", type: "string" },
        },
      },
    },
  },
};

export const DeleteBookSchema = {
  body: {
    type: "object",
    required: ["title"],

    properties: {
      title: { description: "Title of the bookk to remove", type: "string" },
    },
  },
  response: {
    200: {
      description: "Delete status",
      type: "object",
      properties: {
        success: { type: "boolean" },
        message: { type: "string" },
      },
    },
  },
};
