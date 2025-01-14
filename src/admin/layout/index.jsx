/* eslint-disable react/prop-types */
import { Flex, Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { ChevronRight } from "lucide-react";
import { menuItems } from "../constants";


const { Content } = Layout;
const layoutStyle = {
    overflow: "hidden",
    width: "100%",
    height: "100vh",
};


export default function AdminPageLayout({ title, actions, setActive, active, children }) {


    const handleActive = (label) => {
        setActive(label)
    }



    return (
        <Flex gap="middle" wrap="wrap" className="min-h-screen">

            <Layout style={layoutStyle}>
                <Layout >
                    <Sider
                        width="25%"
                        className="bg-[#27272a] border-r-2 border-[#c1c3c8] flex flex-col gap-28 h-full "
                    >
                        <div className="p-4 flex flex-col w-full gap-6 border-r-2 h-full border-[#393939] overflow-y-auto">
                            {
                                menuItems.map((item, index) => (
                                    <>
                                        <div
                                            onClick={() => handleActive(item.title)}
                                            key={index}
                                            className={`flex justify-between items-center w-full p-3  border-b-2 border-[#393939] hover:bg-[#6d28d9]  cursor-pointer transition duration-300 ease-in rounded-lg ${active === item.title ? "bg-[#6d28d9]" : ""}`}>
                                            <h4 className="text-[#c1c3c8] text-sm md:text-base">{item.title}</h4>
                                            <ChevronRight className="text-white" />
                                        </div>
                                    </>
                                ))
                            }
                        </div>
                    </Sider>
                    <Content className="bg-[#27272a] min-h-screen w-full px-5 text-white flex flex-col gap-4">
                        <div className="bg-[#393939] w-full h-24 mt-5 rounded-lg flex justify-between items-center px-3">
                            <p className="font-bold text-xl ">{title}</p>
                            <div>
                                {
                                    actions && actions.map((item) => (item))
                                }
                            </div>
                        </div>
                        <div className="bg-[#393939] w-full h-full mb-5 rounded-lg   p-4">
                            {children}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Flex>
    );
}