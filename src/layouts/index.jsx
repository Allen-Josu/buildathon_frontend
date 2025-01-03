import { Flex, Layout } from "antd";
import HeaderLayout from "./layout-header";
import SidebarLayout from "./layout-sidebar";
import ContentLayout from "./layout-content";
const { Content } = Layout;

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
