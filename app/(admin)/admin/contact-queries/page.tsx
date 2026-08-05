import dbConnect from "@/lib/db";
import Contact from "@/models/Contact";

import "./contactqueries.css";

export default async function ContactQueriesPage() {

  await dbConnect();

  const contacts = await Contact.find()
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="contactqueries">

      <h1>Contact Queries</h1>

      <div className="contactqueries-table">

        <table>

          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Subject</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>

            {contacts.map((item: any) => (

              <tr key={item._id.toString()}>

                <td>{item.name}</td>

                <td>{item.email}</td>

                <td>{item.phone}</td>

                <td>{item.subject}</td>

                <td>{item.message}</td>

                <td>
                  {new Date(
                    item.createdAt
                  ).toLocaleDateString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}