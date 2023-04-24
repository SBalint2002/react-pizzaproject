import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import {authFetch} from "../../Util";
import {useNavigate} from "react-router-dom";

/**
 * Funkcionális komponens, mely egy profil gombot jelenít meg a fejlécben
 * @returns {JSX.Element} A MUI gomb egy Person ikonnal
 */
const PersonButton = () => {

    /**
     * Oldalak közti navigáció
     *
     * @type {function}
     */
    const navigate = useNavigate();

    /**
     * A gombra kattintás után megvizsgálja a hogy be van-e jelentkezve a felhasználó
     * Ha van felhasználó a Profil oldalra navigál, ha nincs a Bejelentkezés oldalra
     */
    const Click = async () => {
        try {
            const res = await authFetch("/user/data", {
                method: "GET",
            });
            if (res.ok) {
                navigate("/profile");
            } else {
                navigate("/login");
            }
        } catch (error) {
            navigate("/login");
        }
    };

    return (
        <Button onClick={Click} style={{color: "#dc6b29"}}>
            <PersonIcon style={{color: "white"}}/>
        </Button>
    );
};

export default PersonButton;