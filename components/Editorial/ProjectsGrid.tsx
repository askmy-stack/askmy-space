"use client";

import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projects } from "@/content/projects";
import { MOTION } from "@/lib/constants";

export default function ProjectsGrid(): JSX.Element {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: MOTION.timing.editorial.reveal / 1000,
        delayChildren: 0,
      },
    },
  };

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      variants={containerVariants}
    >
      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}
    </motion.div>
  );
}
