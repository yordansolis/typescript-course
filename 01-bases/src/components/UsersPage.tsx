import { UserRow } from "./UserRow"
import { useUsers } from "../hooks/useUsers"


// https://fake-json-api.mock.beeceptor.com/users



export const UsersPage = () => {

    const { users } = useUsers();
    // console.log(users);



    return (
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600"> #ID</th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Avatar: </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Nombre: </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600">Email:</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">

                    {
                        (users ?? []).map(user => (
                            <UserRow key={user.id} user={user} />

                        ))
                    }


                </tbody>
            </table>


            <div className="flex justify-between w-[500px] mt-2">
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
                >
                    Anterior
                </button>

                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200"
                >
                    Siguiente
                </button>



            </div>


        </div>
    )
}
