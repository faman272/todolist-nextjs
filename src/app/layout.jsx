import "./globals.css";

export const metadata = {
  title: "TodoList - Daisy",
  description: "To Do List App",
};


export default function RootLayout({ children }) {

  return (
    <>
      {children}
    </>
  );
}
