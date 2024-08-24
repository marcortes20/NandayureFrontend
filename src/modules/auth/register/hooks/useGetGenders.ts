import { useQuery } from "@tanstack/react-query";
import { getGenders } from "../server/actions";

const useGetGenders = () => {
  const { data: genders } = useQuery({
    queryFn: async () => await getGenders(),
    queryKey: ["genders"],
});

  return { 
    genders
  }
}

export default useGetGenders;