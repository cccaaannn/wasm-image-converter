import { Accessor, Show, createEffect, JSX } from "solid-js";

type ClickEvent = Event & {
    currentTarget: HTMLInputElement;
    target: HTMLInputElement;
}

interface DragDropFilePickerProps {
    file: Accessor<File | null>;
    onchange: (file: File | null) => void;
    accept?: string;
    label?: JSX.Element;
}

const DragDropFilePicker = (props: DragDropFilePickerProps) => {

    let inputRef!: HTMLInputElement | undefined;

    const onchange = (event: ClickEvent) => {
        if (!event.target.files) return;

        if (event.target.files.length !== 1) {
            props.onchange(null);
            return;
        };

        const file: File = event.target.files[0];
        props.onchange(file);
    }

    createEffect(() => {
        if (props.file() === null && inputRef) inputRef.value = "";
    })

    return (
        <div class="flex items-center justify-center w-full">
            <label
                class="
                flex 
                flex-col 
                items-center 
                justify-center 
                w-full 
                h-44 
                border-2 
                border-gray-300 
                border-dashed 
                rounded-lg 
                cursor-pointer 
                bg-gray-50 
                dark:hover:bg-bray-800 
                dark:bg-gray-700 
                hover:bg-gray-100 
                dark:border-gray-600 
                dark:hover:border-gray-500 
                dark:hover:bg-gray-600
                "
            >
                <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <Show
                        when={props.file() === null}
                        fallback={
                            <p class="text-md text-gray-500 dark:text-gray-400 font-semibold">
                                {props.file()?.name}
                            </p>
                        }
                    >
                        <svg class="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>

                        <Show
                            when={props.label}
                            fallback={
                                <p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                    <span class="font-semibold">Click to upload</span> or drag and drop
                                </p>
                            }
                        >
                            {props.label}
                        </Show>
                    </Show>
                </div>

                <input ref={inputRef} onchange={onchange} type="file" class="hidden" accept={props.accept ?? "*"} />
            </label >
        </div >
    )
}

export default DragDropFilePicker;
