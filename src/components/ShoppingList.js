import React, { useState } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList({ items, setItems }) {
  const [filter, setFilter] = useState({
    category: "All",
    search: "",
  });

  function handleFilterChange(filterType, value) {
    setFilter((prevFilter) => ({
      ...prevFilter,
      [filterType]: value,
    }));
  }

  function handleItemFormSubmit(newItem) {
    setItems((prevItems) => [...prevItems, newItem]);
  }

  const filteredItems = items.filter((item) => {
    const categoryFilter =
      filter.category === "All" || item.category === filter.category;
    const searchFilter = item.name
      .toLowerCase()
      .includes(filter.search.toLowerCase());
    return categoryFilter && searchFilter;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={handleItemFormSubmit} />
      <Filter
        onCategoryChange={(category) =>
          handleFilterChange("category", category)
        }
        onSearchChange={(search) => handleFilterChange("search", search)}
      />
      <ul className="Items">
        {filteredItems.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
