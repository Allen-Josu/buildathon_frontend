import { Flex, Layout } from "antd";
import HeaderLayout from "./layout-header";
import SidebarLayout from "./layout-sidebar";
import ContentLayout from "./layout-content";
const { Content } = Layout;

const contentStyle = {
	textAlign: "center",
	minHeight: 120,
	lineHeight: "120px",
	color: "#fff",
	backgroundColor: "#0958d9",
};
const siderStyle = {
	textAlign: "center",
	lineHeight: "120px",
	color: "#fff",
	backgroundColor: "#1677ff",
	border: "1px solid black",
};

const layoutStyle = {
	overflow: "hidden",
	width: "100%",
	height: "100vh",
};

export default function PageLayout() {
	return (
		<>
			<Flex gap='middle' wrap>
				<Layout style={layoutStyle}>
					<HeaderLayout />
					<Layout>
						<SidebarLayout />
						<Content className="bg-[#27272a]"><ContentLayout /></Content>
					</Layout>
				</Layout>
			</Flex>
		</>
	);
}
