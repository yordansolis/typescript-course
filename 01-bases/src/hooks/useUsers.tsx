import { useEffect, useState } from "react";
import type { User } from "../interfaces/reqres.response";
import { LoadUsersActions } from "../actions/load-users.action";



export const useUsers = () => {

    const [users, setUsers] = useState<User[]>();


    useEffect(() => {
        LoadUsersActions(3).then(setUsers)
    }, [])



    return {
        users,
        setUsers
    }
}
