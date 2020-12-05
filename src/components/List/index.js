import React, { useRef, useContext } from "react";
import { MdAdd } from "react-icons/md";
import { useDrop } from "react-dnd";

import Card from "../Card";
import BoardContext from "../Board/context";

import { Container } from "./styles";

export default function List({ data, index: listIndex }) {
  const ref = useRef();
  const { move } = useContext(BoardContext);

  const [, dropRef] = useDrop({
    accept: "CARD",
    drop(monitor) {
      const originalListIndex = monitor.listIndex;
      const latestPosition = data.cards.length;
      const originalCardIndex = monitor.index;

      move(originalListIndex, listIndex, originalCardIndex, latestPosition - 1);
    }
  });

  dropRef(ref);

  return (
    <>
      <Container done={data.done} ref={ref}>
        <header>
          <h2>{data.title}</h2>
          {data.creatable && (
            <button type="button">
              <MdAdd size={24} color="#FFF" />
            </button>
          )}
        </header>
        <ul>
          {data.cards.map((card, index) => (
            <Card
              key={card.id}
              index={index}
              data={card}
              listIndex={listIndex}
            />
          ))}
        </ul>
      </Container>
    </>
  );
}
