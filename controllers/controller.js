const dbConn = require("../db/mysql_connect");

const getPersonelUrun = (req, res) => {
  const personel_id = req.params.personel_id; // Değişiklik burada

  const {
    toplam_sayi,
    personel_ad_soyad,
    takim_ad,
    meslek_adi,
    urun_genel_performans,
    tur_genel_performans,
  } = req.body;

  dbConn.query(
    "SELECT SUM(urun_performans.u_aralik_23+urun_performans.u_ocak_24+urun_performans.u_subat_24+urun_performans.u_mart_24+urun_performans.u_nisan_24+urun_performans.u_mayis_24) AS toplam_sayi, personel.personel_id, CONCAT(personel.personel_ad,' ',personel.personel_soyad)  AS personel_ad_soyad, takimlar.takim_ad, meslekler.meslek_adi, personel.urun_genel_performans, personel.tur_genel_performans FROM personel, takimlar, meslekler, urun_performans WHERE personel.meslek_kodu=meslekler.meslek_kodu AND personel.takim_id=takimlar.takim_id  AND urun_performans.u_perfromans_id=personel.personel_id GROUP BY personel.personel_id;",
    [
      toplam_sayi,
      personel_id, // Burası da değişti
      personel_ad_soyad,
      takim_ad,
      meslek_adi,
      urun_genel_performans,
      tur_genel_performans,
    ],

    (err, rows) => {
      if (err) {
        res.status(500).send({ message: err.message });
      } else {
        res.send(rows);
      }
    }
  );
};

const getUrunGelecekAnalizi = (req, res) => {
  const { personel_id } = req.params;

  dbConn.query(
    "SELECT personel.personel_id, meslekler.meslek_adi, takimlar.takim_ad, urun_performans.u_perfromans_id,CONCAT(personel.personel_ad,' ',personel.personel_soyad) AS personel_ad_soyad, ROUND((SUM(urun_performans.u_aralik_23+urun_performans.u_ocak_24+urun_performans.u_subat_24+urun_performans.u_mart_24+urun_performans.u_nisan_24+urun_performans.u_mayis_24) / 6)*1.2) AS tahmini_6_ay_sonrasi_performans, ROUND((SUM(urun_performans.u_aralik_23+urun_performans.u_ocak_24+urun_performans.u_subat_24+urun_performans.u_mart_24+urun_performans.u_nisan_24+urun_performans.u_mayis_24) / 6)*1.5) AS tahmini_12_ay_sonrasi_performans, urun_performans.u_aralik_23, urun_performans.u_ocak_24, urun_performans.u_subat_24, urun_performans.u_mart_24, urun_performans.u_nisan_24, urun_performans.u_mayis_24 FROM urun_performans, personel, takimlar, meslekler WHERE personel.personel_id=urun_performans.u_perfromans_id AND personel.takim_id=takimlar.takim_id AND meslekler.meslek_kodu=personel.meslek_kodu AND personel.personel_id = ?;",
    [personel_id],
    (err, rows) => {
      if (err) {
        res.status(500).send({ success: false, message: err.message });
      } else {
        res.send({ success: true, data: rows[0] });
      }
    }
  );
};

const getPersonelTur = (req, res) => {
  const {
    toplam_sayi,
    personel_id,
    personel_ad_soyad,
    takim_ad,
    meslek_adi,
    tur_genel_performans,
  } = req.body;

  dbConn.query(
    "SELECT personel.personel_id, SUM(tur_performans.t_aralik_23+tur_performans.t_ocak_24+tur_performans.t_subat_24+tur_performans.t_mart_24+tur_performans.t_nisan_24+tur_performans.t_mayis_24)  AS toplam_sayi, CONCAT(personel.personel_ad,' ',personel.personel_soyad) AS personel_ad_soyad, takimlar.takim_ad, meslekler.meslek_adi, personel.tur_genel_performans FROM personel, takimlar, meslekler, tur_performans WHERE personel.meslek_kodu=meslekler.meslek_kodu AND personel.takim_id=takimlar.takim_id  AND tur_performans.t_performans_id=personel.personel_id GROUP BY personel.personel_id;",
    [
      toplam_sayi,
      personel_id,
      personel_ad_soyad,
      takim_ad,
      meslek_adi,
      tur_genel_performans,
    ],
    (err, rows) => {
      if (err) {
        res.status(500).send({ message: err.message });
      } else {
        res.send(rows);
      }
    }
  );
};

const getTurGelecekAnalizi = (req, res) => {
  const { personel_id } = req.params;

  dbConn.query(
    "SELECT personel.personel_id, meslekler.meslek_adi, takimlar.takim_ad, tur_performans.t_performans_id, CONCAT(personel.personel_ad,' ',personel.personel_soyad) AS personel_ad_soyad, ROUND((SUM(tur_performans.t_aralik_23+tur_performans.t_ocak_24+tur_performans.t_subat_24+tur_performans.t_mart_24+tur_performans.t_nisan_24+tur_performans.t_mayis_24) / 6)*1.2) AS tahmini_6_ay_sonrasi_performans, ROUND((SUM(tur_performans.t_aralik_23+tur_performans.t_ocak_24+tur_performans.t_subat_24+tur_performans.t_mart_24+tur_performans.t_nisan_24+tur_performans.t_mayis_24) / 6)*1.5) AS tahmini_12_ay_sonrasi_performans, tur_performans.t_aralik_23, tur_performans.t_ocak_24, tur_performans.t_subat_24, tur_performans.t_mart_24, tur_performans.t_nisan_24, tur_performans.t_mayis_24 FROM tur_performans, personel, takimlar, meslekler WHERE personel.personel_id=tur_performans.t_performans_id AND personel.takim_id=takimlar.takim_id AND meslekler.meslek_kodu=personel.meslek_kodu AND personel.personel_id = ?;",
    [personel_id],
    (err, rows) => {
      if (err) {
        res.status(500).send({ success: false, message: err.message });
      } else {
        res.send({ success: true, data: rows[0] });
      }
    }
  );
};

const getTakimPerformans = (req, res) => {
  const {
    takim_id,
    takim_ad,
    urun_genel_performans_toplam,
    tur_genel_performans_toplam,
  } = req.body;

  dbConn.query(
    `SELECT takimlar.takim_id, takimlar.takim_ad, SUM(personel.urun_genel_performans) AS urun_genel_performans_toplam, SUM(personel.tur_genel_performans) AS tur_genel_performans_toplam FROM personel, takimlar WHERE personel.takim_id=takimlar.takim_id
    GROUP BY takimlar.takim_id;`,
    [
      takim_id,
      takim_ad,
      urun_genel_performans_toplam,
      tur_genel_performans_toplam,
    ],
    (err, rows) => {
      if (err) {
        res.status(500).send({ message: err.message });
      } else {
        res.send(rows);
      }
    }
  );
};

const getTakimGelecekAnalizi = (req, res) => {
  const { takim_id } = req.params;

  dbConn.query(
    `SELECT CONCAT(takim_liderleri.takim_lideri_ad,' ',takim_liderleri.takim_lideri_soyad) AS takim_lideri_ad_soyad, COUNT(personel.personel_id) AS personel_sayi, takim_liderleri.takim_lideri_id, takimlar.takim_ad, SUM(urun_performans.u_aralik_23) AS u_aralik_23_toplam ,SUM(urun_performans.u_ocak_24) AS u_ocak_24_toplam, SUM(urun_performans.u_subat_24) AS u_subat_24_toplam, SUM(urun_performans.u_mart_24) AS u_mart_24_toplam, SUM(urun_performans.u_nisan_24) AS u_nisan_24_toplam, SUM(urun_performans.u_mayis_24) AS u_mayis_24_toplam, SUM(tur_performans.t_aralik_23) AS t_aralik_23_toplam ,SUM(tur_performans.t_ocak_24) AS t_ocak_24_toplam, SUM(tur_performans.t_subat_24) AS t_subat_24_toplam, SUM(tur_performans.t_mart_24) AS t_mart_24_toplam, SUM(tur_performans.t_nisan_24) AS t_nisan_24_toplam, SUM(tur_performans.t_mayis_24) AS t_mayis_24_toplam, ROUND((SUM(urun_performans.u_aralik_23+urun_performans.u_ocak_24+urun_performans.u_subat_24+urun_performans.u_mart_24+urun_performans.u_nisan_24+urun_performans.u_mayis_24) / 6)*1.2) AS tahmini_6_ay_sonrasi_urun_performans, ROUND((SUM(urun_performans.u_aralik_23+urun_performans.u_ocak_24+urun_performans.u_subat_24+urun_performans.u_mart_24+urun_performans.u_nisan_24+urun_performans.u_mayis_24) / 6)*1.5) AS tahmini_12_ay_sonrasi_urun_performans, ROUND((SUM(tur_performans.t_aralik_23+tur_performans.t_ocak_24+tur_performans.t_subat_24+tur_performans.t_mart_24+tur_performans.t_nisan_24+tur_performans.t_mayis_24) / 6)*1.2) AS tahmini_6_ay_sonrasi_tur_performans, ROUND((SUM(tur_performans.t_aralik_23+tur_performans.t_ocak_24+tur_performans.t_subat_24+tur_performans.t_mart_24+tur_performans.t_nisan_24+tur_performans.t_mayis_24) / 6)*1.5) AS tahmini_12_ay_sonrasi_tur_performans
    FROM takimlar, personel, urun_performans, tur_performans, takim_liderleri
    WHERE takimlar.takim_id=personel.takim_id AND personel.personel_id=urun_performans.u_perfromans_id AND personel.personel_id=tur_performans.t_performans_id AND takim_liderleri.takim_lideri_id=takimlar.takim_id AND takimlar.takim_id = ?;`,
    [takim_id],
    (err, rows) => {
      if (err) {
        res.status(500).send({ success: false, message: err.message });
      } else {
        res.send({ success: true, data: rows[0] });
      }
    }
  );
};

const getMaxMinUrunPerformans = (req, res) => {
  dbConn.query(
    `SELECT meslekler.meslek_adi, personel.personel_id, CONCAT(personel.personel_ad,' ',personel.personel_soyad) AS personel_ad_soyad, personel.urun_genel_performans, takimlar.takim_ad
    FROM personel, takimlar, meslekler
    WHERE personel.urun_genel_performans IN ((SELECT MAX(personel.urun_genel_performans) FROM personel),(SELECT MIN(personel.urun_genel_performans) FROM personel)) AND takimlar.takim_id=personel.takim_id AND meslekler.meslek_kodu=personel.meslek_kodu;`,
    (err, rows) => {
      if (err) {
        res.status(500).send({ success: false, message: err.message });
      } else {
        res.send({ success: true, data: rows });
      }
    }
  );
};

const getMaxMinUrunPerformansChart = (req, res) => {
  dbConn.query(
    `SELECT 
  personel.personel_id,
  ROUND((SUM(urun_performans.u_aralik_23 + urun_performans.u_ocak_24 + urun_performans.u_subat_24 + urun_performans.u_mart_24 + urun_performans.u_nisan_24 + urun_performans.u_mayis_24) / 6) * 1.2) AS tahmini_6_ay_sonrasi_performans,
  ROUND((SUM(urun_performans.u_aralik_23 + urun_performans.u_ocak_24 + urun_performans.u_subat_24 + urun_performans.u_mart_24 + urun_performans.u_nisan_24 + urun_performans.u_mayis_24) / 6) * 1.5) AS tahmini_12_ay_sonrasi_performans,
  urun_performans.u_aralik_23,
  urun_performans.u_ocak_24,
  urun_performans.u_subat_24,
  urun_performans.u_mart_24,
  urun_performans.u_nisan_24,
  urun_performans.u_mayis_24 
FROM 
  urun_performans, 
  personel, 
  takimlar, 
  meslekler 
WHERE 
  personel.personel_id = urun_performans.u_perfromans_id 
  AND personel.takim_id = takimlar.takim_id 
  AND meslekler.meslek_kodu = personel.meslek_kodu 
  AND personel.urun_genel_performans IN (
      (SELECT MAX(personel.urun_genel_performans) FROM personel),
      (SELECT MIN(personel.urun_genel_performans) FROM personel)
  )
GROUP BY personel.personel_id;`,
    (err, rows) => {
      if (err) {
        res.status(500).send({ success: false, message: err.message });
      } else {
        res.send({ success: true, data: rows });
      }
    }
  );
};

const getMaxMinTurPerformans = (req, res) => {
  dbConn.query(
    `SELECT meslekler.meslek_adi, personel.personel_id, CONCAT(personel.personel_ad,' ',personel.personel_soyad) AS personel_ad_soyad, personel.tur_genel_performans, takimlar.takim_ad
    FROM personel, takimlar, meslekler
    WHERE personel.tur_genel_performans IN ((SELECT MAX(personel.tur_genel_performans) FROM personel),(SELECT MIN(personel.tur_genel_performans) FROM personel)) AND takimlar.takim_id=personel.takim_id AND meslekler.meslek_kodu=personel.meslek_kodu;`,
    (err, rows) => {
      if (err) {
        res.status(500).send({ success: false, message: err.message });
      } else {
        res.send({ success: true, data: rows });
      }
    }
  );
};

const getMaxMinTurPerformansChart = (req, res) => {
  dbConn.query(
    `SELECT 
    personel.personel_id,
    ROUND((SUM(tur_performans.t_aralik_23 + tur_performans.t_ocak_24 + tur_performans.t_subat_24 + tur_performans.t_mart_24 + tur_performans.t_nisan_24 + tur_performans.t_mayis_24) / 6) * 1.2) AS tahmini_6_ay_sonrasi_performans,
    ROUND((SUM(tur_performans.t_aralik_23 + tur_performans.t_ocak_24 + tur_performans.t_subat_24 + tur_performans.t_mart_24 + tur_performans.t_nisan_24 + tur_performans.t_mayis_24) / 6) * 1.5) AS tahmini_12_ay_sonrasi_performans,
    tur_performans.t_aralik_23,
    tur_performans.t_ocak_24,
    tur_performans.t_subat_24,
    tur_performans.t_mart_24,
    tur_performans.t_nisan_24,
    tur_performans.t_mayis_24 
  FROM 
    tur_performans, 
    personel, 
    takimlar, 
    meslekler 
  WHERE 
    personel.personel_id = tur_performans.t_performans_id 
    AND personel.takim_id = takimlar.takim_id 
    AND meslekler.meslek_kodu = personel.meslek_kodu 
    AND personel.tur_genel_performans IN (
        (SELECT MAX(personel.tur_genel_performans) FROM personel),
        (SELECT MIN(personel.tur_genel_performans) FROM personel)
    )
  GROUP BY personel.personel_id;`,
    (err, rows) => {
      if (err) {
        res.status(500).send({ success: false, message: err.message });
      } else {
        res.send({ success: true, data: rows });
      }
    }
  );
};

const getPersonelSahteRaporAnalizi = (req, res) => {
  dbConn.query(
    `SELECT personel.personel_id, CONCAT(personel.personel_ad,' ',personel.personel_soyad) AS personel_ad_soyad, personel.urun_genel_performans, personel.tur_genel_performans, takimlar.takim_ad, meslekler.meslek_adi,personel.is_basi_tarih, COUNT(raporlar.rapor_id) AS rapor_sayisi, SUM(raporlar.gun_sayısı) AS toplam_rapor_gun_sayisi
    FROM personel, raporlar, takimlar, meslekler
    WHERE personel.takim_id=takimlar.takim_id AND personel.meslek_kodu=meslekler.meslek_kodu AND raporlar.personel_id=personel.personel_id
    GROUP BY personel.personel_id;`,
    (err, rows) => {
      if (err) {
        res.status(500).send({ success: false, message: err.message });
      } else {
        res.send({ success: true, data: rows });
      }
    }
  );
};

module.exports = {
  getPersonelUrun,
  getPersonelTur,
  getTakimPerformans,
  getUrunGelecekAnalizi,
  getTurGelecekAnalizi,
  getTakimGelecekAnalizi,
  getMaxMinUrunPerformans,
  getMaxMinUrunPerformansChart,
  getMaxMinTurPerformans,
  getMaxMinTurPerformansChart,
  getPersonelSahteRaporAnalizi,
};
