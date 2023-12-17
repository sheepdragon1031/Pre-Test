import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import i18n from "../i18n/index";
import { red, grey } from "@mui/material/colors";

const addComma = (input) => {
  const reg = /\B(?=([0-9]{3})+(?![0-9]))/g;
  return input.toString().replace(reg, ",");
};
const delComma = (input) => {
  const hasComma = /,/.test(input);
  let reinput;
  reinput = input;
  if (hasComma) {
    reinput = input.replace(/[^-0-9.]/g, "");
  }
  return reinput;
};

const priceInput = ({ itemData, onFormPriceInputChange, itemKey }) => {
  const handleValue = (e) => {
    e.target.value = addComma(delComma(e.target.value));
    onFormPriceInputChange(e.target.value, itemKey);
    //   this.props.formPriceInputChange(e.target.value);
  };

  return (
    <Card sx={{ width: "100%" }}>
      <CardContent>
        <Typography
          sx={{ fontSize: 14, py: 2 }}
          color="text.secondary"
          align="left"
        >
          {itemData.title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            theme: "light",
            background: grey[200],
            borderRadius: 1,
          }}
        >
          <Typography sx={{ px: 2, borderRadius: 1 }}>
            {i18n.tw.priceInput.TWD}
          </Typography>
          <TextField
            sx={{ background: grey[50], borderRadius: 1 }}
            fullWidth
            placeholder={i18n.tw.priceInput.variant}
            variant="outlined"
            onChange={handleValue}
            defaultValue="0"
          />
        </Box>
        {itemData.error && (
          <Typography
            sx={{ fontSize: 14, p: 1, background: red[300], borderRadius: 1 }}
            color="#fff"
            align="left"
          >
            {itemData.error}
          </Typography>
        )}
      </CardContent>
      {itemData.hit && (
        <CardActions sx={{ flexDirection: "row-reverse" }}>
          <Typography
            sx={{ px: 1, borderRadius: 1 }}
            color="text.secondary"
            variant="body2"
            align="right"
          >
            {i18n.tw.priceInput.hit}
          </Typography>
        </CardActions>
      )}
    </Card>
  );
};

export default priceInput;
