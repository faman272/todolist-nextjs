"use client"

import FormTodo from "../components/FormTodo";
import DropdownTheme from "../components/DropdownTheme";

import { useContext } from "react";
import { ThemeContext } from "../context/theme-context";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});


const TodoList = () => {

  const { selectedTheme } = useContext(ThemeContext);

  return (

    // Tema dinamis
    <html lang="en" data-theme={selectedTheme}  >


      <body className={poppins.className}>

        <div className="flex flex-col items-center gap-4 h-screen">

          <div className="flex justify-between gap-8 p-2 mt-8">
            <h1 className="text-4xl font-bold my-4 p-4">What's your plan today?</h1>
            {/* Componen Tema */}
            <DropdownTheme />
          </div>

          <div className="lg:w-1/2 p-4">
            {/* Componen FormTodo */}
            <FormTodo />
          </div>

        </div>
      </body>

    </html>
  );
}

export default TodoList;