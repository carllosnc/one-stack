"use client";

export function ClientComp() {
  return (
    <div className="flex p-[20px] gap-[10px]">
      <button
        className="p-2 text-blue border border-black">
        Add user
      </button>

      <button
        className="p-2 text-blue border border-black">
        List all users
      </button>
    </div>
  )
}