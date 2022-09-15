import React, { useEffect, useRef, useState } from "react";
import "./Dropdown.scss";
// import { useField } from 'formik';

const Dropdown = (props) => {
  const [items, setItems] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showList, setShowList] = useState(false);
  const containerRef = useRef();
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    if (props) {
      let itemsValue = props.items.map((i) => {
        if (i.id !== props.defaultVal) {
          return { ...i, isSelected: false };
        } else {
          setSelectedItem({ ...i, isSelected: true });
          return { ...i, isSelected: true };
        }
      });
      setItems(itemsValue);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [props.items]);

  useEffect(()=>{
    if(props.autocomplete){
      if( props.showDropdown){
        setShowList(true)
      }
      else{
        setShowList(false)
      }
    }
  },[props.showDropdown])

  const handleSelectChange = (item) => {
    const itemValues = items.map((i) =>
      i.id === item.id
        ? { ...i, isSelected: true }
        : { ...i, isSelected: false }
    );
    setItems(itemValues);
    setSelectedItem({ ...item, isSelected: true });
    // console.log(item.id)
    props.change(item.id);
  };

  const handleClickOutside = (event) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setShowList(false);
      if(props.handleClickOutside){
        console.log("handleing outside click in ")
        props.handleClickOutside()
      }
    }
  };

  const findStyles = () => {
    if (selectedItem && props.color && props.background) {
      for (let i = 0; i < items.length; i++) {
        if (items[i].name === selectedItem.name) {
          return {
            background: props.background[i],
            color: props.color[i],
          };
        }
      }
    }
    return {};
  };

  return (
    <div
      ref={containerRef}
      className={
        (showList ? "custom-dd active " : " custom-dd ") +
        (props.disabled ? " not-allowed " : "") +
        props.className
      }
      style={props.autocomplete?{height:"auto"}:{}}
    >
      <div className={`dd-title ${props.autocomplete? "hide": ""}`}>{props.title}</div>
      <div
        className="dd-list-wrapper"
        onBlur={() => (showList ? setShowList(false) : null)}
        onClick={() => {
          if (!props.disabled) {
            setShowList((prev) => !prev);
          }
        }}
        style={props.autocomplete?{height:"auto"}:{}}
      >
        <div className={`${items && items.length > 1 ? "dd-selected":"dd-one-item"} ${props.autocomplete? "hide": ""}`} style={findStyles()}>
          {selectedItem && selectedItem.name}
        </div>
        {(items?.length > 1) &&
        <div className={`dd-list ${showList ? "show" : "hide"}`} style={props.autocomplete?{height:"auto", top:"-20px"}:{}}>
          {items &&
            items.map((i, ind) => {
              return (
                <div
                  key={i.id}
                  onClick={() => handleSelectChange(i)}
                  className={`item ${i.isSelected ? "itemSelected" : null}`}
                  style={props.color ? { color: props.color[ind] } : {}}
                >
                  {i.name}
                </div>
              );
            })}
        </div>}
      </div>
    </div>
  );
};

export default Dropdown;
