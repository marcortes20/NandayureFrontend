async function getGenders(){
    const options = {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      };
      const response = fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/genders`,
        options
      )
        .then((response) => response.json())
        .catch((err) => console.error(err));
    
      return response;
    }
    
    export default async function getGendersData() {
      const data = await getGenders();
      return data;
}

