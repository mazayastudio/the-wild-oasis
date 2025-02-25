import styled from "styled-components";
import {formatCurrency} from "../../utils/helpers.js";
import {useState} from "react";
import CreateCabinForm from "./CreateCabinForm.jsx";
import {useDeleteCabin} from "./useDeleteCabin.js";
import Table from "../../ui/Table.jsx";
import {HiSquare2Stack} from "react-icons/hi2";
import {HiPencil, HiTrash} from "react-icons/hi";
import {useCreateCabin} from "./useCreateCabin.js";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({cabin}) {
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description
  } = cabin;
  const [show, setShow] = useState(false);
  const {isDeleting, deleteCabin} = useDeleteCabin();
  const {isCreating, createCabin} = useCreateCabin();

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description
    });
  }

  return (
    <>
      <Table.Row>
        <Img src={image} alt={name} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount > 0
          ? <Discount>{formatCurrency(discount)}</Discount>
          : <span>&mdash;</span>}
        <div>
          <button disabled={isCreating} onClick={handleDuplicate}>
            <HiSquare2Stack />
          </button>
          <button onClick={() => setShow(show => !show)}><HiPencil /></button>
          <button
            onClick={() => deleteCabin(cabinId)}
            disabled={isDeleting}
          >
            <HiTrash />
          </button>
        </div>
      </Table.Row>
      {show && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}

export default CabinRow;