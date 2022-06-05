import React, { useState, useContext } from "react";

// Context
import Context from "../../Context/store";

// Components
import Card from "../Card/Card";
import CardForm from "../Card/CardForm";
import ColumnForm from "./ColumnForm";

// Style
import "./style/column-style.css";

// Types
import { ColumnType } from "../../Model";

type Props = {
  column: ColumnType;
};

const Column: React.FC<Props> = ({ column }) => {
  const { removeColumn } = useContext(Context);
  const [showEditForm, setShowEditForm] = useState<boolean>(false);

  return (
    <>
      {showEditForm ? (
        <ColumnForm
          isEdit={true}
          setShowEditForm={setShowEditForm}
          editingColumnInfo={column}
        />
      ) : (
        <div className="single-column">
          <div className="column-header">
            <h4 className="column-name">{column.name}</h4>
            <div>
              <button onClick={() => setShowEditForm(true)}>Edit name</button>
              <button onClick={() => removeColumn(column.id)}>Delete</button>
            </div>
          </div>
          <Card />
          <CardForm />
        </div>
      )}
    </>
  );
};

export default Column;
