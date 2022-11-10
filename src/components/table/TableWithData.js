import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const TableWithData = ({ head, data, linkTo, handleDelete }) => {
  const navigate = useNavigate();
  return (
    <div className="w-full overflow-x-auto shadow-md rounded-lg">
      <table className="w-full text-sm">
        <thead className="bg-purple-200">
          <tr>
            <th>ID</th>
            {head?.length &&
              head.map((item, index) => {
                return (
                  <th className="px-6 py-4" key={index}>
                    {item}
                  </th>
                );
              })}
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.length > 0 &&
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  {Object.values(item)
                    .slice(1, head.length + 1)
                    .map((value, i) => {
                      return (
                        <td key={i}>
                          {typeof value == "boolean" ? (
                            <span>{value ? "Active" : "InActive"}</span>
                          ) : (
                            <div className="text-td">{value}</div>
                          )}
                        </td>
                      );
                    })}
                  <td>
                    <div className="flex flex-row w-full justify-end gap-2 mt-auto">
                      <Button
                        styleClass="bg-secondary"
                        onClick={() => navigate(`${linkTo}${item.id}`)}
                      >
                        <AiOutlineEdit />
                      </Button>
                      <Button onClick={() => handleDelete(item.id)}>
                        <AiOutlineDelete />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default TableWithData;
