// 'use server'

// import { serverMutation } from "../core/server"

// export const EmailSend = async (email,name ) => {
//     return serverMutation(`/api/send-email?email=${email}&name=${name}` )
// }

'use server';

export const EmailSend = async (email, name) => {
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/send-email?email=${email}&name=${name}`,
        {
            method: "POST",
        }
    );

    return res.json();
};