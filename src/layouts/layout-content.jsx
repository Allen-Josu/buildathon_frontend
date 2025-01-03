import { Album, User2 } from "lucide-react";

export default function ContentLayout() {

    const data = [
        {
            title: "Week 1-12",
            uploadedBy: "Sourabh Bhai"
        },
        {
            title: "Week 13-24",
            uploadedBy: "Raj Kumar"
        },
        {
            title: "Week 25-36",
            uploadedBy: "Nidhi Sharma"
        },
        {
            title: "Week 37-48",
            uploadedBy: "Karan Singh"
        },
        {
            title: "Week 49-52",
            uploadedBy: "Priya Mehta"
        }
    ];

    return (
        <>
            <div className="flex items-center w-full flex-col justify-center px-28 ">
                <div className="flex justify-between items-center w-full font-bold text-xl mt-10 text-[#c1c3c8]">
                    <p>Notes</p>
                    <p>Shared By</p>
                </div>

                {
                    data.map((item) => (
                        <>
                            <div className="flex mt-3 border w-full h-12 justify-between items-center p-8 rounded-lg hover:bg-[#6d28d9] hover:scale-105 transition-transform cursor-pointer  duration-600 ease-in">
                                <div className="flex justify-center text-lg items-center gap-4 text-[#c1c3c8]">
                                    <Album /> {item.title}
                                </div>

                                <div className="text-[#c1c3c8] text-lg font-semibold flex justify-center items-center gap-4">
                                    <User2 />
                                    {item.uploadedBy}
                                </div>
                            </div>
                        </>
                    ))
                }

            </div>
        </>
    )
}
