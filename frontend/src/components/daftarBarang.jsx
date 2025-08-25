import axios from "axios";
import useSWR from "swr";
import swal from "sweetalert";

const fetcher = async () => {
  const response = await axios.get("http://localhost:5000/barang");
  return response.data;
};
const DaftarBarang = () => {
  const { data, mutate } = useSWR("barang", fetcher);

  if (!data) {
    return (
      <div type="button" className="bg-indigo-500 ...">
        <svg className="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24"></svg>
        Processing…
      </div>
    );
  }

  const deleteHandler = async (id) => {
    const willDelete = await swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this data!",
      icon: "warning",
      buttons: ["Cancel", "I'm sure!"],
      dangerMode: true,
    });

    if (willDelete) {
      await axios.delete(`http://localhost:5000/barang/${id}`);
      swal("Data has been deleted!", { icon: "success" });
      mutate(); // this is to refresh data after operation
    } else {
      swal("Data is not deleted!", { icon: "error" });
    }
  };

  return (
    <section className="p-4">
      <div className="overflow-x-auto">
        <div className="title-barang w-full bg-orange-500 p-2 flex justify-between">
          <h1 className="font-bold text-2xl text-white">Daftar Stok Barang</h1>
          <button
            type="button"
            className="no-print focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            Tambah Barang
          </button>
        </div>
        <table className="min-w-full border border-gray-300">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-2 px-4 border-b">No</th>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Nama</th>
              <th className="py-2 px-4 border-b">Harga</th>
              <th className="py-2 px-4 border-b">Stok</th>
              <th className="no-print py-2 px-4 border-b">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.map((barang, index) => (
              <tr key={barang.id} className="hover:bg-gray-100">
                <td className="py-2 border-r-2 px-4 border-b text-center">
                  {index + 1}
                </td>
                <td className="py-2 border-r-2 px-4 border-b text-center">
                  {barang.id}
                </td>
                <td className="py-2 border-r-2 px-4 border-b text-center">
                  {barang.nama}
                </td>
                <td className="py-2 border-r-2 px-4 border-b text-center">
                  {barang.harga}
                </td>
                <td className="py-2 border-r-2 px-4 border-b text-center">
                  {barang.stok}
                </td>
                <td className="no-print py-2 px-4 border-b text-center">
                  <button className="bg-yellow-500 text-white px-2 py-1 rounded mr-1">
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => deleteHandler(barang.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {/* <!-- Add more rows dynamically --> */}
          </tbody>
        </table>
      </div>
      <div className="w-full flex justify-end mt-4 mr-4">
        <button
          className="no-print focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
          onClick={() => window.print()}
        >
          Print page
        </button>
      </div>
    </section>
  );
};

export default DaftarBarang;
