import { JSX, For, createEffect, Accessor, createSignal } from 'solid-js';

type ChangeEvent = Event & {
    currentTarget: HTMLSelectElement;
    target: HTMLSelectElement;
}

export interface SelectBoxItem<T> {
    label: JSX.Element;
    value: T;
}

interface SelectBoxProps<T> {
    items: SelectBoxItem<T>[];
    label?: JSX.Element;
    value?: Accessor<T>;
    onchange?: (value: T) => void;
}

const SelectBox = <T extends {}>(props: SelectBoxProps<T>) => {

    const [selectedIndex, setSelectedIndex] = createSignal<number>(0);

    createEffect(() => {
        const selectedArr = props.items.filter((_, index) => index === selectedIndex());
        if (selectedArr.length !== 1) return;
        const selected = selectedArr[0];
        props.onchange?.(selected.value);
    });

    createEffect(() => {
        if (!props.value) return;
        let tempIndex = 0;
        props.items.forEach((item, index) => { if (item.value === props.value?.()) tempIndex = index; })
        setSelectedIndex(tempIndex);
    });

    return (
        <label class="block text-sm font-medium text-gray-900 dark:text-white">
            {
                props.label &&
                <p class="mb-2">
                    {props.label}
                </p>
            }

            <select
                class="
                    block 
                    w-full 
                    p-2.5 
                    border 
                    bg-gray-50 
                    border-gray-300 
                    text-gray-900 
                    text-sm 
                    rounded-lg 
                    focus:ring-blue-500 
                    focus:border-blue-500 
                    dark:bg-gray-700 
                    dark:border-gray-600 
                    dark:placeholder-gray-400 
                    dark:text-white 
                    dark:focus:ring-blue-500 
                    dark:focus:border-blue-500
                "
                onchange={(e: ChangeEvent) => setSelectedIndex(parseInt(e.target.value, 10))}
            >
                <For each={props.items}>{(item, index) =>
                    <option
                        selected={index() === selectedIndex()}
                        value={index()}
                    >
                        {item.label}
                    </option>
                }</For>
            </select>
        </label>
    )
}

export default SelectBox;
