import { GET_USERPROFILE, EDIT_USERNAME } from "./type.actions";

/* Action de récupération des données utilisateu */
export const userProfile = (userData) => {
    return {
        type: GET_USERPROFILE,
        payload: userData,
    }
}

/* Action de mise à jour du nom d'utilisateur */
export const updateUsername = (username) => {
    return {
        type: EDIT_USERNAME,
        payload: username,
    }
}