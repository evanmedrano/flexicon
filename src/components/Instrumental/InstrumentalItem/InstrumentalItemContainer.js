import React, { useEffect, useRef } from "react";

import InstrumentalItem from "./InstrumentalItem";

function InstrumentalItemContainer(props) {
  const {
    activeClass,
    handleInstrumentalPause,
    handleInstrumentalSelect,
    handleQueueAdd,
    handleQueueRemove,
    instrumental,
    playing,
    queueText
  } = props;

  const dropdownNode = useRef();
  const rowNode = useRef();
  const baseClass = "instrumental-item";

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, []);

  const handleClick = event => {
    const dropdown = dropdownNode.current;
    const row = rowNode.current;

    if (dropdown.contains(event.target)) {
      return;
    }

    if (!dropdown.classList.contains("d-none") && !row.contains(event.target)) {
      dropdown.classList.add("d-none");
    }

    row.classList.remove("no-hover");
    row.classList.remove(`${baseClass}__selected`);
  };

  const handleDropdownToggle = event => {
    dropdownNode.current.classList.toggle("d-none");
    handleHoverOnRows();
  };

  const handleHoverOnRows = () => {
    const instrumentalRows = document.querySelectorAll(`.${baseClass}__row`);

    if (!dropdownNode.current.classList.contains("d-none")) {
      instrumentalRows.forEach(instrumentalRow => {
        if (!instrumentalRow.contains(dropdownNode.current)) {
          instrumentalRow.classList.add("no-hover");
        }
      });
    }
  };

  const handleQueue = () => {
    if (queueText === "Remove from queue") {
      handleQueueRemove(instrumental);
    } else {
      handleQueueAdd(instrumental);
    }
  };

  const addSelectedClass = () => {
    rowNode.current.classList.toggle(`${baseClass}__selected`);
  };

  return (
    <InstrumentalItem
      addSelectedClass={addSelectedClass}
      baseClass={baseClass}
      activeClass={activeClass}
      dropdownNode={dropdownNode}
      handleDropdownToggle={handleDropdownToggle}
      handleInstrumentalPause={handleInstrumentalPause}
      handleInstrumentalSelect={handleInstrumentalSelect}
      handleQueue={handleQueue}
      instrumental={instrumental}
      playing={playing}
      rowNode={rowNode}
      queueText={queueText}
    />
  );
}

export default InstrumentalItemContainer;
