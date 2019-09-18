import React from "react";
import Link from "next/link";
import "../src/styles/main.scss";

import Head from "next/head";

import Header from "../src/components/Header";
import Footer from "../src/components/Footer";

import ProjectMock from "../src/mocks/projects";

const Projects = () => {
  const projects = ProjectMock;
  return (
    <div>
      <Head>
        <title>Renata Sette - Projects</title>
      </Head>
      <section>
        <Header language="en" pagePT="/projetos" pageEN="/projects" />
        <main className="content project-list">
          <h1 className="title">Projects</h1>
          <div className="list">
            {projects.map((p, i) => (
              <div className="item" key={i}>
                <div className="picture">
                  <img src={p.picture} alt={p.nameEN} />
                </div>
                <div className="text">
                  <h2 className="title">{p.nameEN}</h2>
                  <p className="description">{p.descriptionEN}</p>
                  <Link
                    href="/project/[projectCode]"
                    as={`/project/${p.codeEN}`}
                  >
                    view more
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
        <Footer language="en" />
      </section>
    </div>
  );
};

export default Projects;
