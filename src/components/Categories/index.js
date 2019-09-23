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

function Categories({ language, isMobile }) {
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
                isMobile={isMobile}
              />
            ) : (
              <Category
                language="pt"
                categoryID={c.id}
                categoryNamePT={c.namePT}
                categoryCodePT={c.codePT}
                isMobile={isMobile}
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
