import Spinner from "../../ui/Spinner.jsx";
import {useCabins} from "./useCabins.js";
import Table from "../../ui/Table.jsx";
import CabinRow from "./CabinRow.jsx";

function CabinTable() {
  const {isLoading, cabins} = useCabins();


  if (isLoading) return <Spinner />;

  return (

    <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr">
      <Table.Header>
        <div></div>
        <div>Cabin</div>
        <div>Capacity</div>
        <div>Price</div>
        <div>Discount</div>
        <div></div>
      </Table.Header>
      <Table.Body
        data={cabins}
        render={cabin => <CabinRow key={cabin.id} cabin={cabin} />}
      />
    </Table>
  );
}

export default CabinTable;