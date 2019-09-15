import { useRouter } from "next/router";

const WorkPage = () => {
  const router = useRouter();
  const { workCode } = router.query;

  return <p>Trabalho: {workCode}</p>;
};

export default WorkPage;
