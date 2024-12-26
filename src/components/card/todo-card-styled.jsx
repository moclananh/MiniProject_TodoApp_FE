import { styled } from "@mui/material/styles";
import { Card, CardContent, Box, Typography } from "@mui/material";

// Define styled components
export const StyledCard = styled(Card)(({ theme, color }) => ({
    backgroundColor: color,
    color: "black",
    borderRadius: 2,
    cursor: "pointer",
    boxShadow: 3,
    overflow: "hidden",
    height: "100%", // Make card fill the height
    display: "flex", // Enable flexbox
    flexDirection: "column", // Stack content vertically
}));

export const StyledCardContent = styled(CardContent)(({ theme }) => ({
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%", // Take full height
    padding: 14,
    "&:last-child": { paddingBottom: 2 }, // Override MUI's default padding
}));

export const TitleBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
}));

export const DescriptionTypography = styled(Typography)(({ theme }) => ({
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
}));

export const StatusPriorityBox = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
}));

export const DateBox = styled(Box)(({ theme }) => ({
    marginTop: theme.spacing(1),
}));

export const FooterBox = styled(Box)(({ theme }) => ({
    gap: theme.spacing(2),
    display: "flex",
    alignItems: "center",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
}));
