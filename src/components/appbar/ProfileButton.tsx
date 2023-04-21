import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import {authFetch} from "../../Util";
import {useNavigate} from "react-router-dom";

const PersonButton = () => { // Funkcionális komponens, mely egy profil gombot jelenít meg a fejlécben
    const navigate = useNavigate(); // Navigáció az oldalak között

    const Click = async () => { // A gombra kattintás után megvizsgálja a hogy be van-e jelentkezve a felhasználó
        try {
            const res = await authFetch("/user/data", {
                method: "GET",
            });
            if (res.ok) { // Ha van felhasználó a Profil oldalra nevigál
                navigate("/profile");
            } else { // Ha nincs felhasználó a Bejelentkezés oldalra navigál
                navigate("/login");
            }
        } catch (error) {
            navigate("/login");
        }
    };

    // MUI gomb egy Person ikonnal
    return (
        <Button onClick={Click} style={{color: "#dc6b29"}}>
            <PersonIcon style={{color: "white"}}/>
        </Button>
    );
};

export default PersonButton;