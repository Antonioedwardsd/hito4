import jwt from "jsonwebtoken";

// Get the secret key from the .env file (CREATE.ENV)
// const SECRET = process.env.JWT_SECRET;

// if (!SECRET) {
// 	throw new Error("Environment variable JWT_SECRET must be defined");
// }

export const generateToken = (email: string, uid: string, expiresIn = "1h") => {
	return jwt.sign({ email, uid }, "secret", {
		expiresIn,
	});
};

export const verifyAccessToken = (token: string) => {
	return jwt.verify(token, "secret") as jwt.JwtPayload;
};
