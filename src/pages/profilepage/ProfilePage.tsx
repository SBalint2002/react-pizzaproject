import * as React from "react";
import { authFetch } from "../../Util";
import "./ProfilePage.css";
import { useEffect, useState } from "react";
import {useUser} from "../../components/userContext/UserContextProvider";

export default function ProfilePage() {
    const [id, setId] = useState(0);
    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");
    const [message,setMessage] = useState("")
    const { user, logOut } = useUser();

    const handleLogout = () => {
        logOut();
    };

    const emailRegex =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    const nameRegex = /^[A-Za-zÁÉÍÓÖŐÚÜŰáéíóöőúüű]{2,}$/;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await authFetch("http://localhost:8080/user/data", {
                    method: "GET",
                });

                if (res.ok) {
                    const json = await res.json();
                    setId(json.id);
                    setLastName(json.last_name);
                    setFirstName(json.first_name);
                    setEmail(json.email);
                } else {
                    console.log("Invalid token");
                }
            } catch (error) {
                console.log("Sikertelen lekérés");
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await authFetch(`http://localhost:8080/user/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email: email,
                }),
            });

            if (res.ok) {
                setMessage("Adatok sikeresen módosítva!")
                console.log("User updated successfully!");
            } else {
                console.log("Failed to update user");
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div>
            <h1>Profil</h1>
            <div className="content">
                <form onSubmit={handleFormSubmit}>
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                Vezetéknév: <br />
                                <input
                                    value={lastName}
                                    type="text"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Keresztnév: <br />
                                <input
                                    value={firstName}
                                    type="text"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Email cím: <br />
                                <input
                                    value={email}
                                    type="text"
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </td>
                        </tr>
                        </tbody>
                    </table> <br/>
                    {message}
                    <hr />
                    <button type="submit">Módosítás</button> <br/>
                    <button onClick={handleLogout}>Kijelentkezés</button>
                </form>
            </div>
        </div>
    );
}
