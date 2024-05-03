import { useState, useEffect, useRef } from "react";
import Image from "next/image";

export default function Drawer({
  children,
  id,
  triggerId,
  location,
  toggleState,
  setToggleState,
  hideCloseButton,
}) {
  const [animateOut, setAnimateOut] = useState(false);
  const didMount = useRef(false);

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true;
      return;
    }

    const content = document.getElementById(id);
    const trigger = document.getElementById(triggerId);

    const trapFocus = (e) => {
      if (content.contains(e.relatedTarget)) return;
      content.focus();
    };

    if (toggleState) {
      content.focus();
      content.addEventListener("focusout", trapFocus);
    } else {
      trigger.focus();
      content.removeEventListener("focusOut", trapFocus);
    }

    if (animateOut === false) return;

    setTimeout(() => {
      setToggleState(false);
      setAnimateOut(false);
    }, 300);
  }, [animateOut, toggleState, id, triggerId, setToggleState]);

  return (
    <div
      className={`drawer drawer--${location} ${
        toggleState ? "drawer--open" : ""
      } ${animateOut ? "drawer--animate-out" : ""}`}
      role="presentation"
      aria-hidden={!toggleState}
    >
      <div className="drawer__content" tabIndex="0" id={id}>
        <div className="drawer__main">{children}</div>
      </div>

      <div
        className="drawer__backdrop"
        onClick={() => setAnimateOut(true)}
      ></div>
    </div>
  );
}
