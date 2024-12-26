import express from "express";
import bodyParser from "body-parser";

// cors
import cors from "cors";
import corsOptions from "./config/cors.js";

// routes
import dbRoutes from "./routes/db.js";
import districtRoutes from "./routes/district.js";
import countyRoutes from "./routes/county.js";
import parishRoutes from "./routes/parish.js";
import propertyGoalRoutes from "./routes/property_goal.js";
import propertyStatusRoutes from "./routes/property_status.js";
import propertyTypeRoutes from "./routes/property_type.js";
import propertyRoutes from "./routes/property.js";

// middleware
import errorHandler from "./middleware/errorHandler.js";
import logMiddleware from "./middleware/log.js";
import formidableParser from "./middleware/formidableParser.js";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(cors(corsOptions));
app.use(formidableParser);
// app.use(logMiddleware);

// routes
app.use("/db", dbRoutes);
app.use("/district", districtRoutes);
app.use("/county", countyRoutes);
app.use("/parish", parishRoutes);
app.use("/property-goal", propertyGoalRoutes);
app.use("/property-status", propertyStatusRoutes);
app.use("/property-type", propertyTypeRoutes);
app.use("/property", propertyRoutes);

// Middleware de erro centralizado
app.use(errorHandler);

const PORT = 3000;
app.listen(PORT, () =>
    console.log(`Servidor rodando em http://localhost:${PORT}`)
);
