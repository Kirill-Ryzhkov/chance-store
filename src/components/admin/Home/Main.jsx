import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDeleteProductMutation, useDeleteFieldMutation } from '../../../services/redux/apiSlice';

export default function Main({ name, items, fields }) {
  const [itemsList, setItemsList] = useState(items || []);
  const [itemsFieldNames, setItemsFieldNames] = useState([]);

  const [fieldsList, setFieldsList] = useState(fields || []);
  const [fieldsName, setFieldsName] = useState([]);

  const [deleteProduct] = useDeleteProductMutation();
  const [deleteField] = useDeleteFieldMutation();

  useEffect(() => {
    if (items && items.length > 0) {
      setItemsList(items);
      setItemsFieldNames(
        Object.keys(items[0]).filter(
          (item) => item !== '_id' && item !== 'createdAt' && item !== '__v' && item !== 'image'
        )
      );
    }
  }, [items]);

  useEffect(() => {
    if (fields && fields.length > 0) {
      setFieldsList(fields);
      setFieldsName(
        Object.keys(fields[0]).filter(
          (item) => item !== '_id' && item !== 'createdAt' && item !== '__v' && item !== 'image'
        )
      );
    }
  }, [fields]);

  const handleDeleteItem = async (id) => {
    try {
      await deleteProduct({ id }).unwrap();
      setItemsList((prevItems) => prevItems.filter((item) => item._id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  const handleDeleteField = async (id) => {
    try {
      await deleteField({ id }).unwrap();
      setFieldsList((prevFields) => prevFields.filter((field) => field._id !== id));
    } catch (error) {
      console.error('Error deleting field:', error);
    }
  };

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

      {itemsFieldNames && itemsList.length > 0 && (
        <table className="min-w-full border border-collapse">
          <thead>
            <tr className="border-b">
              {itemsFieldNames.map((item, index) => (
                <th key={index} className="px-4 py-2 text-left border-b">{item}</th>
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
                    {fieldName === 'price' ? `$${item[fieldName].toFixed(2)}` : item[fieldName]}
                  </td>
                ))}
                <td className="px-4 py-2 border-b">
                  <Link to={`/admin/edit/product/${item.slug}`} className="text-blue-500 hover:underline">
                    Edit
                  </Link>
                </td>
                <td className="px-4 py-2 border-b">
                  <button onClick={() => handleDeleteItem(item._id)} className="text-red-500 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="flex justify-between items-center mt-4 mb-4">
        <h2 className="text-3xl">Fields:</h2>
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          + New
        </button>
      </div>

      {fieldsName && fieldsList.length > 0 && (
        <table className="min-w-full border border-collapse">
          <thead>
            <tr className="border-b">
              {fieldsName.map((item, index) => (
                <th key={index} className="px-4 py-2 text-left border-b">{item}</th>
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
                  <button className="text-blue-500 hover:underline">Edit</button>
                </td>
                <td className="px-4 py-2 border-b">
                  <button onClick={() => handleDeleteField(field._id)} className="text-red-500 hover:underline">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}