
import { useForm } from "react-hook-form"


export const FormPage = () => {
    const { } = useForm();
    return (

        <form action="">
            <h3>Formularios</h3>

            <div className="flex flex-col space-y-2 w-[500px]">
                <input type="text" className=" border border-gray-300 p-2 rounded-xl" placeholder="email" />

                <input type="text" className=" border border-gray-300 p-2 rounded-xl" placeholder="email" />


            </div>
        </form>

    )
}
