import { JSX, splitProps } from 'solid-js';

const IconButton = (props: JSX.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const [local, rest] = splitProps(props, ["class"]);

    return (
        <button
            type="button"
            class={`
            text-gray-500 
            inline-flex 
            items-center 
            justify-center 
            dark:text-gray-400 
            hover:bg-gray-100 
            w-10 
            h-10 
            dark:hover:bg-gray-700 
            focus:outline-none 
            focus:ring-4 
            focus:ring-gray-200 
            dark:focus:ring-gray-700 
            rounded-lg 
            text-sm p-2
            ${local.class}
            `}
            {...rest}
        >
            {rest.children}
        </button>
    );
};

export default IconButton;
