import {useSelector} from "react-redux";
import {RootState} from "../store";


const Category = () => {
    const categories = useSelector((state: RootState) => state.categories);

    return (
        <>
        </>
    )
}

export default Category;