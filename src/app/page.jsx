"use client";

import TodoList from "./TodoList";
import { ThemeProvider } from "../context/theme-context";

const Page = () => {
  return (
    <ThemeProvider>
        <TodoList />
    </ThemeProvider>
  );
}

export default Page;