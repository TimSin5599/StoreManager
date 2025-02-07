import {Button, CardMedia, Dialog, FormHelperText, Input, Stack, Typography} from "@mui/material";
import {useNavigate, useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store";
import {imageNone, Product} from "./GoodCard.tsx";
import React, {useState} from "react";
import {changeGood, removeProduct} from "../../store/slices/goodsReducer.ts";

const GoodDetail: React.FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
    const { id } = useParams<{ id: string }>();
    const good = useSelector((state: RootState) => state.products.find((g) => g.id === id))!;
    const [goodItem, setGood] = useState<Product>(good)

    const handleChange = () => {
        setOpen(!open);
    }

    const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setGood((prev: Product) => ({
            ...prev,
            [name]: name === "quantity" ? Number(value) : value,
        }));
    }

    const handleChangeGood = () => {
        const newErrors: { [key: string]: boolean } = {};
        Object.entries(goodItem).forEach(([key, value]) => {
            if (value === "" && key !== "id") {
                newErrors[key] = true;
            }
        });

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            dispatch(changeGood({ ...goodItem}));
            handleChange();
        }
    }

    const handleRemove = () => {
        dispatch(removeProduct(good.id))
        navigate('/products')
    }

    return (
        <Stack direction="column" paddingLeft={2} paddingRight={2} gap={2} alignItems={"center"} justifyContent={"center"} sx={{ height: '80vh' }}>
            <CardMedia
                component="img"
                image={good.image === undefined ? imageNone : good.image}
                alt={good.name}
                sx={{
                    height: 200,
                    objectFit: 'contain',
                }}
            />
            {Object.keys(good).map((key) => (
                    key !== "id" && key !== "image" && (
                        <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}>
                            <Typography fontWeight={"bold"} style={{}}>
                                {key.charAt(0).toUpperCase() + key.slice(1)}:
                            </Typography>
                            <Typography marginLeft={1}>{good[key as keyof Product]}</Typography>
                        </Stack>
                    )
                )
            )}
            <Stack direction={"row"} gap={2}>
                <Button variant={"contained"} color={"secondary"} onClick={handleChange}>Change</Button>
                <Button variant={"contained"} color={"primary"} onClick={handleRemove}>Remove</Button>
            </Stack>

            <Dialog open={open} onClose={handleChange}
                    PaperProps={{
                        sx: {
                            display: "flex",
                            flexDirection: "column",
                            overflow: "auto",
                            borderRadius: 2,
                        },
                    }} fullWidth>
                <Typography marginTop={2} align="center" fontSize={20} fontFamily={"sans-serif"} fontWeight={"bold"} mb={2}>Changing Good</Typography>

                <Stack padding={2}>
                    {Object.keys(goodItem).map((key) => (
                        key !== "id" && (
                            <Stack direction={"row"} alignItems={"center"} justifyContent={"center"}>
                                <Typography width={"13vh"}>{key.charAt(0).toUpperCase() + key.slice(1)}: </Typography>
                                <Input
                                    name={key}
                                    value={goodItem[key as keyof Product]}
                                    onChange={handleChangeInput}
                                    error={errors[key]}
                                    fullWidth
                                    type={key === "quantity" ? "number" : "text"}
                                />
                                {errors[key] && (key !== "image" && key !== "description" && key !== "category") && (
                                    <FormHelperText error>{key.charAt(0).toUpperCase() + key.slice(1)} cannot be empty</FormHelperText>
                                )}
                            </Stack>
                        )
                    ))}
                </Stack>

                {/*<Stack direction="row" alignSelf={"center"} sx={{ border: "1px solid black", p: 2 }}>*/}
                {/*    <Stack gap={3} alignItems={"center"} sx={{  border: "1px solid black", p: 2 }}>*/}
                {/*        {Object.keys(good).map((key) => (*/}
                {/*            key !== "id" && (*/}
                {/*                <>*/}
                {/*                    <Typography>{key.charAt(0).toUpperCase() + key.slice(1)}: </Typography>*/}
                {/*                </>*/}
                {/*            )*/}
                {/*        ))}*/}
                {/*    </Stack>*/}
                {/*    <Stack gap={2} alignItems={"center"} sx={{ border: "1px solid black", p: 2 }}>*/}
                {/*        {Object.keys(good).map((key) => (*/}
                {/*            key !== "id" && (*/}
                {/*            <>*/}
                {/*                <Input*/}
                {/*                    name={key}*/}
                {/*                    value={good[key as keyof Product]}*/}
                {/*                    onChange={handleChange}*/}
                {/*                    error={errors[key]}*/}
                {/*                    fullWidth*/}
                {/*                    type={key === "quantity" ? "number" : "text"}*/}
                {/*                />*/}
                {/*                {errors[key] && (*/}
                {/*                    <FormHelperText error>{key.charAt(0).toUpperCase() + key.slice(1)} cannot be empty</FormHelperText>*/}
                {/*                )}*/}
                {/*            </>*/}
                {/*            )))*/}
                {/*        }*/}
                {/*    </Stack>*/}
                {/*</Stack>*/}
                <Button variant={"contained"} color={"secondary"} style={{width: "min-content", alignSelf: "center", margin: 10}} onClick={handleChangeGood}>Change</Button>
            </Dialog>
        </Stack>
    )
}

export default GoodDetail;