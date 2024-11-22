import jwt from "jsonwebtoken";

export const generateAccessToken = (userId) => {
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in environment variables");
    }

    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "15m", // Thời gian sống ngắn
    });
};

export const generateRefreshToken = (userId) => {
    if (!process.env.JWT_REFRESH_SECRET) {
        throw new Error("JWT_REFRESH_SECRET is not defined in environment variables");
    }

    return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, {
        expiresIn: "7d", // Thời gian sống dài hơn
    });
};

export const generateTokenAndSetCookie = (res, userId) => {
    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken(userId);

    res.cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 15 * 60 * 1000, // 15 phút
    });

    res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 ngày
    });

    return { accessToken, refreshToken };
};


export const refreshAccessToken = (req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ error: "Refresh token is missing" });
    }
    try {
        // Xác thực refresh token
        const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
        const newAccessToken = generateAccessToken(payload.userId);

        // Đặt access token mới vào cookie
        res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 15 * 60 * 1000, // 15 phút
        });

        return res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
        console.error("Error refreshing token:", error);
        return res.status(403).json({ error: "Invalid or expired refresh token" });
    }
};
