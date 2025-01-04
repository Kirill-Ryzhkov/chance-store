import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDeleteProductMutation, useDeleteFieldMutation, apiSlice } from '../../../services/redux/apiSlice';

export default function Main({ name }) {
  const [itemsList, setItemsList] = useState([]);
  const [itemsFieldNames, setItemsFieldNames] = useState([]);
  const [fieldsList, setFieldsList] = useState([]);
  const [fieldsName, setFieldsName] = useState([]);

  const [deleteProduct] = useDeleteProductMutation();
  const [deleteField] = useDeleteFieldMutation();

  const { data: allStoreData, isLoading, isError } = useSelector(
    apiSlice.endpoints.getAllStore.select()
  );

  useEffect(() => {
    if (allStoreData) {
      const items = allStoreData.store?.filter((item) => item.type === name) || [];
      
      let fields = [];
      if (name === "cafe") {
        fields = allStoreData.storeCafeFields || [];
      } else if (name === "merch") {
        fields = allStoreData.storeMerchFields || [];
      }

      setItemsList(items);
      setFieldsList(fields);

      if (items.length > 0) {
        const excludedFields = ['_id', 'createdAt', '__v', 'image', 'updatedAt'];
        setItemsFieldNames(
          Object.keys(items[0]).filter(key => !excludedFields.includes(key))
        );
      } else {
        setItemsFieldNames([]);
      }

      if (fields.length > 0) {
        const excludedFields = ['_id', 'createdAt', '__v', 'image', 'updatedAt'];
        setFieldsName(
          Object.keys(fields[0]).filter(key => !excludedFields.includes(key))
        );
      } else {
        setFieldsName([]);
      }
    }
  }, [allStoreData, name]);

  const handleDeleteItem = async (id) => {
    try {
      await deleteProduct({ id }).unwrap();
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleDeleteField = async (id) => {
    try {
      await deleteField({ id }).unwrap();
    } catch (error) {
      console.error('Error deleting field:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading data</div>;

  return (
    <div className="regular-not-bold-font">
      <h1 className="text-4xl mb-4">{name}</h1>

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-3xl">Products:</h2>
        <Link to={`/admin/create/product`}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            + New
          </button>
        </Link>
      </div>

      {itemsFieldNames.length > 0 && itemsList.length > 0 && (
        <div className="mb-8">
          <table className="min-w-full border border-collapse">
            <thead>
              <tr className="border-b">
                {itemsFieldNames.map((item) => (
                  <th key={item} className="px-4 py-2 text-left border-b">{item}</th>
                ))}
                <th className="px-4 py-2 text-left border-b">Edit</th>
                <th className="px-4 py-2 text-left border-b">Delete</th>
              </tr>
            </thead>
            <tbody>
              {itemsList.map((item) => (
                <tr key={item._id} className="border-b hover:bg-backgroundDiff hover:text-colorSecond">
                  {itemsFieldNames.map((fieldName) => (
                    <td key={fieldName} className="px-4 py-2 border-b">
                      {fieldName === 'price' ? `$${item[fieldName]?.toFixed(2)}` : item[fieldName]}
                    </td>
                  ))}
                  <td className="px-4 py-2 border-b">
                    <Link to={`/admin/edit/product/${item.slug}`} className="text-blue-500 hover:underline">
                      Edit
                    </Link>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <button 
                      onClick={() => handleDeleteItem(item._id)} 
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-3xl">Fields:</h2>
          <Link to={`/admin/create/field`}>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              + New
            </button>
          </Link>
        </div>

        {fieldsName.length > 0 && fieldsList.length > 0 && (
          <table className="min-w-full border border-collapse">
            <thead>
              <tr className="border-b">
                {fieldsName.map((item) => (
                  <th key={item} className="px-4 py-2 text-left border-b">{item}</th>
                ))}
                <th className="px-4 py-2 text-left border-b">Edit</th>
                <th className="px-4 py-2 text-left border-b">Delete</th>
              </tr>
            </thead>
            <tbody>
              {fieldsList.map((field) => (
                <tr key={field._id} className="border-b hover:bg-backgroundDiff hover:text-colorSecond">
                  {fieldsName.map((fieldName) => (
                    <td key={fieldName} className="px-4 py-2 border-b">
                      {Array.isArray(field[fieldName]) ? field[fieldName].join(', ') : field[fieldName]}
                    </td>
                  ))}
                  <td className="px-4 py-2 border-b">
                    <Link to={`/admin/edit/field/${field.field_name}`} className="text-blue-500 hover:underline">
                      Edit
                    </Link>
                  </td>
                  <td className="px-4 py-2 border-b">
                    <button 
                      onClick={() => handleDeleteField(field._id)} 
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}