import React, { useState } from 'react';
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Tooltip,
    Dialog,
    CardActionArea,
    Box, Button, DialogActions,
} from '@mui/material';

export type Product = {
    id: number;
    name: string;
    category?: string;
    description?: string;
    image?: string;
    quantity: number;
    unit: string;
};

type ProductCardProps = {
    product: Product;
};

export const imageNone = "https://www.clipartsuggest.com/images/181/log-in-sign-up-upload-clipart-o72BVQ-clipart.png";

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Tooltip title={product.description} placement="top">
                <Card
                    sx={{
                        transition: 'transform 0.3s',
                        '&:hover': { transform: 'scale(1.1)' },
                        maxWidth: '100%'
                    }}
                >
                    <CardActionArea onClick={handleOpen}>
                        <CardMedia
                            component="img"
                            image={product.image==undefined ? imageNone : product.image}
                            alt={product.name}
                            sx={{
                                maxWidth: '100%',
                                height: 200,
                                objectFit: 'contain',
                            }}
                        />
                        <CardContent>
                            <Typography variant="h5" noWrap>
                                {product.name}
                            </Typography>
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
                                {product.category}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                </Card>
            </Tooltip>

            <Dialog open={open} onClose={handleClose} maxWidth={false}
                    PaperProps={{
                        sx: {
                            display: "flex",
                            flexDirection: "column",
                            minWidth: "300px",
                            minHeight: "150px",
                            maxWidth: "60vw",
                            maxHeight: "50vh",
                            width: "auto",
                            height: "auto",
                            aspectRatio: "3 / 2",
                            overflow: "auto",
                            borderRadius: 2,
                        },
                    }} fullWidth>
                <DialogActions>
                    <Button variant={"contained"} color={"primary"} onClick={handleClose}>
                        x
                    </Button>
                </DialogActions>
                <Box padding={2}>
                    <Typography variant="h5">{product.name}</Typography>
                    <Typography>{product.description}</Typography>
                    <Typography variant="body2" color="textSecondary">
                        Category: {product.category}
                    </Typography>
                </Box>
            </Dialog>
        </>
    );
};

export default ProductCard;