import { FC } from "react";
import { useClasses } from "../../../core/hooks";
import { IProduct } from "../../../core/types";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActions from "@mui/material/CardActions";
import Box from "@mui/material/Box";
import { styled } from "@mui/material";
import LoadingButton, { LoadingButtonProps } from "@mui/lab/LoadingButton";
import formatCurrency from "../../../core/formatCurrency";

const useStyles = () => ({
  card: {
    maxWidth: "250px !important",
    alignItems: "center",
    padding: "16px",
    overflow: "hidden",
    boxSizing: "border-box",
    flexDirection: "column !important",
    borderBottom: "1px solid #F0ECF4 !important",
    gap: "8px",
    borderRadius: "16px !important",
    boxShadow: "0 0 20px rgba(39, 25, 56, 0.08) !important",
  },
  image: {
    width: 100,
    height: 100,
  },
});

const LoadingButtonStyled = styled(LoadingButton)<LoadingButtonProps>(() => ({
  width: "100%",
  fontSize: "16px",
  fontWeight: "600",
  color: "#FFFFFF",
  textTransform: "none",
  backgroundColor: "#653F90",
  padding: "9px 16px 11px",
  borderRadius: "12px",
  "&:hover": {
    backgroundColor: "#470F87",
    borderColor: "#470F87",
  },
  "&:active": {
    boxShadow: "0 4px 6px rgba(39, 25, 56, 0.25)",
  },
  "&:disabled": {
    color: "#6F6F6F",
    backgroundColor: "#D8D8D8",
    borderColor: "#D8D8D8",
  },
  "&.MuiLoadingButton-loading": {
    color: "#FFFFFF",
    backgroundColor: "#653F90",
  },
  ".MuiLoadingButton-loadingIndicatorStart": {
    left: "14px",
  },
}));

type Props = {
  product: IProduct;
};

const Product: FC<Props> = ({ product }) => {
  const classes = useClasses(useStyles);
  return (
    <Card sx={{ maxWidth: 345 }} className={classes.card}>
      <CardMedia
        className={classes.image}
        component="img"
        alt={product.product_name}
        image={
          product.url
        }
      />
      <CardContent className={classes.content}>
        <Typography
          variant={"h2"}
          sx={{
            fontSize: 16,
            height: "48px",
            overflow: "hidden",
            color: "#271938",
            lineHeight: "1em",
          }}
        >
          {product.product_name.replaceAll(String.fromCharCode(34), "'")}
        </Typography>
        <Typography
          sx={{
            fontSize: "12px",
            color: "#AAA3B0",
            marginTop: "6px",
          }}
        >
          {product.brand}
        </Typography>

        <Box
          sx={{
            height: "100%",
            marginTop: "10px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: "5px",
              alignItems: "end",
            }}
          >
            <Typography
              sx={{
                fontSize: "14px",
                fontWeight: "600",
                color: "#271938",
              }}
            >
              {formatCurrency(product.sale_price)}
            </Typography>
          </Box>
        </Box>
      </CardContent>
      <CardActions className={classes.footer}>
        <LoadingButtonStyled className={classes.button}>Agregar</LoadingButtonStyled>
      </CardActions>
    </Card>
  );
};

export default Product;
