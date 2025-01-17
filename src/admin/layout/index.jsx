/* eslint-disable react/prop-types */
import { Flex, Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { ChevronRight } from "lucide-react";
import { menuItems } from "../constants";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const { Content } = Layout;
const layoutStyle = {
    overflow: "hidden",
    width: "100%",
    height: "100vh",
};

export default function AdminPageLayout({ title, actions, children }) {
    const [active, setActive] = useState(title);
    const location = useLocation();
    const navigate = useNavigate();

    // Function to convert URL pathname to title format
    const getFormattedTitle = (pathname) => {
        // Remove leading slash and capitalize first letter
        const formatted = pathname.substring(1).charAt(0).toUpperCase() +
            pathname.slice(2).toLowerCase();
        return formatted;
    };

    // Set active state based on URL on component mount and URL changes
    useEffect(() => {
        const currentTitle = getFormattedTitle(location.pathname);
        setActive(currentTitle);
    }, [location.pathname]);

    const handleClick = (label) => {
        // Convert title to URL format (lowercase with leading slash)
        const path = `/${label.toLowerCase()}`;
        navigate(path);
        setActive(label);
    };

    return (
        <Flex gap="middle" wrap="wrap" className="min-h-screen">
            <Layout style={layoutStyle}>
                <div className="w-full lg:h-24 md:h-32 flex items-center bg-[#27272a] border-b-2 border-[#c1c3c8]">
                    <p className="text-[#c1c3c8] text-xl font-bold pl-10">Administrator</p>
                </div>
                <Layout>
                    <Sider
                        width="25%"
                        className="bg-[#27272a] border-r-2 border-[#c1c3c8] flex flex-col gap-28 h-full"
                    >
                        <div className="p-4 flex flex-col w-full gap-6 border-r-2 h-full border-[#393939] overflow-y-auto">
                            {menuItems.map((item, index) => (
                                <div
                                    key={index}
                                    onClick={() => handleClick(item.title)}
                                    className={`flex justify-between items-center w-full p-3 border-b-2 border-[#393939] hover:bg-[#6d28d9] cursor-pointer transition duration-300 ease-in rounded-lg ${active === item.title ? "bg-[#6d28d9]" : ""
                                        }`}
                                >
                                    <h4 className="text-[#c1c3c8] text-sm md:text-base">
                                        {item.title}
                                    </h4>
                                    <ChevronRight className="text-white" />
                                </div>
                            ))}
                        </div>
                    </Sider>
                    <Content className="bg-[#27272a] min-h-screen w-full px-5 text-white flex flex-col gap-4">
                        <div className="bg-[#393939] w-full h-28 mt-5 rounded-lg flex justify-between items-center px-3">
                            <p className="font-bold text-xl">{title}</p>
                            <div>
                                {actions && actions.map((item) => item)}
                            </div>
                        </div>
                        <div className="bg-[#393939] w-full h-full mb-5 rounded-lg p-4">
                            {children}
                        </div>
                    </Content>
                </Layout>
            </Layout>
        </Flex>
    );
}