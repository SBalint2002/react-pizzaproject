import * as React from "react";
import { authFetch } from "../Util";

export default function Welcomepage() {
  const [id, setId] = React.useState(0);
  const [lastName, setLastName] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [admin, setAdmin] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await authFetch('http://localhost:8080/user/data', {
          method: 'GET'
        });

        //Amikor visszakapok egy dzsészönt
        /* const json = await res.json();
        json.maikaja; */

        if (res.ok) {
          const json = await res.json();

          const id = json.id;
          setId(id);

          const last_name = json.last_name;
          setLastName(last_name);

          const first_name = json.first_name;
          setFirstName(first_name);

          const email = json.email;
          setEmail(email);

          const admin = json.admin;
          setAdmin(admin);
          if(admin){
            setAdmin("true")
          }else{
            setAdmin("false")
          }

        } else {
          console.log("Invalid token")
        }
      } catch (error) {
        console.log("Sikertelen lekérés")
        console.log(error);
      }
    };

    fetchData();
  });

  return (
      <>
        <div style={{marginTop:"40px"}}></div>
        <h1>Helló {lastName} {firstName}!</h1>
        <p>Id: {id}</p>
        <p>First name: {firstName}</p>
        <p>Last name: {lastName}</p>
        <p>Email: {email}</p>
        <p>Admin: {admin}</p>
      </>
  );
}