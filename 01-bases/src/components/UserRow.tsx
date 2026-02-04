import { use } from "react";
import type { User } from "../interfaces/reqres.response"


interface Props {
    user: User;
}

export const UserRow = ({ user }: Props) => {
    return (
        <tr className="transition-colors hover:bg-gray-50">
            <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                {user.id}
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900"
            >
                <img className="p-2 w-10 h-10 rounded-full" src={user.photo} alt="User Avatar" />
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                <span>{user.name}</span>
            </td>
            <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900">
                <span>{user.email}</span>
            </td>
        </tr>
    )
}
