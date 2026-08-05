import dbConnect from "@/lib/db";
import Quotation from "@/models/Quotation";

import "./quotations.css";

export default async function QuotationsPage() {

  await dbConnect();

  const quotations =
    await Quotation.find()
      .sort({ createdAt: -1 })
      .lean();

  return (
    <div className="quotations">

      <h1>Service Requests</h1>

      <div className="quotations-table">

        <table>

          <thead>

            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Email</th>
              <th>Company</th>
              <th>Truck</th>
              <th>Service</th>
              <th>Date</th>
              <th>Address</th>
              <th>Emergency</th>
              <th>Message</th>
            </tr>

          </thead>

          <tbody>

            {quotations.map(
              (item: any) => (

                <tr
                  key={item._id.toString()}
                >

                  <td>{item.name}</td>

                  <td>{item.phone}</td>

                  <td>{item.email}</td>

                  <td>{item.company}</td>

                  <td>
                    {item.truck_make}
                    {" "}
                    {item.truck_model}
                  </td>

                  <td>
                    {item.service_needed}
                  </td>

                  <td>{item.date}</td>

                  <td>{item.address}</td>

                  <td>
                    {item.emergency
                      ? "Yes"
                      : "No"}
                  </td>

                  <td>
                    {item.message}
                  </td>

                </tr>

              )
            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}