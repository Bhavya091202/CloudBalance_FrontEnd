const authConfig = [
    {
        name: "email",
        type: "text",
        placeholder: "abc@cloudbalance.com",
        required: true,
        minLength: 2,
        maxLength: 30,
        label: "Email",
        labelClass: "block text-gray-700 font-medium mb-1",
        inputClass: "w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
    },
    {
        name: "password",
        type: "password",
        placeholder: "Enter your password",
        required: true,
        minLength: 6,
        maxLength: 20,
        label: "Password",
        labelClass: "block text-gray-700 font-medium mb-1",
        inputClass: "w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"

    },
    {
        name: "submit",
        type: "submit",
        value: "Login",
        required: true,
        inputClass: "w-full bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition duration-200"

    }
]

export default authConfig;