import jwt from "jsonwebtoken";
import dotenv from 'dotenv';



// Load environment variables from .env file
dotenv.config({ path: "./.env" });
const token = process.env.TOKEN || "secret";

//console.log(process.env.TOKEN);

interface IPayload {
    id: number,
}


export function createAccessToken(payload: IPayload) {
    return new Promise((resolve, reject) =>{
        jwt.sign(
            payload,
            token,
            {
              expiresIn: "1d",
            },
            (err, token) => {
              if (err) {
                console.log(err);
                return
              }
              resolve(token);
            }
          );
    });
}
