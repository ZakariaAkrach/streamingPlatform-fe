import { useState } from "react";
import "./paginationControl.scss";

export default function PaginationControl({actualPage, setActualPage, loopStart, setLoopStart}) {
  const [maxDataSize, setMaxDataSize] = useState(20);
  const loopLength = 3;

  function handleValuePagination(value) {
    if (value >= 1 && value <= maxDataSize) {
      setLoopStart(value)
      setActualPage(value);
    }
  }

  function handleReturnBackByOne() {
    if (loopStart > 1) {
      setActualPage(prev => prev - 1)
      setLoopStart(prev => prev - 1);
    }
  }

  function handleReturnBeginning() {
    setLoopStart(1);
    setActualPage(1);
  }

  function handleForwardByOne() {
    if (loopStart + loopLength - 1 < maxDataSize) {
      setActualPage(prev => prev +1)
      setLoopStart(prev => prev + 1);
    }
  }

  function handleForwardEnd() {
    const newStart = Math.max(maxDataSize - loopLength + 1, 1);
    setLoopStart(newStart);
    setActualPage(maxDataSize);
  }

  function paginationNumber() {
    if (maxDataSize === 0) {
      return <h3>N/A</h3>;
    }

    const html = [];

    html.push(
      <div
        onClick={handleReturnBeginning}
        className="pagination-control-number"
        key="returnBeginning"
      >
        <i className="fa-solid fa-backward"></i>
      </div>
    );

    html.push(
      <div
        onClick={handleReturnBackByOne}
        className="pagination-control-number"
        key="returnByOne"
      >
        <i className="fa-solid fa-arrow-left"></i>
      </div>
    );

    for (let i = loopStart; i < loopStart + loopLength && i <= maxDataSize; i++) {
      html.push(
        <div
          id={i}
          onClick={() => handleValuePagination(i)}
          className="pagination-control-number"
          key={i}
          style={{ backgroundColor: actualPage === i ? "#1e90ff" : "", color: actualPage === i ? "white" : "" }}
        >
          {i}
        </div>
      );
    }

    html.push(
      <div
        onClick={handleForwardByOne}
        className="pagination-control-number"
        key="forwardByOne"
      >
        <i className="fa-solid fa-arrow-right"></i>
      </div>
    );

    html.push(
      <div
        onClick={handleForwardEnd}
        className="pagination-control-number"
        key="forwardEnd"
      >
        <i className="fa-solid fa-forward"></i>
      </div>
    );

    return html;
  }

  return <div className="pagination-controls">{paginationNumber()}</div>;
}
