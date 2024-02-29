"use client"

import { useContext } from "react";
import { ThemeContext } from "../context/theme-context";

const DropdownTheme = () => {
    const themes = [
        "light",
        "dark",
        "cupcake",
        "bumblebee",
        "emerald",
        "corporate",
        "synthwave",
        "retro",
        "cyberpunk",
        "valentine",
        "halloween",
        "garden",
        "forest",
        "aqua",
        "lofi",
        "pastel",
        "fantasy",
        "wireframe",
        "black",
        "luxury",
        "dracula",
        "cmyk",
        "autumn",
        "business",
        "acid",
        "lemonade",
        "night",
        "coffee",
        "winter",
        "dim",
        "nord",
        "sunset",
    ];

    const { selectedTheme, handleThemeChange } = useContext(ThemeContext);

    const handleTheme = (theme) => {
        handleThemeChange(theme);
    }


    return (
        <>

            <div className="tooltip" data-tip={`Current: ${selectedTheme}`}>

                <button className="btn btn-sm btn-outline btn-accent m-1 text-sm " onClick={() => document.getElementById('my_modal_2').showModal()}>
                    Theme
                </button>

                <dialog id="my_modal_2" className="modal">
                    <div className="modal-box flex flex-col gap-2 w-52">
                        {themes.map((theme, index) => {
                            return (
                                <>
                                    <button
                                        key={index}
                                        className="btn btn-ghost"
                                        onClick={() => handleTheme(theme)}
                                    >
                                        {theme}
                                    </button>
                                </>
                            );
                        })}
                    </div>
                    <form method="dialog" className="modal-backdrop">
                        <button>close</button>
                    </form>
                </dialog>
            </div>
        </>

    );
};

export default DropdownTheme;
