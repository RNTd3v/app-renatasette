import React from "react";

import AdminCapaMedia from "./Capa";
import AdminListMedias from "./List";

export default function AdminMedias({ medias, workID, path }) {
  return (
    <>
      {/*<AdminCapaMedia capa={medias[0]} workID={workID} />*/}
      <AdminListMedias medias={medias} workID={workID} path={path} />
    </>
  );
}
