
import { useForm } from "react-hook-form"


type FormInputs = {
    email: string;
    password: string;
}

export const FormPage = () => {
    const { register, handleSubmit } = useForm<FormInputs>({
        defaultValues: {
            email: "jhordansolis@exaple.com",
            password: "12345"
        }
    });


    const onSubmit = (myForm: FormInputs) => {
        console.log({ myForm });
    }


    return (

        <form onSubmit={handleSubmit(onSubmit)}>
            <h3>Formularios</h3>

            <div className="flex flex-col space-y-2 w-[500px]">
                <input type="text" className=" border border-gray-300 p-2 rounded-xl" placeholder="email" required

                    {...register("email", { required: true })}
                />

                <input type="text" className=" border border-gray-300 p-2 rounded-xl" placeholder="password" required
                    {...register("password", { required: true })}

                />


                <button type="submit" className="px-4 py-2 bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white rounded-lg font-medium transition-colors duration-200">
                    Ingresar
                </button>
            </div>
        </form >

    )
}
