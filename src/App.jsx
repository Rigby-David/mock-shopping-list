import { useState } from "react";
import "./App.css";

function App() {
  //shopping list, CRUD
  //State - Input (name, qty, category), Array of items,
  const [name, setName] = useState("");
  const [qty, setQty] = useState(0);
  const [category, setCategory] = useState("produce");
  const [itemArr, setItemArray] = useState([]);
  const [edit, setEdit] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const itemObj = {
      id: Math.floor(Math.random() * 1000),
      name,
      qty,
      category,
    };
    setItemArray([...itemArr, itemObj]);
    setName("");
    setQty(0);
  }

  function handleDelete(id) {
    const newArr = itemArr.filter((item) => item.id != id);
    setItemArray(newArr);
  }

  //take the item.id of the item clicked, and match it an item.id in the array, update that itemById, and return it and the rest of the items in the array
  function handleEditSubmit(e, id) {
    e.preventDefault();
    const editedArr = itemArr.map((item) => {
      if (item.id === id) {
        return { id, name, qty, category };
      }
      return item;
    });
    setItemArray(editedArr);
    setEdit(false);
  }

  return (
    <>
      <h1>Shopping List</h1>
      <div className="form">
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>
            Name
            <input
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label>
            Quantity
            <input
              value={qty}
              type="number"
              onChange={(e) => setQty(e.target.value)}
            />
          </label>
          <label>
            Category
            <select onChange={(e) => setCategory(e.target.value)}>
              <option value="produce">Produce</option>
              <option value="deli">Deli</option>
              <option value="tools">Tools</option>
              <option value="dairy">Dairy</option>
              <option value="clothes">Clothes</option>
            </select>
          </label>
          <button>Submit</button>
        </form>
      </div>
      <div className="shopping-list">
        {itemArr.map((item, i) => {
          return (
            <div key={item.id + i} className="item">
              <h4>
                {item.qty}
                {item.name}
              </h4>
              <p>{item.category}</p>
              <button onClick={() => handleDelete(item.id)}>Delete</button>
              {!edit ? (
                <button onClick={() => setEdit(true)}>Edit Item</button>
              ) : (
                <button onClick={() => setEdit(false)}>Edit Item</button>
              )}
              {/* if edit, render form, on submit update state */}
              {edit && (
                <div className="form">
                  <form onSubmit={(e) => handleEditSubmit(e, item.id)}>
                    <label>
                      Name
                      <input
                        value={name}
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                      />
                    </label>
                    <label>
                      Quantity
                      <input
                        value={qty}
                        type="number"
                        onChange={(e) => setQty(e.target.value)}
                      />
                    </label>
                    <label>
                      Category
                      <select onChange={(e) => setCategory(e.target.value)}>
                        <option value="produce">Produce</option>
                        <option value="deli">Deli</option>
                        <option value="tools">Tools</option>
                        <option value="dairy">Dairy</option>
                        <option value="clothes">Clothes</option>
                      </select>
                    </label>
                    <button>Submit</button>
                  </form>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}

export default App;
