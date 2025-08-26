const TambahBarang = ({
  rowNumber,
  onCancel,
  nameValue,
  nameOnChange,
  priceValue,
  priceOnChange,
  stockValue,
  stockOnChange,
  onSubmit,
}) => {
  return (
    <tr className="hover:bg-gray-100 border-2">
      <td className="py-2 border-r-2 px-4 border-b text-center">{rowNumber}</td>
      <td className="py-2 border-r-2 px-4 border-b text-center">Auto</td>
      <td className="py-2 border-r-2 px-4 border-b text-center">
        <input
          type="text"
          value={nameValue}
          onChange={nameOnChange}
          placeholder="Enter new item name"
          className="w-full px-4 py-2 border-none rounded-md focus:outline-none"
        />
      </td>
      <td className="py-2 border-r-2 px-4 border-b text-center">
        <input
          type="number"
          value={priceValue}
          onChange={priceOnChange}
          placeholder="Enter new price"
          className="w-full px-4 py-2 border-none rounded-md focus:outline-none"
        />
      </td>
      <td className="py-2 border-r-2 px-4 border-b text-center">
        <input
          type="number"
          value={stockValue}
          onChange={stockOnChange}
          placeholder="Enter remaining stock"
          className="w-full px-4 py-2 border-none rounded-md focus:outline-none"
        />
      </td>
      <td className="no-print py-2 px-4 border-b text-center">
        <button
          className="bg-yellow-500 text-white px-2 py-1 rounded mr-1"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          className="bg-red-500 text-white px-2 py-1 rounded"
          onClick={onSubmit}
        >
          Submit
        </button>
      </td>
    </tr>
  );
};

export default TambahBarang;
