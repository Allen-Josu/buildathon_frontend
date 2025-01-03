import { Select } from "antd";

export default function HeaderLayout() {
  return (
    <>
      <div className="flex justify-between items-center w-full px-20 h-20 text-white bg-[#27272a] border-b-2 " >
        <h3>Notes</h3>
        <div className="w-96 flex justify-end">
          <Select style={{ width: "50%" }} />
        </div>
      </div>
    </>
  )
}
