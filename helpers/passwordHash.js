import bcrypt from 'bcrypt';

export const passwordHash = async (plainPassword) => {
    const hash = await bcrypt.hash(plainPassword, 10);
    return hash;
};

export const comparePassword = async (plainPassword, hashedPassword) => {
    const compared = await bcrypt.compare(plainPassword, hashedPassword);
    return compared;
};
