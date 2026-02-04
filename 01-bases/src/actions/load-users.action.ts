import axios from 'axios'
import type { User } from '../interfaces/reqres.response'


export const LoadUsersActions = async (page: number = 1) => {


    try {
        const { data } = await axios.get<User | User[]>(`https://fake-json-api.mock.beeceptor.com/users/`, {

            params: { page }
        })

        return Array.isArray(data) ? data : [data]

    } catch (error) {
        console.error(error)
    }



}