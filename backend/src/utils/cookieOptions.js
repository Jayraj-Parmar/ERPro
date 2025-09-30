export const getCookieOptions = (expiryMinutes, type = "access") => {
  const isProd = process.env.NODE_ENV === "production";
  return {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? "Strict" : "lax",
    maxAge: expiryMinutes * 60 * 1000,
    path: "/",
    domain: isProd ? ".example.com" : "localhost", // For cross-subdomain cookies in prod
  };
};
