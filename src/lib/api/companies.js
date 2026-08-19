import { serverFetch } from "../core/server";
import { getUserSession } from "../core/session";

export const getRecruiterCompany = async (recruiterId) => {
    return serverFetch(`/api/my/companies?recruiterId=${recruiterId}`);
}
//! const user = await getUserSession();
//! console.log("user session in company page", user);
//! const company = await getRecruiterCompany(user?.id); 
//! uporer 3 ta liner er bodole niche eta korlam karon user and company aksonge akta function diye passi 

export const getLoggedInRecruiterCompany = async () => {
    const user = await getUserSession();
    return getRecruiterCompany(user?.id)
}