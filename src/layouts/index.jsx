/* eslint-disable react/prop-types */
import { Flex, Layout, Select, Typography } from "antd";
import { Album, ChevronRight, User2 } from "lucide-react";
import Sider from "antd/es/layout/Sider";
const { Content } = Layout;

const layoutStyle = {
	overflow: "hidden",
	width: "100%",
	height: "100vh",
};

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



export default function PageLayout({ title }) {

	return (
		<>
			<Flex gap='middle' wrap>
				<Layout style={layoutStyle}>
					<div className="flex justify-between items-center w-full px-20 h-20 text-white bg-[#27272a] border-b-2 border-[#393939] " >
						<h3>{title}</h3>
						<div className="w-96 flex justify-end">
							<Select style={{ width: "50%" }} />
						</div>
					</div>
					<Layout>
						<Sider width='25%' className='flex  bg-[#27272a] '>
							<div
								className='p-5 flex flex-col w-full gap-10 border-r-2 h-full border-[#393939]'
							>
								{
									subjects.map((item) => (
										<>
											<div
												// onClick={handleClick}
												className="flex justify-between items-center w-full p-3  gap-44 border-b-2 border-[#393939] hover:bg-[#6d28d9] cursor-pointer transition duration-600 ease-in rounded-lg"
											>
												<Title style={{ fontSize: "18px", color: "#c1c3c8" }}  >{item.label}</Title>
												<ChevronRight style={{ color: "White" }} />
											</div>
										</>
									))
								}

							</div>
						</Sider>
						<Content className="bg-[#27272a]">
							<div className="flex items-center w-full flex-col justify-center px-28 ">
								<div className="flex justify-between items-center w-full font-bold text-xl mt-10 text-[#c1c3c8]">
									<p>{title}</p>
									<p>Shared By</p>
								</div>

								{
									data.map((item) => (
										<>
											<div className="flex mt-3 mb-3  border w-full h-12 justify-between items-center p-8 rounded-md  hover:bg-[#6d28d9] hover:scale-105 transition-transform cursor-pointer  duration-600 ease-in">
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
						</Content>
					</Layout>
				</Layout>
			</Flex>
		</>
	);
}
