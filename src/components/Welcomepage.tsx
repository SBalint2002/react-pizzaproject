import * as React from "react";

export default function Welcomepage() {
  const [id, setId] = React.useState(0);
  const [lastName, setLastName] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [admin, setAdmin] = React.useState("");

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8080/user/data", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization":"Bearer " + token,
          },
        });

        if (res.ok) {
          const json = await res.json();

          const id = json.id;
          setId(id);
          localStorage.setItem("id", id);

          const last_name = json.last_name;
          setLastName(last_name);
          localStorage.setItem("last_name", last_name);

          const first_name = json.first_name;
          setFirstName(first_name);
          localStorage.setItem("first_name", first_name);

          const email = json.email;
          setEmail(email);
          localStorage.setItem("email", email);

          const admin = json.admin;
          setAdmin(admin);
          localStorage.setItem("admin", admin);
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
      <h1>Helló {lastName}!</h1>
      <p>Id: {id}</p>
      <p>First name: {firstName}</p>
      <p>Last name: {lastName}</p>
      <p>Email: {email}</p>
      <p>Admin: {admin}</p>
    </>
  );
}