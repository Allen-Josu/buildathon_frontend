/* eslint-disable react/prop-types */
import { Flex, Layout, Select, Typography } from "antd";
import { Album, ChevronRight, User2 } from "lucide-react";
import Sider from "antd/es/layout/Sider";
import { useEffect, useState } from "react";
import axios from "axios";

const { Content } = Layout;
const { Title } = Typography;

const layoutStyle = {
	overflow: "hidden",
	width: "100%",
	height: "100vh",
};

export default function PageLayout({ title, data }) {
	const [menuData, setMenuData] = useState({
		course: "MCA",
		semester: "I_Semester",
	});
	const [courseOptions, setCourseOptions] = useState([]);
	const [semesterOptions, setSemesterOptions] = useState([]);
	const [responseData, setResponseData] = useState([]);
	const [active, setActive] = useState("Software Engineering");


	const handleSubjectClick = (subjectLabel) => {
		setActive(subjectLabel);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`http://localhost:4000/departments?entity=departments`);
				const results = response.data.results || [];
				setResponseData(results);

				// Populate course and semester options
				const courses = [...new Set(results.map((item) => item.course))].map((course) => ({
					label: course,
					value: course,
				}));
				const semesters = [...new Set(results.map((item) => item.semester))].map((semester) => ({
					label: semester,
					value: semester,
				}));

				setCourseOptions(courses);
				setSemesterOptions(semesters);
			} catch (error) {
				console.error("Error fetching data:", error);
			}
		};

		fetchData();
	}, []);


	const filteredData = data?.filter((item) => item.subjectName === active);

	return (
		<Flex gap="middle" wrap>
			<Layout style={layoutStyle}>
				<div className="flex justify-between items-center w-full px-20 h-20 text-white bg-[#27272a] border-b-2 border-[#393939]">
					<h3 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold">{title}</h3>
					<div className="w-96 gap-8 flex justify-end">
						<Select
							style={{ width: "100%" }}
							value={menuData.course}
							options={courseOptions}
							placeholder="Select Course"
							onChange={(value) => setMenuData({ ...menuData, course: value })}
						/>
						{menuData.course && (
							<Select
								style={{ width: "100%" }}
								options={semesterOptions}
								value={menuData.semester}
								placeholder="Select Semester"
								onChange={(value) => setMenuData({ ...menuData, semester: value })}
							/>
						)}
					</div>
				</div>
				<Layout>
					<Sider width="25%" className="flex bg-[#27272a]">
						<div className="p-5 flex flex-col w-full gap-10 border-r-2 h-full border-[#393939]">
							{
								responseData
									.filter((item) => item.course === menuData.course && item.semester == menuData.semester)
									.map((item, index) => (
										item.subjects?.map((subject, subIndex) => (
											<div
												key={`${index}-${subIndex}`}
												onClick={() => handleSubjectClick(subject.subjectName)}
												className={`flex justify-between items-center w-full p-3 gap-44 border-b-2 border-[#393939] hover:bg-[#6d28d9] cursor-pointer transition duration-600 ease-in rounded-lg ${active === subject.subjectName ? "bg-[#6d28d9]" : ""
													}`}
											>
												{console.log(subject)}
												<Title style={{ fontSize: "18px", color: "#c1c3c8" }}>{subject.subjectName}</Title>
												<ChevronRight style={{ color: "white" }} />
											</div>
										))
									))
							}
						</div>
					</Sider>
					<Content className="bg-[#27272a]">
						<div className="flex items-center w-full flex-col justify-center px-28">
							<div className="flex justify-between items-center w-full font-bold text-xl mt-10 text-[#c1c3c8]">
								<p>{title}</p>
								<p>Shared By</p>
							</div>
							{filteredData && filteredData.length > 0 ? (
								filteredData.map((item, index) => (
									<div
										key={index}
										className="flex mt-3 mb-3 border w-full h-12 justify-between items-center p-8 rounded-md hover:bg-[#6d28d9] hover:scale-105 transition-transform cursor-pointer duration-600 ease-in"
										onClick={() => window.location.href = item.url}
									>
										<div className="flex justify-center text-lg items-center gap-4 text-[#c1c3c8]">
											<Album /> {item.description}
										</div>
										<div className="text-[#c1c3c8] text-lg font-semibold flex justify-center items-center gap-4">
											<User2 />
											{item.uploadedBy}
										</div>
									</div>
								))
							) : (
								<div className="flex justify-center items-center h-64 text-red-900 font-bold text-xl">
									No Data Found
								</div>
							)}
						</div>
					</Content>
				</Layout>
			</Layout>
		</Flex>
	);
}
