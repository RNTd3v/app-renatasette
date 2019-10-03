import React from "react";

import AdminCapaMedia from "./Capa";
import AdminListMedias from "./List";

export default function AdminMedias({ medias, workID }) {
  return (
    <>
      <AdminCapaMedia capa={medias[0]} workID={workID} />
      <AdminListMedias medias={medias} workID={workID} />
    </>
  );
}
