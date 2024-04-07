"use client";
import React, { useState } from "react";
import { MultiStepLoader as Loader } from "./ui/multi-step-loader";
import { TbSquareRoundedX } from "react-icons/tb";

export default function MultiStepLoader({
  loadingStates,
  currentState,
  setCurrentState,
  loading,
  setLoading,
}) {
  return (
    <div className="w-full h-[60vh] flex items-center justify-center">
      {/* Core Loader Modal */}
      <Loader
        loadingStates={loadingStates}
        loading={loading}
        currentState={currentState}
        setCurrentState={setCurrentState}
      />

      {/* {loading && (
        <button
          className="fixed top-4 right-4 text-white z-[120]"
          onClick={() => setLoading(false)}
        >
          <TbSquareRoundedX className="h-10 w-10" />
        </button>
      )} */}
    </div>
  );
}
