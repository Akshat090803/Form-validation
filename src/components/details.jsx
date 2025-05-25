import { Link, useLocation, useOutletContext } from "react-router-dom";

function DetailsPage() {
  //accessing the data through useLocation hook
  //   const location = useLocation();
  //   console.log(location)
  //  const { details } = location.state || {};

  const { details } = useOutletContext();
  console.log(JSON.stringify(details));

  const arrDetails = Object.entries(details);

  if(arrDetails.length===0){
    return(
       <>
       <h1>Details</h1>
       <div className="no-info">
        <h2>⚠️ No Details Found</h2>
        <p>
          You must fill out the form first before viewing the details. <Link to={'/'}>Go back to the form</Link> to enter your information.
        </p>
       </div>
       </>
    )
  }
  return (
    <>
      <h1>Details</h1>
      <table className="details-table">
        <tbody>
          {arrDetails &&
            arrDetails.map((item, index) => {
              const [label, value] = item;
              return (
                <tr key={index}>
                  <td >{label}</td>
                  <td>{index === 4 ? "*".repeat(value.length) : value}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
}

export default DetailsPage;
