const router = require("express").Router();
const { getPersonelUrun } = require("../controllers/controller");
const { getPersonelTur } = require("../controllers/controller");
const { getTakimPerformans } = require("../controllers/controller");
const { getUrunGelecekAnalizi } = require("../controllers/controller");
const { getTurGelecekAnalizi } = require("../controllers/controller");
const { getTakimGelecekAnalizi } = require("../controllers/controller");
const { getMaxMinUrunPerformans } = require("../controllers/controller");
const { getMaxMinUrunPerformansChart } = require("../controllers/controller");
const { getMaxMinTurPerformans } = require("../controllers/controller");
const { getMaxMinTurPerformansChart } = require("../controllers/controller");
const { getPersonelSahteRaporAnalizi } = require("../controllers/controller");

router.get("/getPersonelUrun", getPersonelUrun);
router.get("/getPersonelTur", getPersonelTur);
router.get("/getTakimPerformans", getTakimPerformans);
router.get("/getUrunGelecekAnalizi/:personel_id", getUrunGelecekAnalizi);
router.get("/getTurGelecekAnalizi/:personel_id", getTurGelecekAnalizi);
router.get("/getTakimGelecekAnalizi/:takim_id", getTakimGelecekAnalizi);
router.get("/getMaxMinUrunPerformans", getMaxMinUrunPerformans);
router.get("/getMaxMinUrunPerformansChart", getMaxMinUrunPerformansChart);
router.get("/getMaxMinTurPerformans", getMaxMinTurPerformans);
router.get("/getMaxMinTurPerformansChart", getMaxMinTurPerformansChart);
router.get("/getPersonelSahteRaporAnalizi", getPersonelSahteRaporAnalizi);

module.exports = router;
