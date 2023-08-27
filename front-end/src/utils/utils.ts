import { useNavigate } from "react-router-dom";

export const handleNavigate = (path: string) => {

    const navigate = useNavigate();

    return navigate(path);
}
