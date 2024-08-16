import { Accessor, Show, createEffect, JSX, onMount, onCleanup } from "solid-js";
import UploadIcon from "@/components/icons/upload-icon";

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

    let labelRef!: HTMLLabelElement | undefined;
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

    const onDragOver = (e: DragEvent) => {
        e.preventDefault();
        labelRef?.classList.remove('bg-gray-50');
        labelRef?.classList.remove('dark:bg-gray-800');
        labelRef?.classList.add('bg-gray-200');
        labelRef?.classList.add('dark:bg-gray-700');
    }

    const onDragLeave = (e: DragEvent) => {
        e.preventDefault();
        labelRef?.classList.add('bg-gray-50');
        labelRef?.classList.add('dark:bg-gray-800');
        labelRef?.classList.remove('bg-gray-200');
        labelRef?.classList.remove('dark:bg-gray-700');
    }

    const onDrop = (e: DragEvent) => {
        e.preventDefault();
        labelRef?.classList.add('bg-gray-50');
        labelRef?.classList.add('dark:bg-gray-800');
        labelRef?.classList.remove('bg-gray-200');
        labelRef?.classList.remove('dark:bg-gray-700');

        if (!e.dataTransfer?.files || e.dataTransfer.files.length !== 1) {
            props.onchange(null);
            return;
        };

        const file: File = e.dataTransfer.files[0];
        props.onchange(file);
    }

    createEffect(() => {
        if (props.file() === null && inputRef) inputRef.value = "";
    })

    onMount(() => {
        labelRef?.addEventListener('dragover', onDragOver);
        labelRef?.addEventListener('dragleave', onDragLeave);
        labelRef?.addEventListener('drop', onDrop);
    });

    onCleanup(async () => {
        labelRef?.removeEventListener('dragover', onDragOver);
        labelRef?.removeEventListener('dragleave', onDragLeave);
        labelRef?.removeEventListener('drop', onDrop);
    });

    return (
        <div class="flex items-center justify-center w-full">
            <label
                ref={labelRef}
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
                hover:bg-gray-200 

                dark:bg-gray-800 
                hover:dark:bg-gray-700 
                dark:border-gray-500 
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

                        <UploadIcon />

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
            </label>
        </div>
    )
}

export default DragDropFilePicker;
