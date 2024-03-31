"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useData } from "@/context/DataContext";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";
import Link from "next/link";

export default function CreateCourse() {
  const { user, addAlert } = useData();
  const [inputs, setInputs] = useState({
    title: "",
    units: [""],
  });

  const handleInputChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleUnitChanges = (e) => {
    const index = e.target.name.split("-")[1];
    const units = inputs.units;
    units[index] = e.target.value;
    setInputs({
      ...inputs,
      units: units,
    });
  };

  const deleteUnit = (index) => {
    const units = inputs.units;
    units.splice(index, 1);
    setInputs({
      ...inputs,
      units: units,
    });
  };

  const addUnit = (e) => {
    e.preventDefault();
    if (inputs.units.length >= 5) {
      addAlert({ message: "You can only add 5 units", type: "error" });
      return;
    }

    setInputs({
      ...inputs,
      units: [...inputs.units, ""],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputs.units.length < 1) {
      addAlert({ message: "Please add at least one unit", type: "error" });
      return;
    }
    for (let i = 0; i < inputs.units.length; i++) {
      if (inputs.units[i] === "") {
        addAlert({ message: "Please fill all the units", type: "error" });
        return;
      }
    }

    inputs.userId = user.id;
    console.log(inputs);
    await axios
      .post("/api/courses/create", inputs)
      .then((res) => {
        if (res.data.status === 201) {
          //   addAlert({ message: res.data.message, type: "success" });
          window.location.replace(
            `/dashboard/courses/create/chapters/${res.data.data}`
          );
        } else {
          console.log(res.data.message);
          addAlert({ message: res.data.message, type: "error" });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      className="pt-24 flex justify-center items-center min-h-screen"
      style={{ background: "#f2f2f2" }}
    >
      <div className="min-w-96 max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-2">
          Create Course
        </h2>
        <form className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label
                className="text-sm font-medium text-gray-700 block mb-2"
                htmlFor="title"
              >
                Title
              </label>
              <Input
                className="w-full px-4 py-2 border border-gray-200 rounded-md dark:border-gray-800"
                id="title"
                name="title"
                placeholder="Calculus"
                type="text"
                onChange={handleInputChange}
              />
            </div>
          </div>
          {inputs.units.map((unit, index) => {
            return (
              <div key={index} className="grid grid-cols-1 gap-4">
                <div>
                  <label
                    className="text-sm font-medium text-gray-700 block mb-2"
                    htmlFor={`unit-${index}`}
                  >
                    Unit {index + 1}
                  </label>
                  <div className="flex items-center gap-2">
                    <Input
                      className="w-full px-4 py-2 border border-gray-200 rounded-md dark:border-gray-800"
                      id={`unit-${index}`}
                      name={`unit-${index}`}
                      placeholder="What is derivative?"
                      type="text"
                      onChange={handleUnitChanges}
                    />
                    <MdDeleteForever
                      style={{
                        fontSize: "1.5rem",
                        color: "red",
                        cursor: "pointer",
                      }}
                      onClick={(e) => deleteUnit(index)}
                    />
                  </div>
                </div>
              </div>
            );
          })}

          <div className="text-center flex gap-2 items-center justify-center">
            <Button
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 mt-4"
              onClick={(e) => addUnit(e)}
            >
              Add Unit
            </Button>
            <Button
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800 mt-4"
              onClick={(e) => handleSubmit(e)}
            >
              Next
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
