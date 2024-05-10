import jwt from "jsonwebtoken"

const generateTokenAndSetCookie = (userId, res)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "10d"
    })

    res.cookie("jwt", token, {
        maxAge: 15*24*60*60*1000,
        httpOnly: true, // prevent access from users
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development"
    })
}

export default generateTokenAndSetCookie;