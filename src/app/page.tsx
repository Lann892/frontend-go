"use client";
import Image from "next/image";
import { Table } from "@/components/table";
import { Form } from "@/components/form";
import { Provider } from "react-redux";
import store from "./store";

export default function Home() {
  return (
    <main
      className="
      flex flex-col 
      w-full min-h-screen
      bg-white
    ">
      <Provider store={store}>
        <section className="bg-white">
          <div className="container mt-8 px-6 py-12 mx-auto bg-transparent">
            <p style={{ fontSize: 32, padding: 0, color: "black" }}>
              React + Redux Toolkit + TypeScript
            </p>
            <hr className="my-8 border-gray-200 dark:border-gray-700" />

            <div className="grid gap-6 grid-cols-2">
              <Table />
              <Form />
            </div>
          </div>
        </section>
      </Provider>
    </main>
  );
}
