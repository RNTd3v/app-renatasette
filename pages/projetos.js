import React from "react";
import Link from "next/link";
import "../src/styles/main.scss";

import Head from "next/head";

import Header from "../src/components/Header";
import Footer from "../src/components/Footer";

import ProjectMock from "../src/mocks/projects";

const Projetos = () => {
  const projects = ProjectMock;
  return (
    <div>
      <Head>
        <title>Renata Sette - Projetos</title>
      </Head>
      <section>
        <Header language="pt" pagePT="/projetos" pageEN="/projects" />
        <main className="content project-list">
          <h1 className="title">Projetos</h1>
          <div className="list">
            {projects.map((p, i) => (
              <div className="item" key={i}>
                <div className="picture">
                  <img src={p.picture} alt={p.namePT} />
                </div>
                <div className="text">
                  <h2 className="title">{p.namePT}</h2>
                  <p className="description">{p.descriptionPT}</p>
                  <Link
                    href="/project/[projectCode]"
                    as={`/project/${p.codePT}`}
                  >
                    ver mais
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
        <Footer language="pt" />
      </section>
    </div>
  );
};

export default Projetos;
