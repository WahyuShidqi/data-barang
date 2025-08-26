import axios from "axios";
import useSWR from "swr";
import swal from "sweetalert";
import { useState } from "react";
import TambahBarang from "./tambahBarang";

const fetcher = async () => {
  const response = await axios.get("http://localhost:5000/barang");
  return response.data;
};
const DaftarBarang = () => {
  const { data, mutate, error } = useSWR("barang", fetcher);

  // Tambah barang functions and var

  const [newRow, setNewRow] = useState(false); // * Ini untuk tambah row
  const [newItem, setNewItem] = useState({ nama: "", harga: 0, stok: 0 });

  const handleNewData = (field, value) => {
    setNewItem({ ...newItem, [field]: value });
  };

  //* handler untuk button submit
  const handleSubmit = async () => {
    if (!newItem || newItem.nama === "") {
      swal("No data has been added", { icon: "warning" });
      setNewRow(false);
    } else {
      await axios.post("http://localhost:5000/barang", newItem);
      mutate(); //*refresh data dari backend
      setNewRow(false);
      setNewItem({ nama: "", harga: 0, stok: 0 });
    }
  };

  // Edit barang function and variables
  const [editRowId, setEditRowId] = useState(null);
  //* this is for storing temp value while editing
  const [editItem, setEditItem] = useState({
    nama: "",
    harga: 0,
    stok: 0,
  });

  //Untuk ngubah state dari static ke edit dan set data tabel statis ke tabel edit
  const editHandler = (item) => {
    setEditRowId(item.id);
    setEditItem({
      nama: item.nama,
      harga: item.harga,
      stok: item.stok,
    });
  };

  // * need this to update temp value to something else with onChange in input field
  const editChangeHandler = (field, value) => {
    setEditItem({ ...editItem, [field]: value });
  };

  //Untuk handle data yang berubah ke backend
  const editSubmitHandler = async (id) => {
    await axios.put(`http://localhost:5000/barang/${id}`, editItem);
    mutate();
    setEditRowId(null);
  };
  // untuk delete data

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

  if (error) {
    return (
      <div role="status" className="flex justify-center items-center h-[100vh]">
        <h1>Failed to fetch database :(</h1>
      </div>
    );
  }

  if (!data) {
    return (
      <div
        role="status"
        className="flex justify-center items-center flex-col h-[100vh]"
      >
        <div>
          <svg
            aria-hidden="true"
            class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        </div>
        <div className=" text-black font-bold">Loading data...</div>
      </div>
    );
  }

  return (
    <section className="p-4">
      <div className="overflow-x-auto">
        <div className="title-barang w-full bg-orange-500 p-2 flex justify-between">
          <h1 className="font-bold text-2xl text-white">Daftar Stok Barang</h1>
          <button
            type="button"
            onClick={() => setNewRow(true)}
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
            {data.length === 0 ? (
              <tr>
                <td className="font-semibold text-center" colSpan={6}>
                  No data available
                </td>
              </tr>
            ) : (
              data.map((barang, index) => (
                <tr key={barang.id} className="hover:bg-gray-100">
                  <td className="py-2 border-r-2 px-4 border-b text-center">
                    {index + 1}
                  </td>
                  <td className="py-2 border-r-2 px-4 border-b text-center">
                    {barang.id}
                  </td>

                  <td className="py-2 border-r-2 px-4 border-b text-center">
                    {editRowId === barang.id ? (
                      <input
                        type="text"
                        value={editItem.nama}
                        onChange={(e) =>
                          editChangeHandler("nama", e.target.value)
                        }
                        className="w-full px-4 py-2 border-none rounded-md focus:outline-none"
                      />
                    ) : (
                      barang.nama
                    )}
                  </td>
                  <td className="py-2 border-r-2 px-4 border-b text-center">
                    {editRowId === barang.id ? (
                      <input
                        type="number"
                        value={editItem.harga}
                        onChange={(e) =>
                          editChangeHandler("harga", parseInt(e.target.value))
                        }
                        className="w-full px-4 py-2 border-none rounded-md focus:outline-none"
                      />
                    ) : (
                      barang.harga
                    )}
                  </td>
                  <td className="py-2 border-r-2 px-4 border-b text-center">
                    {editRowId === barang.id ? (
                      <input
                        type="number"
                        value={editItem.stok}
                        onChange={(e) =>
                          editChangeHandler("stok", parseInt(e.target.value))
                        }
                        className="w-full px-4 py-2 border-none rounded-md focus:outline-none"
                      />
                    ) : (
                      barang.stok
                    )}
                  </td>
                  <td className="no-print py-2 px-4 border-b text-center">
                    {editRowId === barang.id ? (
                      <button
                        onClick={() => editSubmitHandler(barang.id)}
                        className="bg-green-500 text-white px-2 py-1 rounded mr-1"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => editHandler(barang)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded mr-1"
                      >
                        Edit
                      </button>
                    )}
                    {editRowId === barang.id ? (
                      <button
                        onClick={() => setEditRowId(null)}
                        className="bg-yellow-500 text-white px-2 py-1 rounded mr-1"
                      >
                        Cancel
                      </button>
                    ) : (
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => deleteHandler(barang.id)}
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
            {/* <!-- Add more rows dynamically --> */}
            {newRow && (
              <TambahBarang
                rowNumber={data.length + 1}
                nameValue={newItem.nama}
                nameOnChange={(e) => handleNewData("nama", e.target.value)}
                priceValue={newItem.harga}
                priceOnChange={(e) =>
                  handleNewData("harga", parseInt(e.target.value))
                }
                stockValue={newItem.stok}
                stockOnChange={(e) =>
                  handleNewData("stok", parseInt(e.target.value))
                }
                onCancel={() => {
                  setNewRow(false);
                }}
                onSubmit={() => handleSubmit()}
              />
            )}
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
