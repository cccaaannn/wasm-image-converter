import { JSX, splitProps } from 'solid-js';

const Button = (props: JSX.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const [local, rest] = splitProps(props, ["class"]);

    return (
        <button
            class={`
                hover:bg-blue-400 
                group 
                flex 
                items-center 
                rounded-md 
                bg-blue-500 
                text-white 
                text-sm 
                font-medium 
                pl-2 
                pr-3 
                py-2 
                shadow-sm 
                disabled:bg-gray-300 
                disabled:text-gray-400 
                text-center 
                justify-center 
                ${local.class}
            `}
            {...rest}
        >
            {rest.children}
        </button>
    );
};

export default Button;
