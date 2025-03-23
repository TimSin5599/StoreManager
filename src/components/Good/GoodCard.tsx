import React from 'react';
import { useNavigate } from 'react-router';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Tooltip,
    CardActionArea,
    Button,
    Stack,
} from '@mui/material';

export type Product = {
    id: number;
    name: string;
    description?: string | null;
    category_id?: number | null;
    image?: string | null;
    quantity: number;
    unit: string;
    price?: number | null;
};

type ProductCardProps = {
    product: Product;
    handleRemoveGood: (product: Product) => void;
};

export const imageNone = "https://www.clipartsuggest.com/images/181/log-in-sign-up-upload-clipart-o72BVQ-clipart.png";

const GoodCard: React.FC<ProductCardProps> = ({ product, handleRemoveGood }) => {
    const navigate = useNavigate();

    const handleOpen = () => navigate(`/product/${product.id}`);


    return (
        <>
            <Tooltip title={product.description} placement="top">
                <Card
                    sx={{
                        transition: 'transform 0.3s',
                        '&:hover': { transform: 'scale(1.1)' },
                        height: 320,
                    }}
                >
                    <CardActionArea onClick={handleOpen}>
                        <Stack direction="row" marginLeft={1} marginTop={1} alignItems={"center"} justifyContent="space-between">
                            <Typography variant="h6" style={{color: "black"}} fontWeight={"bold"} noWrap>
                                {product.name}
                            </Typography>
                            <Button variant="outlined"
                                    color="error"
                                    onClick={(e) => {e.stopPropagation(); handleRemoveGood(product)}}
                                    sx={{
                                        marginRight: 1,
                                        minWidth: "32px",
                                        minHeight: "32px",
                                        padding: 0,
                                        fontSize: "20px",
                                        fontWeight: "bold",
                                        borderRadius: "50%",
                                        lineHeight: "20px"
                                    }}>
                                ×
                            </Button>
                        </Stack>
                        <CardMedia
                            component="img"
                            image={product.image==undefined ? imageNone : product.image}
                            alt={product.name}
                            sx={{
                                height: 200,
                                objectFit: 'contain',
                            }}
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary"
                                        sx={{
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            whiteSpace: 'nowrap',
                                        }}
                            >
                                {product.description}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {product.category_id}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Quantity: {product.quantity}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Tooltip>

            {/*<Dialog open={open} onClose={handleClose} maxWidth={false}*/}
            {/*        PaperProps={{*/}
            {/*            sx: {*/}
            {/*                display: "flex",*/}
            {/*                flexDirection: "column",*/}
            {/*                minWidth: "400px",*/}
            {/*                minHeight: "370px",*/}
            {/*                maxWidth: "60vw",*/}
            {/*                maxHeight: "50vh",*/}
            {/*                width: "auto",*/}
            {/*                height: "auto",*/}
            {/*                aspectRatio: "3 / 2",*/}
            {/*                overflow: "auto",*/}
            {/*                borderRadius: 2,*/}
            {/*            },*/}
            {/*        }} fullWidth>*/}
            {/*    <Stack padding={2} direction={"row"} display="flex" justifyContent="space-between" alignItems="center">*/}
            {/*        <Typography variant="h6" color={"black"} fontWeight={"bolder"} fontSize={28}>{product.name}</Typography>*/}
            {/*        <DialogActions>*/}
            {/*            <Button variant={"contained"} color={"primary"} onClick={handleClose}>*/}
            {/*                x*/}
            {/*            </Button>*/}
            {/*        </DialogActions>*/}
            {/*    </Stack>*/}
            {/*    <Box paddingLeft={2} paddingRight={2}>*/}
            {/*        <CardMedia*/}
            {/*            component="img"*/}
            {/*            image={product.image==undefined ? imageNone : product.image}*/}
            {/*            alt={product.name}*/}
            {/*            sx={{*/}
            {/*                maxWidth: '100%',*/}
            {/*                height: 200,*/}
            {/*                objectFit: 'contain',*/}
            {/*            }}*/}
            {/*        />*/}
            {/*        <Typography paddingTop={2}>{product.description}</Typography>*/}
            {/*        <Typography variant="body2" color="textSecondary">*/}
            {/*            Category: {product.category}*/}
            {/*        </Typography>*/}
            {/*    </Box>*/}
            {/*</Dialog>*/}
        </>
    );
};

export default GoodCard;