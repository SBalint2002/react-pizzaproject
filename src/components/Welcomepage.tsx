import * as React from "react";
import UserProfile from "./UserProfile";

export default function Welcomepage() {
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:8080/user/data", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization":"Bearer " + UserProfile.getToken(),
          },
        });

        if (res.ok) {
          const json = await res.json();
          UserProfile.setId(json.id);
          UserProfile.setLastName(json.last_name);
          UserProfile.setFirstName(json.first_name);
          UserProfile.setEmail(json.email);
          UserProfile.setPassword(json.password);
          UserProfile.setAdmin(json.admin);
        } else {
          console.log(UserProfile.getToken())
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
      <h1>Helló {UserProfile.getLastName()}!</h1>
    </>
  );
}