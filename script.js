/* =========================================================================
   SISTEM JADWAL KKN — script.js

   BAGIAN 1  DATA        -> bagian yang paling sering diedit
   BAGIAN 2  PENYIMPANAN -> simpan/muat perubahan di HP pengguna
   BAGIAN 3  TAMPILAN    -> render hari ini, tab jadwal, daftar hari
   BAGIAN 4  BOTTOM SHEET-> pilih petugas & pilih nama sendiri
   BAGIAN 5  BAGIKAN     -> gambar, PDF, cetak
   BAGIAN 6  INISIALISASI
   ========================================================================= */


/* =========================================================================
   BAGIAN 1.1 — IDENTITAS POSKO
   Ganti teks di bawah ini dengan nama desa/posko kalian.
   ========================================================================= */
   const NAMA_POSKO = "Posko KKN";


   /* =========================================================================
      BAGIAN 1.2 — DATA ANGGOTA
      ========================================================================= */
   const anggotaKKN = [
     "Ahmad Ridho Pambudi",
     "Firda Arinanda Cahyani",
     "Wisik Adi Panuntun",
     "Cut Anastasya Nurul Hilal",
     "Risma Setianingrum",
     "Agdilla Syahba Arzetinindya",
     "Ferdiansyah Ibnu Putra",
     "Khilmatunnisa",
     "Anisa Annabila",
     "Naomi Tiurma Riandi"
   ];
   
   // Token khusus: bukan nama individu, artinya seluruh anggota bertugas.
   const SEMUA = "Semua Anggota";
   
   
   /* =========================================================================
      BAGIAN 1.3 — DAFTAR JADWAL
        id    -> pengenal unik, harus sama dengan key pada jadwalData
        title -> judul lengkap (dipakai di heading & file yang dibagikan)
        short -> label pendek untuk tab di layar HP
      ========================================================================= */
   const daftarJadwal = [
     { id: "piket-posko",  title: "Piket Kebersihan Posko",     short: "Piket posko" },
     { id: "piket-balai",  title: "Piket Kebersihan Balai Desa", short: "Balai desa" },
     { id: "beli-bahan",   title: "Belanja Bahan Masakan",      short: "Belanja" },
     { id: "jadwal-masak", title: "Jadwal Masak",               short: "Masak" }
   ];
   
   
   /* =========================================================================
      BAGIAN 1.4 — DATA JADWAL
      Setiap baris: { hari, nama: [], keterangan: "" }
      ========================================================================= */
   const HARI = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
   
   const jadwalData = {
     "piket-posko": [
       { hari: "Senin",  nama: ["Ahmad Ridho Pambudi", "Firda Arinanda Cahyani"], keterangan: "" },
       { hari: "Selasa", nama: ["Wisik Adi Panuntun", "Cut Anastasya Nurul Hilal"], keterangan: "" },
       { hari: "Rabu",   nama: ["Risma Setianingrum", "Agdilla Syahba Arzetinindya"], keterangan: "" },
       { hari: "Kamis",  nama: ["Ferdiansyah Ibnu Putra", "Khilmatunnisa"], keterangan: "" },
       { hari: "Jumat",  nama: ["Anisa Annabila", "Naomi Tiurma Riandi"], keterangan: "" },
       { hari: "Sabtu",  nama: ["Firda Arinanda Cahyani"], keterangan: "Cewek" },
       { hari: "Minggu", nama: ["Wisik Adi Panuntun"], keterangan: "Cowok" }
     ],
   
     "piket-balai": [
       { hari: "Senin",  nama: ["Anisa Annabila", "Naomi Tiurma Riandi"], keterangan: "" },
       { hari: "Selasa", nama: ["Ferdiansyah Ibnu Putra", "Khilmatunnisa"], keterangan: "" },
       { hari: "Rabu",   nama: ["Risma Setianingrum", "Agdilla Syahba Arzetinindya"], keterangan: "" },
       { hari: "Kamis",  nama: ["Wisik Adi Panuntun", "Cut Anastasya Nurul Hilal"], keterangan: "" },
       { hari: "Jumat",  nama: ["Ahmad Ridho Pambudi", "Firda Arinanda Cahyani"], keterangan: "" },
       { hari: "Sabtu",  nama: [], keterangan: "Cowok" },
       { hari: "Minggu", nama: [], keterangan: "Belum diatur" }
     ],
   
     "beli-bahan": [
       { hari: "Senin",  nama: ["Ferdiansyah Ibnu Putra", "Agdilla Syahba Arzetinindya"], keterangan: "" },
       { hari: "Selasa", nama: ["Firda Arinanda Cahyani"], keterangan: "" },
       { hari: "Rabu",   nama: ["Khilmatunnisa"], keterangan: "" },
       { hari: "Kamis",  nama: ["Wisik Adi Panuntun", "Cut Anastasya Nurul Hilal"], keterangan: "" },
       { hari: "Jumat",  nama: ["Naomi Tiurma Riandi"], keterangan: "" },
       { hari: "Sabtu",  nama: ["Risma Setianingrum"], keterangan: "" },
       { hari: "Minggu", nama: ["Ahmad Ridho Pambudi", "Anisa Annabila"], keterangan: "" }
     ],
   
     "jadwal-masak": [
       { hari: "Senin",  nama: ["Wisik Adi Panuntun", "Cut Anastasya Nurul Hilal"], keterangan: "" },
       { hari: "Selasa", nama: ["Ahmad Ridho Pambudi", "Naomi Tiurma Riandi"], keterangan: "" },
       { hari: "Rabu",   nama: ["Ferdiansyah Ibnu Putra", "Anisa Annabila"], keterangan: "" },
       { hari: "Kamis",  nama: ["Firda Arinanda Cahyani", "Agdilla Syahba Arzetinindya"], keterangan: "" },
       { hari: "Jumat",  nama: ["Risma Setianingrum", "Khilmatunnisa"], keterangan: "" },
       { hari: "Sabtu",  nama: [SEMUA], keterangan: "" },
       { hari: "Minggu", nama: [SEMUA], keterangan: "" }
     ]
   };
   
   // Contoh keterangan yang bisa ditap sekali saat mengedit.
   const KETERANGAN_CEPAT = ["Cewek", "Cowok", "Libur", "Menyusul", "Belum diatur"];
   
   // Salinan asli, dipakai tombol "Kembalikan ke jadwal awal".
   const jadwalAsli = JSON.parse(JSON.stringify(jadwalData));
   
   
   /* =========================================================================
      BAGIAN 2 — PENYIMPANAN
      Disimpan per nama hari (bukan per nomor baris), supaya data lama tidak
      nyasar ke baris yang salah kalau urutan datanya diubah.
      ========================================================================= */
   const KEY_JADWAL = "kkn:jadwal:v2";
   const KEY_SAYA   = "kkn:nama-saya";
   
   function bacaPenyimpanan(key) {
     try { return localStorage.getItem(key); }
     catch (e) { return null; }
   }
   
   function tulisPenyimpanan(key, nilai) {
     try { localStorage.setItem(key, nilai); return true; }
     catch (e) { return false; }
   }
   
   function namaValid(nama) {
     return nama === SEMUA || anggotaKKN.indexOf(nama) !== -1;
   }
   
   function muatJadwalTersimpan() {
     const mentah = bacaPenyimpanan(KEY_JADWAL);
     if (!mentah) return;
   
     let tersimpan;
     try { tersimpan = JSON.parse(mentah); }
     catch (e) { return; }
     if (!tersimpan || typeof tersimpan !== "object") return;
   
     Object.keys(tersimpan).forEach(function (jadwalId) {
       const target = jadwalData[jadwalId];
       if (!target) return;
   
       target.forEach(function (baris) {
         const simpanan = tersimpan[jadwalId][baris.hari];
         if (!simpanan) return;
   
         if (Array.isArray(simpanan.nama)) {
           baris.nama = simpanan.nama.filter(namaValid);
         }
         if (typeof simpanan.keterangan === "string") {
           baris.keterangan = simpanan.keterangan;
         }
       });
     });
   }
   
   function simpanJadwal() {
     const data = {};
     Object.keys(jadwalData).forEach(function (jadwalId) {
       data[jadwalId] = {};
       jadwalData[jadwalId].forEach(function (baris) {
         data[jadwalId][baris.hari] = {
           nama: baris.nama.slice(),
           keterangan: baris.keterangan || ""
         };
       });
     });
     return tulisPenyimpanan(KEY_JADWAL, JSON.stringify(data));
   }
   
   
   /* =========================================================================
      BAGIAN 3 — TAMPILAN
      ========================================================================= */
   const el = {
     brandDesa:   document.getElementById("brand-desa"),
     btnSaya:     document.getElementById("btn-saya"),
     meAvatar:    document.getElementById("me-avatar"),
     meLabel:     document.getElementById("me-label"),
   
     todayDate:   document.getElementById("today-date"),
     todayDay:    document.getElementById("today-day"),
     todayNote:   document.getElementById("today-note"),
     todayList:   document.getElementById("today-list"),
   
     tabs:        document.getElementById("tabs"),
     judul:       document.getElementById("judul-jadwal"),
     dayList:     document.getElementById("day-list"),
   
     btnBagikan:  document.getElementById("btn-bagikan"),
     btnPdf:      document.getElementById("btn-pdf"),
     btnPrint:    document.getElementById("btn-print"),
     btnReset:    document.getElementById("btn-reset"),
     jumlah:      document.getElementById("jumlah-anggota"),
   
     sheetRoot:   document.getElementById("sheet-root"),
     sheetScrim:  document.getElementById("sheet-scrim"),
     sheet:       document.getElementById("sheet"),
     sheetKicker: document.getElementById("sheet-kicker"),
     sheetTitle:  document.getElementById("sheet-title"),
     sheetBody:   document.getElementById("sheet-body"),
     sheetFoot:   document.getElementById("sheet-foot"),
     sheetClose:  document.getElementById("sheet-close"),
   
     toast:       document.getElementById("toast"),
     exportStage: document.getElementById("export-stage")
   };
   
   let jadwalAktif = daftarJadwal[0].id;
   let namaSaya = bacaPenyimpanan(KEY_SAYA) || "";
   if (namaSaya && !namaValid(namaSaya)) namaSaya = "";
   
   function esc(teks) {
     return String(teks == null ? "" : teks)
       .replace(/&/g, "&amp;")
       .replace(/</g, "&lt;")
       .replace(/>/g, "&gt;")
       .replace(/"/g, "&quot;");
   }
   
   function hariIni() {
     // getDay(): 0 = Minggu ... 6 = Sabtu
     const peta = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
     return peta[new Date().getDay()];
   }
   
   function tanggalPanjang(tanggal) {
     const bulan = ["Januari", "Februari", "Maret", "April", "Mei", "Juni",
                    "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
     return tanggal.getDate() + " " + bulan[tanggal.getMonth()] + " " + tanggal.getFullYear();
   }
   
   function inisial(nama) {
     const bagian = nama.trim().split(/\s+/);
     return (bagian[0][0] + (bagian[1] ? bagian[1][0] : "")).toUpperCase();
   }
   
   function namaDepan(nama) {
     return nama === SEMUA ? nama : nama.trim().split(/\s+/)[0];
   }
   
   /* Kartu "Hari ini" memakai nama panggilan supaya muat satu baris — tapi hanya
      kalau semua nama depan berbeda. Kalau ada yang kembar, otomatis kembali ke
      nama lengkap supaya tidak ada yang tertukar. */
   const petaNamaRingkas = (function () {
     const depan = anggotaKKN.map(function (n) { return n.trim().split(/\s+/)[0]; });
     const semuaBeda = new Set(depan).size === depan.length;
     const peta = {};
     anggotaKKN.forEach(function (n, i) { peta[n] = semuaBeda ? depan[i] : n; });
     peta[SEMUA] = "Semua anggota";
     return peta;
   })();
   
   function namaRingkas(nama) {
     return petaNamaRingkas[nama] || nama;
   }
   
   function cariJadwal(jadwalId) {
     return daftarJadwal.find(function (j) { return j.id === jadwalId; });
   }
   
   function cariBaris(jadwalId, hari) {
     return jadwalData[jadwalId].find(function (b) { return b.hari === hari; });
   }
   
   /** Membungkus nama dengan penanda kuning kalau itu nama pengguna sendiri. */
   function namaHTML(nama, ringkas) {
     const kelas = (namaSaya && nama === namaSaya) ? ' class="is-me"' : "";
     return "<span" + kelas + ">" + esc(ringkas ? namaRingkas(nama) : nama) + "</span>";
   }
   
   
   /* ---------- 3.1 Kartu "Hari ini" ---------- */
   function renderHariIni() {
     const hari = hariIni();
     const tanggal = new Date();
   
     el.todayDate.textContent = "Hari ini · " + tanggalPanjang(tanggal);
     el.todayDay.textContent = hari;
   
     let tugasSaya = 0;
   
     el.todayList.innerHTML = daftarJadwal.map(function (jadwal) {
       const baris = cariBaris(jadwal.id, hari);
       const nama = baris ? baris.nama : [];
   
       if (namaSaya && (nama.indexOf(namaSaya) !== -1 || nama.indexOf(SEMUA) !== -1)) {
         tugasSaya += 1;
       }
   
       let isi;
       if (!nama.length) {
         isi = '<span class="empty">' + (baris && baris.keterangan
           ? esc(baris.keterangan)
           : "Belum ada petugas") + "</span>";
       } else {
         isi = nama.map(function (n) { return namaHTML(n, true); }).join(", ");
         if (baris.keterangan) isi += ' <span class="empty">· ' + esc(baris.keterangan) + "</span>";
       }
   
       return '<li class="today-item">' +
                '<span class="today-duty">' + esc(jadwal.short) + "</span>" +
                '<span class="today-who">' + isi + "</span>" +
              "</li>";
     }).join("");
   
     // Pesan personal
     if (!namaSaya) {
       el.todayNote.className = "today-note is-free";
       el.todayNote.textContent = "Pilih namamu di pojok kanan atas untuk menyorot tugasmu.";
     } else if (tugasSaya > 0) {
       el.todayNote.className = "today-note";
       el.todayNote.textContent = namaDepan(namaSaya) + ", kamu kebagian " + tugasSaya +
         " tugas hari ini.";
     } else {
       el.todayNote.className = "today-note is-free";
       el.todayNote.textContent = namaDepan(namaSaya) + ", hari ini kamu tidak kebagian tugas.";
     }
   }
   
   
   /* ---------- 3.2 Tab jadwal ---------- */
   function renderTabs() {
     el.tabs.innerHTML = daftarJadwal.map(function (jadwal) {
       const aktif = jadwal.id === jadwalAktif;
       return '<button class="tab" type="button" role="tab" data-jadwal="' + esc(jadwal.id) + '" ' +
              'aria-selected="' + aktif + '" tabindex="' + (aktif ? "0" : "-1") + '">' +
              esc(jadwal.short) + "</button>";
     }).join("");
   }
   
   function pilihJadwal(jadwalId, geserTab) {
     jadwalAktif = jadwalId;
     renderTabs();
     renderDaftarHari();
     siapkanKartuExport();
   
     if (geserTab) {
       const tombol = el.tabs.querySelector('[data-jadwal="' + jadwalId + '"]');
       if (tombol && tombol.scrollIntoView) {
         tombol.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
       }
     }
   }
   
   
   /* ---------- 3.3 Daftar hari ---------- */
   function renderDaftarHari() {
     const jadwal = cariJadwal(jadwalAktif);
     const hari = hariIni();
   
     el.judul.textContent = jadwal.title;
   
     el.dayList.innerHTML = jadwalData[jadwalAktif].map(function (baris) {
       const ini = baris.hari === hari;
   
       const isiNama = baris.nama.length
         ? '<div class="day-names">' +
             baris.nama.map(function (n) { return namaHTML(n, false); }).join("") + "</div>"
         : '<div class="day-names"><span class="empty">Belum ada petugas</span></div>';
   
       const ket = baris.keterangan
         ? '<span class="day-ket">' + esc(baris.keterangan) + "</span>"
         : "";
   
       return "<li>" +
         '<button class="day-card' + (ini ? " is-today" : "") + '" type="button" ' +
           'data-hari="' + esc(baris.hari) + '" ' +
           'aria-label="Ubah petugas ' + esc(jadwal.title) + " hari " + esc(baris.hari) + '">' +
           '<span class="day-name">' + esc(baris.hari) +
             (ini ? '<span class="day-today-tag">Hari ini</span>' : "") +
           "</span>" +
           '<span class="day-main">' + isiNama + ket + "</span>" +
           '<span class="day-chev" aria-hidden="true">›</span>' +
         "</button></li>";
     }).join("");
   }
   
   
   /* ---------- 3.4 Tombol nama saya ---------- */
   function renderTombolSaya() {
     if (namaSaya) {
       el.meAvatar.textContent = inisial(namaSaya);
       el.meLabel.textContent = namaDepan(namaSaya);
       el.btnSaya.setAttribute("aria-label", "Nama kamu: " + namaSaya + ". Ketuk untuk mengganti.");
     } else {
       el.meAvatar.textContent = "?";
       el.meLabel.textContent = "Pilih namamu";
       el.btnSaya.setAttribute("aria-label", "Pilih namamu");
     }
   }
   
   
   /* ---------- 3.5 Toast ---------- */
   let toastTimer = null;
   function toast(pesan) {
     el.toast.textContent = pesan;
     el.toast.hidden = false;
     clearTimeout(toastTimer);
     toastTimer = setTimeout(function () { el.toast.hidden = true; }, 2600);
   }
   
   
   /* =========================================================================
      BAGIAN 4 — BOTTOM SHEET
      ========================================================================= */
   let fokusSebelumnya = null;
   
   function bukaSheet(opsi) {
     fokusSebelumnya = document.activeElement;
     el.sheetKicker.textContent = opsi.kicker || "";
     el.sheetTitle.textContent = opsi.judul || "";
     el.sheetBody.innerHTML = opsi.body || "";
     el.sheetFoot.innerHTML = opsi.foot || "";
     el.sheetRoot.hidden = false;
     document.body.classList.add("sheet-open");
   
     if (typeof opsi.setelahBuka === "function") opsi.setelahBuka();
   
     const fokus = el.sheetBody.querySelector("button, input") || el.sheetClose;
     if (fokus) fokus.focus({ preventScroll: true });
   }
   
   function tutupSheet() {
     el.sheetRoot.hidden = true;
     el.sheetBody.innerHTML = "";
     el.sheetFoot.innerHTML = "";
     document.body.classList.remove("sheet-open");
     if (fokusSebelumnya && fokusSebelumnya.focus) fokusSebelumnya.focus({ preventScroll: true });
     fokusSebelumnya = null;
   }
   
   
   /* ---------- 4.1 Sheet: ubah petugas satu hari ---------- */
   let editKonteks = null; // { jadwalId, hari, terpilih: [] }
   
   function chipNamaHTML(nama, terpilih, penandaSaya, bulat) {
     return '<button class="name-chip' + (penandaSaya ? " is-mine" : "") +
            (bulat ? " is-radio" : "") + '" type="button" ' +
            'data-nama="' + esc(nama) + '" aria-pressed="' + (terpilih ? "true" : "false") + '">' +
            '<span class="tick" aria-hidden="true">✓</span>' +
            "<span>" + esc(nama) + "</span></button>";
   }
   
   function bukaEditHari(jadwalId, hari) {
     const jadwal = cariJadwal(jadwalId);
     const baris = cariBaris(jadwalId, hari);
     editKonteks = { jadwalId: jadwalId, hari: hari, terpilih: baris.nama.slice() };
   
     const chipSemua = '<button class="name-chip wide" type="button" data-nama="' + esc(SEMUA) + '" ' +
       'aria-pressed="' + (baris.nama.indexOf(SEMUA) !== -1) + '">' +
       '<span class="tick" aria-hidden="true">✓</span><span>Semua anggota bertugas</span></button>';
   
     const chipOrang = anggotaKKN.map(function (nama) {
       return chipNamaHTML(nama, baris.nama.indexOf(nama) !== -1, nama === namaSaya);
     }).join("");
   
     const preset = KETERANGAN_CEPAT.map(function (teks) {
       return '<button class="ket-preset" type="button" data-preset="' + esc(teks) + '">' +
              esc(teks) + "</button>";
     }).join("");
   
     bukaSheet({
       kicker: jadwal.title,
       judul: hari,
       body:
         '<span class="sheet-label">Siapa yang bertugas? ' +
           '<span class="sheet-count" id="hitung-nama"></span></span>' +
         '<div class="name-grid" id="grid-nama">' + chipSemua + chipOrang + "</div>" +
         '<div class="sheet-divider">' +
           '<span class="sheet-label">Keterangan tambahan</span>' +
           '<input class="ket-input" id="input-ket" type="text" maxlength="60" ' +
             'placeholder="Misalnya: cewek, cowok, atau catatan lain" ' +
             'value="' + esc(baris.keterangan || "") + '" />' +
           '<div class="ket-presets">' + preset + "</div>" +
         "</div>",
       foot:
         '<button class="btn btn-primary" id="sheet-simpan" type="button">Simpan perubahan</button>' +
         '<button class="btn btn-link" id="sheet-kosongkan" type="button">Kosongkan hari ini</button>',
       setelahBuka: perbaruiHitungNama
     });
   }
   
   function perbaruiHitungNama() {
     const hitung = document.getElementById("hitung-nama");
     if (!hitung || !editKonteks) return;
   
     const jumlah = editKonteks.terpilih.length;
     if (editKonteks.terpilih.indexOf(SEMUA) !== -1) {
       hitung.textContent = "— semua anggota";
     } else if (jumlah === 0) {
       hitung.textContent = "— belum ada";
     } else {
       hitung.textContent = "— " + jumlah + " orang";
     }
   }
   
   function toggleNamaEditor(nama) {
     if (!editKonteks) return;
     const dipilih = editKonteks.terpilih;
   
     if (nama === SEMUA) {
       editKonteks.terpilih = dipilih.indexOf(SEMUA) !== -1 ? [] : [SEMUA];
     } else {
       const tanpaSemua = dipilih.filter(function (n) { return n !== SEMUA; });
       const posisi = tanpaSemua.indexOf(nama);
       if (posisi === -1) tanpaSemua.push(nama);
       else tanpaSemua.splice(posisi, 1);
       editKonteks.terpilih = tanpaSemua;
     }
   
     // Sinkronkan tampilan chip
     const grid = document.getElementById("grid-nama");
     if (grid) {
       grid.querySelectorAll(".name-chip").forEach(function (chip) {
         chip.setAttribute("aria-pressed",
           editKonteks.terpilih.indexOf(chip.dataset.nama) !== -1 ? "true" : "false");
       });
     }
     perbaruiHitungNama();
   }
   
   function simpanEditHari() {
     if (!editKonteks) return;
     const baris = cariBaris(editKonteks.jadwalId, editKonteks.hari);
     const input = document.getElementById("input-ket");
   
     // Urutkan sesuai urutan daftar anggota supaya tampilannya konsisten.
     baris.nama = editKonteks.terpilih.indexOf(SEMUA) !== -1
       ? [SEMUA]
       : anggotaKKN.filter(function (n) { return editKonteks.terpilih.indexOf(n) !== -1; });
   
     baris.keterangan = input ? input.value.trim() : baris.keterangan;
   
     const tersimpan = simpanJadwal();
     const hari = editKonteks.hari;
     editKonteks = null;
     tutupSheet();
   
     renderDaftarHari();
     renderHariIni();
     siapkanKartuExport();
     toast(tersimpan
       ? "Jadwal " + hari + " diperbarui."
       : "Jadwal " + hari + " diperbarui, tapi tidak bisa disimpan di HP ini.");
   }
   
   
   /* ---------- 4.2 Sheet: pilih nama sendiri ---------- */
   function bukaPilihNama() {
     const chip = anggotaKKN.map(function (nama) {
       return chipNamaHTML(nama, nama === namaSaya, false, true);
     }).join("");
   
     bukaSheet({
       kicker: NAMA_POSKO,
       judul: "Siapa kamu?",
       body:
         '<p class="sheet-empty">Namamu akan disorot di seluruh jadwal, dan kartu ' +
         '“Hari ini” akan memberi tahu kalau kamu kebagian tugas.</p>' +
         '<div class="name-grid" id="grid-saya">' + chip + "</div>",
       foot: namaSaya
         ? '<button class="btn btn-link" id="hapus-saya" type="button">Hapus pilihan nama</button>'
         : ""
     });
   }
   
   function setNamaSaya(nama) {
     namaSaya = nama || "";
     if (namaSaya) tulisPenyimpanan(KEY_SAYA, namaSaya);
     else { try { localStorage.removeItem(KEY_SAYA); } catch (e) {} }
   
     tutupSheet();
     renderTombolSaya();
     renderHariIni();
     renderDaftarHari();
     toast(namaSaya ? "Halo, " + namaDepan(namaSaya) + "!" : "Pilihan nama dihapus.");
   }
   
   
   /* ---------- 4.3 Sheet: konfirmasi reset ---------- */
   function bukaKonfirmasiReset() {
     bukaSheet({
       kicker: "Perlu dikonfirmasi",
       judul: "Kembalikan jadwal awal?",
       body: '<p class="sheet-empty">Semua perubahan petugas dan keterangan pada keempat ' +
             'jadwal akan dihapus dari HP ini dan kembali ke data awal. Tindakan ini ' +
             'tidak bisa dibatalkan.</p>',
       foot:
         '<button class="btn btn-primary" id="reset-ya" type="button">Ya, kembalikan</button>' +
         '<button class="btn btn-quiet" id="reset-batal" type="button">Batal</button>'
     });
   }
   
   function jalankanReset() {
     Object.keys(jadwalAsli).forEach(function (jadwalId) {
       jadwalData[jadwalId] = JSON.parse(JSON.stringify(jadwalAsli[jadwalId]));
     });
     try { localStorage.removeItem(KEY_JADWAL); } catch (e) {}
     tutupSheet();
     renderDaftarHari();
     renderHariIni();
     siapkanKartuExport();
     toast("Jadwal dikembalikan ke data awal.");
   }
   
   
   /* =========================================================================
      BAGIAN 5 — BAGIKAN
      Kartu export dibuat terpisah dengan lebar tetap 760px, jadi hasil
      gambar/PDF tetap rapi walaupun dibuat dari layar HP yang sempit.
      ========================================================================= */
   function siapkanKartuExport() {
     const jadwal = cariJadwal(jadwalAktif);
   
     const baris = jadwalData[jadwalAktif].map(function (b) {
       const nama = b.nama.length
         ? b.nama.map(function (n) { return "<span>" + esc(n) + "</span>"; }).join("")
         : '<span class="empty">—</span>';
       return "<tr>" +
         '<td class="ex-day">' + esc(b.hari) + "</td>" +
         '<td class="ex-name">' + nama + "</td>" +
         '<td class="ex-ket">' + (b.keterangan ? esc(b.keterangan) : "") + "</td>" +
         "</tr>";
     }).join("");
   
     el.exportStage.innerHTML =
       '<div class="ex-card">' +
         '<div class="ex-head">' +
           '<p class="ex-kicker">' + esc(NAMA_POSKO) + "</p>" +
           '<h2 class="ex-title">' + esc(jadwal.title) + "</h2>" +
         "</div>" +
         '<table class="ex-table">' +
           "<thead><tr><th>Hari</th><th>Petugas</th><th>Keterangan</th></tr></thead>" +
           "<tbody>" + baris + "</tbody>" +
         "</table>" +
         '<div class="ex-foot"><span>Berlaku setiap minggu</span>' +
         "<span>Diperbarui " + esc(tanggalPanjang(new Date())) + "</span></div>" +
       "</div>";
   }
   
   function namaFile(ekstensi) {
     const jadwal = cariJadwal(jadwalAktif);
     return "Jadwal-" + jadwal.title.replace(/\s+/g, "-") + "." + ekstensi;
   }
   
   function ambilKanvas() {
     const kartu = el.exportStage.querySelector(".ex-card");
     return html2canvas(kartu, {
       scale: 2,
       backgroundColor: "#ffffff",
       logging: false,
       useCORS: true,
       windowWidth: 900
     });
   }
   
   function unduhDataURL(dataURL, nama) {
     const tautan = document.createElement("a");
     tautan.href = dataURL;
     tautan.download = nama;
     document.body.appendChild(tautan);
     tautan.click();
     document.body.removeChild(tautan);
   }
   
   function bagikanGambar() {
     if (typeof html2canvas === "undefined") {
       toast("Gambar gagal dibuat. Periksa koneksi internet, lalu coba lagi.");
       return;
     }
   
     el.btnBagikan.disabled = true;
     el.btnBagikan.textContent = "Menyiapkan gambar…";
   
     ambilKanvas().then(function (kanvas) {
       const nama = namaFile("jpg");
   
       // Coba bagikan langsung ke WhatsApp dsb. lewat menu berbagi HP.
       if (kanvas.toBlob && navigator.canShare) {
         kanvas.toBlob(function (blob) {
           const berkas = new File([blob], nama, { type: "image/jpeg" });
           if (navigator.canShare({ files: [berkas] })) {
             navigator.share({ files: [berkas], title: cariJadwal(jadwalAktif).title })
               .then(function () { toast("Gambar dibagikan."); })
               .catch(function () { /* pengguna membatalkan — tidak perlu pesan */ });
           } else {
             unduhDataURL(kanvas.toDataURL("image/jpeg", 0.95), nama);
             toast("Gambar tersimpan di galeri/unduhan.");
           }
           selesaiBagikan();
         }, "image/jpeg", 0.95);
         return;
       }
   
       unduhDataURL(kanvas.toDataURL("image/jpeg", 0.95), nama);
       toast("Gambar tersimpan di galeri/unduhan.");
       selesaiBagikan();
     }).catch(function (err) {
       console.error(err);
       toast("Gambar gagal dibuat. Coba lagi.");
       selesaiBagikan();
     });
   }
   
   function selesaiBagikan() {
     el.btnBagikan.disabled = false;
     el.btnBagikan.textContent = "Bagikan sebagai gambar";
   }
   
   function unduhPDF() {
     if (typeof html2canvas === "undefined" || typeof window.jspdf === "undefined") {
       toast("PDF gagal dibuat. Periksa koneksi internet, lalu coba lagi.");
       return;
     }
   
     el.btnPdf.disabled = true;
     const labelLama = el.btnPdf.textContent;
     el.btnPdf.textContent = "Menyiapkan…";
   
     ambilKanvas().then(function (kanvas) {
       const jsPDF = window.jspdf.jsPDF;
       const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
   
       const margin = 14;
       const lebarHalaman = pdf.internal.pageSize.getWidth() - margin * 2;
       const tinggiHalaman = pdf.internal.pageSize.getHeight() - margin * 2;
       const tinggiGambar = (kanvas.height * lebarHalaman) / kanvas.width;
   
       if (tinggiGambar <= tinggiHalaman) {
         pdf.addImage(kanvas.toDataURL("image/jpeg", 0.95), "JPEG",
           margin, margin, lebarHalaman, tinggiGambar);
       } else {
         // Potong menjadi beberapa halaman kalau isinya lebih tinggi dari A4.
         const pxPerMM = kanvas.width / lebarHalaman;
         const tinggiPotongPx = tinggiHalaman * pxPerMM;
         let offset = 0;
         let halamanPertama = true;
   
         while (offset < kanvas.height) {
           const potongPx = Math.min(tinggiPotongPx, kanvas.height - offset);
           const potong = document.createElement("canvas");
           potong.width = kanvas.width;
           potong.height = potongPx;
           potong.getContext("2d").drawImage(
             kanvas, 0, offset, kanvas.width, potongPx, 0, 0, kanvas.width, potongPx);
   
           if (!halamanPertama) pdf.addPage();
           pdf.addImage(potong.toDataURL("image/jpeg", 0.95), "JPEG",
             margin, margin, lebarHalaman, potongPx / pxPerMM);
   
           offset += potongPx;
           halamanPertama = false;
         }
       }
   
       pdf.save(namaFile("pdf"));
       toast("PDF tersimpan.");
       el.btnPdf.disabled = false;
       el.btnPdf.textContent = labelLama;
     }).catch(function (err) {
       console.error(err);
       toast("PDF gagal dibuat. Coba lagi.");
       el.btnPdf.disabled = false;
       el.btnPdf.textContent = labelLama;
     });
   }
   
   
   /* =========================================================================
      BAGIAN 6 — EVENT & INISIALISASI
      ========================================================================= */
   
   // Tab jadwal: klik + panah kiri/kanan
   el.tabs.addEventListener("click", function (event) {
     const tombol = event.target.closest(".tab");
     if (tombol) pilihJadwal(tombol.dataset.jadwal, true);
   });
   
   el.tabs.addEventListener("keydown", function (event) {
     if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
     event.preventDefault();
     const posisi = daftarJadwal.findIndex(function (j) { return j.id === jadwalAktif; });
     const arah = event.key === "ArrowRight" ? 1 : -1;
     const berikutnya = (posisi + arah + daftarJadwal.length) % daftarJadwal.length;
     pilihJadwal(daftarJadwal[berikutnya].id, true);
     el.tabs.querySelector('[aria-selected="true"]').focus();
   });
   
   // Ketuk satu hari untuk mengedit
   el.dayList.addEventListener("click", function (event) {
     const kartu = event.target.closest(".day-card");
     if (kartu) bukaEditHari(jadwalAktif, kartu.dataset.hari);
   });
   
   // Interaksi di dalam sheet
   el.sheetBody.addEventListener("click", function (event) {
     const chip = event.target.closest(".name-chip");
     const preset = event.target.closest(".ket-preset");
   
     if (chip && chip.closest("#grid-nama")) toggleNamaEditor(chip.dataset.nama);
     if (chip && chip.closest("#grid-saya")) {
       setNamaSaya(chip.getAttribute("aria-pressed") === "true" ? "" : chip.dataset.nama);
     }
     if (preset) {
       const input = document.getElementById("input-ket");
       if (input) {
         input.value = (input.value.trim() === preset.dataset.preset) ? "" : preset.dataset.preset;
         input.focus();
       }
     }
   });
   
   el.sheetFoot.addEventListener("click", function (event) {
     const id = event.target.id;
     if (id === "sheet-simpan") simpanEditHari();
     if (id === "sheet-kosongkan") {
       editKonteks.terpilih = [];
       const input = document.getElementById("input-ket");
       if (input) input.value = "";
       simpanEditHari();
     }
     if (id === "hapus-saya") setNamaSaya("");
     if (id === "reset-ya") jalankanReset();
     if (id === "reset-batal") tutupSheet();
   });
   
   el.sheetClose.addEventListener("click", tutupSheet);
   el.sheetScrim.addEventListener("click", tutupSheet);
   
   document.addEventListener("keydown", function (event) {
     if (event.key === "Escape" && !el.sheetRoot.hidden) tutupSheet();
   });
   
   // Tombol utama
   el.btnSaya.addEventListener("click", bukaPilihNama);
   el.btnBagikan.addEventListener("click", bagikanGambar);
   el.btnPdf.addEventListener("click", unduhPDF);
   el.btnPrint.addEventListener("click", function () { window.print(); });
   el.btnReset.addEventListener("click", bukaKonfirmasiReset);
   
   // Kalau aplikasi dibuka semalaman, hari ini ikut diperbarui saat kembali aktif.
   let hariTerakhir = hariIni();
   document.addEventListener("visibilitychange", function () {
     if (document.visibilityState !== "visible") return;
     if (hariIni() === hariTerakhir) return;
     hariTerakhir = hariIni();
     renderHariIni();
     renderDaftarHari();
   });
   
   function init() {
     muatJadwalTersimpan();
     el.brandDesa.textContent = NAMA_POSKO;
     el.jumlah.textContent = anggotaKKN.length;
     renderTombolSaya();
     renderHariIni();
     renderTabs();
     renderDaftarHari();
     siapkanKartuExport();
   }
   
   init();