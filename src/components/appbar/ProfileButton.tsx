import Button from "@mui/material/Button";
import PersonIcon from "@mui/icons-material/Person";
import { authFetch } from "../../Util";
import { useNavigate } from "react-router-dom";

const PersonButton = () => {
    const navigate = useNavigate();

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
        <Button onClick={Click} style={{ color: "#dc6b29" }}>
            <PersonIcon style={{ color: "white" }} />
        </Button>
    );
};

export default PersonButton;