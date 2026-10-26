import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { Award, Printer, Plus, Trash2, ArrowLeft } from 'lucide-react';

function App() {
  const [muridList, setMuridList] = useState(() => {
    const saved = localStorage.getItem('koko_data');
    return saved ? JSON.parse(saved) : [
      { id: '1', nama: 'AHMAD AMIN BIN ROSLI', noKp: '080512-02-1234', kelas: '5 ARIF', unit: 'Kadet Remaja Sekolah', markahUnit: 88, kelab: 'Kelab Robotik', markahKelab: 82, sukan: 'Bola Sepak', markahSukan: 75, ekstra: 8 }
    ];
  });

  const [form, setForm] = useState({ nama: '', noKp: '', kelas: '', unit: '', markahUnit: '', kelab: '', markahKelab: '', sukan: '', markahSukan: '', ekstra: '' });
  const [selectedMurid, setSelectedMurid] = useState(null);

  // LOGO TUNGGAL DI TENGAH (Logo Rasmi Jata Malaysia / KPM)
  const logoKpmTengah = "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/07/Logo_KMKK_Berbingkai.png/960px-Logo_KMKK_Berbingkai.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20220223050841";

  useEffect(() => {
    localStorage.setItem('koko_data', JSON.stringify(muridList));
  }, [muridList]);

  const handleSimpan = (e) => {
    e.preventDefault();
    if (!form.nama) return alert('Sila isi nama murid terlebih dahulu');
    setMuridList([...muridList, { ...form, id: Date.now().toString() }]);
    setForm({ nama: '', noKp: '', kelas: '', unit: '', markahUnit: '', kelab: '', markahKelab: '', sukan: '', markahSukan: '', ekstra: '' });
  };

  const kiraGred = (m) => {
    const u = Math.min(100, Math.max(0, Number(m.markahUnit) || 0));
    const k = Math.min(100, Math.max(0, Number(m.markahKelab) || 0));
    const s = Math.min(100, Math.max(0, Number(m.markahSukan) || 0));
    const e = Math.min(10, Math.max(0, Number(m.ekstra) || 0));
    const sorted = [u, k, s].sort((a, b) => b - a);
    const purata = (sorted[0] + sorted[1]) / 2;
    const jumlah = Math.min(100, purata + e);
    let gred = 'E';
    if (jumlah >= 80) gred = 'A';
    else if (jumlah >= 60) gred = 'B';
    else if (jumlah >= 40) gred = 'C';
    else if (jumlah >= 20) gred = 'D';
    return { jumlah: jumlah.toFixed(1), gred };
  };

  if (selectedMurid) {
    const { jumlah, gred } = kiraGred(selectedMurid);
    return (
      <div style={{ padding: '20px', fontFamily: 'Georgia, serif', backgroundColor: '#f3f4f6', minHeight: '100vh' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto 15px auto', display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={() => setSelectedMurid(null)} style={{ padding: '8px 16px', cursor: 'pointer', background: '#4b5563', color: '#fff', border: 'none', borderRadius: '4px' }}>
            Kembali
          </button>
          <button onClick={() => window.print()} style={{ padding: '8px 20px', background: '#2563eb', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px' }}>
            Cetak Sijil (PDF)
          </button>
        </div>

        {/* BAHAGIAN SIJIL (A4 LANDSKAP) */}
        <div style={{
          maxWidth: '900px',
          margin: '0 auto',
          background: '#fff',
          padding: '45px 55px',
          border: '14px double #b45309',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          textAlign: 'center',
          boxSizing: 'border-box'
        }}>
          {/* BAHAGIAN 1 LOGO DI TENGAH & NAMA SEKOLAH */}
          <div style={{ borderBottom: '2px solid #b45309', paddingBottom: '15px', marginBottom: '20px' }}>
            <img 
              src={logoKpmTengah} 
              alt="Logo KPM" 
              style={{ height: '75px', objectFit: 'contain', margin: '0 auto 10px auto', display: 'block' }} 
            />
            <h4 style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '2px', color: '#4b5563', fontSize: '13px' }}>
              Kementerian Pendidikan
            </h4>
            <h2 style={{ margin: '5px 0 0 0', color: '#1e3a8a', fontSize: '20px' }}>
              KOLEJ MATRIKULASI KEJURUTERAAN KEDAH
            </h2>
          </div>

          <h1 style={{ color: '#b45309', fontSize: '26px', margin: '15px 0 5px 0', letterSpacing: '1px' }}>
            SIJIL PENGHARGAAN KOKURIKULUM
          </h1>
          <p style={{ fontStyle: 'italic', color: '#6b7280', margin: '0 0 15px 0' }}>
            Dengan ini diperakui dan disahkan bahawa
          </p>

          <h2 style={{ fontSize: '24px', color: '#111827', textDecoration: 'underline', margin: '10px 0' }}>
            {selectedMurid.nama.toUpperCase()}
          </h2>
          <p style={{ margin: '5px 0 20px 0', fontSize: '15px', color: '#374151' }}>
            No. Kad Pengenalan: <strong>{selectedMurid.noKp}</strong> &nbsp;|&nbsp; Tingkatan / Kelas: <strong>{selectedMurid.kelas}</strong>
          </p>

          <p style={{ fontSize: '14px', color: '#4b5563' }}>
            Telah mencapai prestasi seperti berikut dalam aktiviti kokurikulum:
          </p>

          {/* JADUAL MARKAH */}
          <div style={{ maxWidth: '650px', margin: '15px auto', background: '#fafafa', border: '1px solid #e5e7eb', borderRadius: '6px', padding: '12px 20px' }}>
            <table style={{ width: '100%', fontSize: '14px', textAlign: 'left', borderCollapse: 'collapse' }}>
              <tbody>
                <tr style={{ borderBottom: '1px dashed #e5e7eb' }}>
                  <td style={{ padding: '6px 0' }}><strong>1. Badan Beruniform:</strong></td>
                  <td style={{ padding: '6px 0' }}>{selectedMurid.unit || '-'}</td>
                  <td style={{ padding: '6px 0', textAlign: 'right' }}><strong>{selectedMurid.markahUnit || 0} markah</strong></td>
                </tr>
                <tr style={{ borderBottom: '1px dashed #e5e7eb' }}>
                  <td style={{ padding: '6px 0' }}><strong>2. Kelab & Persatuan:</strong></td>
                  <td style={{ padding: '6px 0' }}>{selectedMurid.kelab || '-'}</td>
                  <td style={{ padding: '6px 0', textAlign: 'right' }}><strong>{selectedMurid.markahKelab || 0} markah</strong></td>
                </tr>
                <tr style={{ borderBottom: '1px dashed #e5e7eb' }}>
                  <td style={{ padding: '6px 0' }}><strong>3. Sukan & Permainan:</strong></td>
                  <td style={{ padding: '6px 0' }}>{selectedMurid.sukan || '-'}</td>
                  <td style={{ padding: '6px 0', textAlign: 'right' }}><strong>{selectedMurid.markahSukan || 0} markah</strong></td>
                </tr>
                <tr>
                  <td style={{ padding: '6px 0' }}><strong>4. Ekstra Kurikulum:</strong></td>
                  <td style={{ padding: '6px 0' }}>-</td>
                  <td style={{ padding: '6px 0', textAlign: 'right' }}><strong>+{selectedMurid.ekstra || 0} markah</strong></td>
                </tr>
              </tbody>
            </table>

            <div style={{ marginTop: '12px', borderTop: '2px solid #b45309', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '15px', fontWeight: 'bold', color: '#1e3a8a' }}>GRED KESELURUHAN (PAJSK):</span>
              <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#b45309' }}>{jumlah}% (GRED {gred})</span>
            </div>
          </div>

          {/* RUANGAN TANDATANGAN */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '45px', padding: '0 40px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '190px', borderBottom: '1px solid #111', marginBottom: '6px' }}></div>
              <p style={{ margin: 0, fontSize: '13px', fontWeight: 'bold' }}>PENOLONG KANAN KOKURIKULUM</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Tarikh: {new Date().toLocaleDateString('ms-MY')}</p>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '190px', borderBottom: '1px solid #111', marginBottom: '6px' }}></div>
              <p style={{ margin: 0, fontSize: '13px', fontWeight: 'bold' }}>PENGETUA / GURU BESAR</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>SMK Contoh</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '850px', margin: '30px auto', fontFamily: 'Arial, sans-serif', padding: '0 15px' }}>
      <h2 style={{ color: '#1e3a8a' }}>Sistem Markah & Sijil Kokurikulum</h2>
      
      {/* BORANG DAFTAR */}
      <form onSubmit={handleSimpan} style={{ background: '#fff', padding: '20px', border: '1px solid #ddd', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <p style={{ margin: '0 0 10px 0', fontWeight: 'bold' }}>Daftar Murid Baharu:</p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <input placeholder="Nama Penuh Pelajar" value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} required style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
          <input placeholder="No. KP (cth: 080101-02-1234)" value={form.noKp} onChange={e => setForm({...form, noKp: e.target.value})} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
          <input placeholder="Tutorial" value={form.kelas} onChange={e => setForm({...form, kelas: e.target.value})} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
          <input placeholder="Badan Beruniform" value={form.unit} onChange={e => setForm({...form, unit: e.target.value})} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
          <input type="number" min="0" max="100" placeholder="Markah Unit (0-100)" value={form.markahUnit} onChange={e => setForm({...form, markahUnit: e.target.value})} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
          <input placeholder="Kelab / Persatuan" value={form.kelab} onChange={e => setForm({...form, kelab: e.target.value})} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
          <input type="number" min="0" max="100" placeholder="Markah Kelab (0-100)" value={form.markahKelab} onChange={e => setForm({...form, markahKelab: e.target.value})} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
          <input placeholder="Sukan / Permainan" value={form.sukan} onChange={e => setForm({...form, sukan: e.target.value})} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
          <input type="number" min="0" max="100" placeholder="Markah Sukan (0-100)" value={form.markahSukan} onChange={e => setForm({...form, markahSukan: e.target.value})} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
          <input type="number" min="0" max="100" placeholder="Ekstra Kurikulum (0-10)" value={form.ekstra} onChange={e => setForm({...form, ekstra: e.target.value})} style={{ padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }} />
        </div>
        <button type="submit" style={{ marginTop: '12px', padding: '10px 18px', background: '#059669', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
          Simpan Rekod Pelajar
        </button>
      </form>

      {/* SENARAI MURID */}
      <h3 style={{ marginTop: '30px', color: '#374151' }}>Senarai Rekod Pelajar</h3>
      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderColor: '#e5e7eb' }}>
        <thead>
          <tr style={{ background: '#f8fafc', textAlign: 'left' }}>
            <th>Nama</th>
            <th>No. KP</th>
            <th>Tutorial</th>
            <th>Gred</th>
            <th style={{ textAlign: 'center' }}>Tindakan</th>
          </tr>
        </thead>
        <tbody>
          {muridList.map(m => (
            <tr key={m.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
              <td><strong>{m.nama}</strong></td>
              <td>{m.noKp}</td>
              <td>{m.kelas}</td>
              <td><strong>{kiraGred(m).gred}</strong></td>
              <td style={{ textAlign: 'center' }}>
                <button onClick={() => setSelectedMurid(m)} style={{ marginRight: '8px', background: '#2563eb', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer' }}>
                  Cetak Sijil
                </button>
                <button onClick={() => setMuridList(muridList.filter(x => x.id !== m.id))} style={{ background: '#dc2626', color: '#fff', border: 'none', padding: '6px 10px', borderRadius: '4px', cursor: 'pointer' }}>
                  Padam
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
