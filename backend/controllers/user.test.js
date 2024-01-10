const bcrypt = require("bcrypt");
const userController = require("./user");
const User = require("../models/user");

jest.mock("bcrypt");
jest.mock("../models/user");

describe("signup()", () => {
  test("should create a new user, return 201 status and success message", async () => {
    // Arrange
    const mReq = {
      body: {
        email: "person@example.com",
        password: "Password123!",
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mNext = jest.fn();

    // Mock bcrypt.hash to return a resolved promise
    bcrypt.hash.mockResolvedValue("hashedPassword");

    // Mock User model and its save method
    const mockSave = jest.fn().mockResolvedValue();
    User.mockImplementation(() => ({
      save: mockSave,
    }));

    // Act
    await userController.signup(mReq, mRes, mNext);

    // Assert
    expect(bcrypt.hash).toHaveBeenCalledWith("Password123!", 10);
    expect(User).toHaveBeenCalledWith({
      email: "person@example.com",
      password: "hashedPassword",
    });
    expect(mockSave).toHaveBeenCalled();
    await Promise.resolve();
    expect(mRes.status).toHaveBeenCalledWith(201);
    expect(mRes.json).toHaveBeenCalledWith({
      message: "User added successfully!",
    });
  });

  test("should handle errors and return a 500 status", async () => {
    // Arrange
    const mReq = {
      body: {
        email: "person@example.com",
        password: "Password123!",
      },
    };
    const mRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const mNext = jest.fn();

    // Mock bcrypt.hash to return a rejected promise
    bcrypt.hash.mockRejectedValue("Hashing error");

    // Act
    await userController.signup(mReq, mRes, mNext);

    // Assert
    await Promise.resolve();
    expect(mRes.status).toHaveBeenCalledWith(500);
    expect(mRes.json).toHaveBeenCalledWith({ error: "Hashing error" });
  });
});
