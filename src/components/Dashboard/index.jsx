import { useEffect } from "react";
import project_pic from "../../assets/projectpic.png";
import Card1 from "../MenuCards/Card1";

export default function HomeDashboard() {
    const handleMouseMove = (event) => {
        const image = document.querySelector(".project-image");
        const { clientX: mouseX, clientY: mouseY } = event;
        const { innerWidth: windowWidth, innerHeight: windowHeight } = window;

        const moveX = (mouseX / windowWidth) * 30 - 20;
        const moveY = (mouseY / windowHeight) * 50 - 10;

        if (image) {
            image.style.transform = `translate(${moveX}px, ${moveY}px)`;
        }
    };

    useEffect(() => {
        const image = document.querySelector(".project-image");
        if (image) {
            image.style.transition = "transform 0.1s ease-out";
        }

        return () => {
            if (image) {
                image.style.transform = "translate(0, 0)";
            }
        };
    }, []);

    return (
        <div className="w-full min-h-screen px-4 md:px-6 lg:px-8 py-6 overflow-hidden bg-[#27272a]">
            <div className="flex flex-col lg:flex-row-reverse gap-8 lg:gap-12 text-gray-300">
                {/* Right section (image) - now first on mobile, second on large screens */}
                <div className="w-full lg:w-1/2 flex justify-center items-center order-1 lg:order-2">
                    <div className="relative h-[300px] p-6 md:h-[400px] lg:h-[500px] w-full overflow-hidden flex justify-center items-center">
                        <img
                            src={project_pic}
                            className="project-image object-contain w-auto h-auto max-h-full max-w-full transition-transform duration-100 ease-out"
                            alt="Project"
                            onMouseEnter={(e) => {
                                const image = e.currentTarget;
                                image.style.transition =
                                    "transform 0.1s ease-out";
                            }}
                            onMouseMove={handleMouseMove}
                            onMouseLeave={(e) => {
                                const image = e.currentTarget;
                                image.style.transform = "translate(0, 0)";
                            }}
                        />
                    </div>
                </div>

                {/* Left section (content) - now second on mobile, first on large screens */}
                <div className="w-full lg:w-1/2 space-y-6 order-2 lg:order-1">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 lg:mb-12">
                        Edubuddy
                    </h1>
                    <p className="text-base md:text-lg lg:text-lg leading-relaxed">
                        Unlock your full academic potential with Edubuddy, a
                        one-stop platform designed to make studying smarter, not
                        harder. Whether you are gearing up for exams or looking
                        to stay on top of your coursework, Edubuddy has you
                        covered.
                    </p>
                    <div className="mt-8 lg:mt-10 flex flex-wrap gap-4">
                        <Card1 />
                    </div>
                </div>
            </div>
        </div>
    );
}
