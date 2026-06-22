export const sendToken = (user, statusCode, res) => {
    const token = user.getJwtToken();

    // convert env to number + fallback
    const expireDays = Number(process.env.EXPIRE_COOKIE) || 7;

    const options = {
        expires: new Date(Date.now() + expireDays * 24 * 60 * 60 * 1000),
        httpOnly: true,//browser only access

        // production security (optional but recommended)
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict"
    };

    res.status(statusCode)
        .cookie("token", token, options)
        .json({
            success: true,
            user,
            token
        });
};