import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchData,
  createData,
  updateData,
  deleteData,
} from "../../../app/slices/CrudSlice";
import Error from "../../common/Error";

function CrudModalContainer({ endpoint, label, FormComponent, ListComponent }) {
  const dispatch = useDispatch();
  const {
    data,
    fetchLoading,
    createOrUpdateLoading,
    deleteLoading,
    error,
    success,
  } = useSelector((state) => state.crud);

  const [editData, setEditData] = useState(null);
  const [resetSignal, setResetSignal] = useState(false);
  const list = data[endpoint] || [];

  useEffect(() => {
    dispatch(fetchData(endpoint));
  }, [dispatch, endpoint]);

  const handleSubmit = async (formData) => {
    if (editData) {
      await dispatch(
        updateData({ endpoint, id: editData._id, payload: formData })
      ).unwrap();
      setEditData(null);
    } else {
      await dispatch(createData({ endpoint, payload: formData })).unwrap();
      setResetSignal((prev) => !prev);
    }
  };

  const handleDelete = async (id) => {
    await dispatch(deleteData({ endpoint, id })).unwrap();
  };

  return (
    <>
      {(error || success) && <Error error={error || success} />}
      <FormComponent
        onSubmit={handleSubmit}
        editData={editData}
        loading={createOrUpdateLoading}
        label={label}
        resetSignal={resetSignal}
      />
      {fetchLoading ? (
        <p>Loading...</p>
      ) : (
        <ListComponent
          data={list}
          onEdit={setEditData}
          onDelete={handleDelete}
          deleteLoading={deleteLoading}
          label={label}
        />
      )}
    </>
  );
}

export default CrudModalContainer;
