import express from "express";

// routes
import countyRoutes from "./routes/county.js";
import districtRoutes from "./routes/district.js";
import parishRoutes from "./routes/parish.js";
import propertyGoalRoutes from "./routes/property_goal.js";
import propertyStatusRoutes from "./routes/property_status.js";
import propertyTypeRoutes from "./routes/property_type.js";
import propertyRoutes from "./routes/property.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/county", countyRoutes);
app.use("/district", districtRoutes);
app.use("/parish", parishRoutes);
app.use("/property-goal", propertyGoalRoutes);
app.use("/property-status", propertyStatusRoutes);
app.use("/property-type", propertyTypeRoutes);
app.use("/property", propertyRoutes);

const PORT = 3000;
app.listen(PORT, () =>
    console.log(`Servidor rodando em http://localhost:${PORT}`)
);
