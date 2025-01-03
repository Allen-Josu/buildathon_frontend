import { Typography } from "antd";
import Sider from "antd/es/layout/Sider";
import { ChevronRight } from "lucide-react";

export default function SidebarLayout() {

    const { Title } = Typography

    const subjects = [
        {
            label: "Software Engineering"
        },
        {
            label: "Mathamatics"
        },
        {
            label: "Python"
        },
    ]


    return (
        <>
            <Sider width='25%' className='flex  bg-[#27272a]'>
                <div
                    className='p-5 flex flex-col w-full gap-10 border-r-2 h-full'
                >
                    {
                        subjects.map((item) => (
                            <>
                                <div
                                    // onClick={handleClick}
                                    className="flex justify-between items-center w-full p-3  gap-24 hover:bg-[#6d28d9] cursor-pointer transition duration-600 ease-in rounded-lg"
                                >
                                    <Title style={{ fontSize: "22px", color: "#c1c3c8" }}  >{item.label}</Title>
                                    <ChevronRight style={{ color: "White" }} />
                                </div>
                            </>
                        ))
                    }

                </div>
            </Sider>
        </>
    );
}
