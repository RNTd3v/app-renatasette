import withData from "../lib/apollo";
import User from "../components/Users";

export default withData(props => {
  return (
    <div>
      <User />
    </div>
  );
});
