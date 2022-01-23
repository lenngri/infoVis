export const ListEntry = (entry) => {
  const obj = entry.entry;
  return (
    <>
      <p>
        {obj.flag}
        {obj.country}
      </p>
      <p>Patents: {obj.patents}</p>
    </>
  );
};
