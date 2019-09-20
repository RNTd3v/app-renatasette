import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Category from "../Category";

const GET_CATEGORIES = gql`
  query {
    categories {
      namePT
      nameEN
      codePT
      codeEN
      id
    }
  }
`;

function Categories({ language }) {
  const { loading, error, data, fetchMore } = useQuery(GET_CATEGORIES);
  if (data && data.categories) {
    return (
      <>
        {data.categories.map((c, i) => (
          <span key={i}>
            {language === "en" ? (
              <Category
                name={c.nameEN}
                id={c.id}
                language="en"
                code={c.codeEN}
              />
            ) : (
              <Category
                name={c.namePT}
                id={c.id}
                language="pt"
                code={c.codePT}
              />
            )}
          </span>
        ))}
      </>
    );
  }
  return <div>Loading...</div>;
}

export default Categories;
