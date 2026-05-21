export const getFacilities = async () => {
  const res = await fetch("http://localhost:8000/facilities", {
    cache: "no-store",
  });

  const data = await res.json();

  return data;
};
