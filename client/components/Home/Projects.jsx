// "use client";

// import React, { useState } from "react";
// import Image from "next/image";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { projects } from "@/constants/projectsData";
// import { Fade, Slide } from "react-awesome-reveal";
// import { useRouter } from 'next/navigation';

// const Projects = () => {
//   const [selectedProject, setSelectedProject] = useState(null);
//   const router = useRouter();  

//   const displayedProjects = projects.slice(0, 6); 

//   const handleProjectClick = (project) => {
//     setSelectedProject(project);
//   };

//   const handleViewAllProjects = () => {
//     router.push('/projects'); 
//   };

//   return (
//     <section className="py-8 md:py-16 bg-slate-900 text-gray-100 relative">
//       <div className="absolute -top-2 -left-2 rotate-90">
//         <Image
//           src={"/assets/sqaure-shape.png"}
//           alt="shape"
//           width={200}
//           height={200}
//         />
//       </div>
//       <div className="absolute z-0 -bottom-2 right-4 -rotate-90">
//         <Image
//           src={"/assets/sqaure-shape.png"}
//           alt="shape"
//           width={200}
//           height={200}
//         />
//       </div>
//       <div className="container mx-auto px-4">
//         <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-main">
//           <Fade triggerOnce>Our Projects</Fade>
//         </h2>
//         <Fade triggerOnce cascade damping={0.1}>
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
//             {displayedProjects.map((project, index) => (
//               <Slide
//                 direction="up"
//                 triggerOnce
//                 key={project.id}
//                 delay={index * 100}
//               >
//                 <div
//                   className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
//                   onClick={() => handleProjectClick(project)}
//                 >
//                   <div className="relative h-48 sm:h-56 md:h-64">
//                     <figure className="imageSHineEffect">
//                       <Image
//                         src={project.image}
//                         alt={project.title}
//                         width={500}
//                         height={500}
//                         className="w-full h-48 sm:h-56 md:h-64 object-cover rounded-t-lg"
//                       />
//                     </figure>
//                   </div>
//                   <div className="p-4">
//                     <h3 className="text-base md:text-lg font-semibold text-main line-clamp-1">
//                       {project.title}
//                     </h3>
//                   </div>
//                 </div>
//               </Slide>
//             ))}
//           </div>
//         </Fade>
//         <div className="mt-8 text-center">
//           <Button
//             onClick={handleViewAllProjects}
//             className="w-full sm:w-auto bg-main hover:bg-mainHover text-white hover:text-white"
//           >
//             View All Projects
//           </Button>
//         </div>
//       </div>
//       <Dialog
//         open={!!selectedProject}
//         onOpenChange={() => setSelectedProject(null)}
//       >
//         <DialogContent className="sm:max-w-[425px] bg-white md:max-w-[600px] lg:max-w-[800px]">
//           <DialogHeader>
//             <DialogTitle className="text-main">
//               {selectedProject?.title}
//             </DialogTitle>
//           </DialogHeader>
//           {selectedProject && (
//             <div className="relative h-48 sm:h-64 md:h-80 lg:h-96">
//               <Image
//                 src={selectedProject.image}
//                 alt={selectedProject.title}
//                 layout="fill"
//                 objectFit="cover"
//                 className="rounded-lg object-cover"
//               />
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </section>
//   );
// };

// export default Projects;
