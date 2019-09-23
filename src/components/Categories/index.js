import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Category from "../Category";

import Loading from "../Loading";

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
          <section key={i} className="category">
            {language === "en" ? (
              <Category
                language="en"
                categoryID={c.id}
                categoryNameEN={c.nameEN}
                categoryCodeEN={c.codeEN}
              />
            ) : (
              <Category
                language="pt"
                categoryID={c.id}
                categoryNamePT={c.namePT}
                categoryCodePT={c.codePT}
              />
            )}
          </section>
        ))}
      </>
    );
  }
  return <Loading />;
}

export default Categories;
