import bcrypt from "bcrypt";

export const hashPassword = async (password, saltRounds = 10) => {
  try {
    // Generate a salt
    const salt = await bcrypt.genSalt(saltRounds);

    // Hash password
    return await bcrypt.hash(password, salt);
  } catch (error) {
    console.log(error);
  }

  // Return null if error
  return null;
};

export const comparePassword = async (password, hashed) => {
  return await bcrypt.compare(password, hashed);
};
