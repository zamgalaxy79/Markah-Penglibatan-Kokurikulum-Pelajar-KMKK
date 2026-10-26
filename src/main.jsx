import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

function App() {
  const defaultData = [
    { id: '1', nama: 'AHMAD AMIN BIN ROSLI', noKp: '080512-02-1234', kelas: 'K1P1', unit: 'Kadet Remaja Sekolah', markahUnit: 88, kelab: 'Kelab Robotik', markahKelab: 82, sukan: 'Bola Sepak', markahSukan: 75, ekstra: 8 }
  ];

  const [muridList, setMuridList] = useState(() => {
    try {
      const saved = localStorage.getItem('koko_kmkk_data_v2');
      return saved ? JSON.parse(saved) : defaultData;
    } catch {
      return defaultData;
    }
  });

  const [form, setForm] = useState({ 
    nama: '', noKp: '', kelas: '', unit: '', markahUnit: '', kelab: '', markahKelab: '', sukan: '', markahSukan: '', ekstra: '' 
  });
  
  const [selectedMurid, setSelectedMurid] = useState(null);
  const [editId, setEditId] = useState(null);

  // Logo KMKK Berbingkai di bahagian tengah
  const logoKpmTengah = "https://thumb.wikimedia.org/wikipedia/commons/thumb/0/07/Logo_KMKK_Berbingkai.png/960px-Logo_KMKK_Berbingkai.png?utm_source=commons.wikimedia.org&utm_campaign=index&utm_content=thumbnail&_=20220223050841";

  useEffect(() => {
    localStorage.setItem('koko_kmkk_data_v2', JSON.stringify(muridList));
  }, [muridList]);

  const handleSimpan = (e) => {
    e.preventDefault();
    if (!form.nama.trim()) return alert('Sila isi nama pelajar terlebih dahulu');

    if (editId) {
      setMuridList(muridList.map(item => item.id === editId ? { ...form, id: editId } : item));
      setEditId(null);
    } else {
      setMuridList([...muridList, { ...form, id: Date.now().toString() }]);
    }

    setForm({ nama: '', noKp: '', kelas: '', unit: '', markahUnit: '', kelab: '', markahKelab: '', sukan: '', markahSukan: '', ekstra: '' });
  };

  const handleEdit = (m) => {
    setForm(m);
    setEditId(m.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBatalEdit = () => {
    setEditId(null);
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
        <style dangerouslySetInnerHTML={{__html: `
          @media print {
            body { background: #fff !important; margin: 0 !important; }
            .no-print { display: none !important; }
            .print-certificate {
              border: 12px double #b45309 !important;
              box-shadow: none !important;
              width: 100% !important;
              max-width: 100% !important;
              padding: 30px !important;
              page-break-after: avoid !important;
            }
          }
        `}} />

        <div className="no-print" style={{ maxWidth: '900px', margin: '0 auto 15px auto', display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={() => setSelectedMurid(null)} style={{ padding: '8px 18px', cursor: 'pointer', background: '#4b5563', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold' }}>
            ← Kembali
          </button>
          <button onClick={() => window.print()} style={{ padding: '8px 24px', background: '#2563eb', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold', borderRadius: '4px' }}>
            🖨️ Cetak Sijil (PDF)
          </button>
        </div>

        {/* SIJIL RASMI (A4 LANDSKAP) */}
        <div className="print-certificate" style={{
          maxWidth: '900px',
          margin: '0 auto',
          background: '#fff',
          padding: '45px 55px',
          border: '14px double #b45309',
          boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
          textAlign: 'center',
          boxSizing: 'border-box'
        }}>
          {/* LOGO DI TENGAH */}
          <div style={{ borderBottom: '2px solid #b45309', paddingBottom: '15px', marginBottom: '20px' }}>
            <img 
              src={logoKpmTengah} 
              alt="Logo KMKK" 
              style={{ height: '80px', objectFit: 'contain', margin: '0 auto 10px auto', display: 'block' }} 
            />
            <h4 style={{ margin: 0, textTransform: 'uppercase', letterSpacing: '2px', color: '#4b5563', fontSize: '13px' }}>
              KEMENTERIAN PENDIDIKAN MALAYSIA
            </h4>
            <h2 style={{ margin: '5px 0 0 0', color: '#1e3a8a', fontSize: '22px', fontWeight: 'bold' }}>
              KOLEJ MATRIKULASI KEJURUTERAAN KEDAH
            </h2>
          </div>

          <h1 style={{ color: '#b45309', fontSize: '26px', margin: '15px 0 5px 0', letterSpacing: '1px' }}>
            SIJIL PENGHARGAAN KOKURIKULUM
          </h1>
          <p style={{ fontStyle: 'italic', color: '#6b7280', margin: '0 0 15px 0', fontSize: '15px' }}>
            Dengan ini diperakui dan disahkan bahawa
          </p>

          <h2 style={{ fontSize: '24px', color: '#111827', textDecoration: 'underline', margin: '10px 0' }}>
            {selectedMurid.nama.toUpperCase()}
          </h2>
          <p style={{ margin: '5px 0 20px 0', fontSize: '15px', color: '#374151' }}>
            No. Kad Pengenalan: <strong>{selectedMurid.noKp || '-'}</strong> &nbsp;|&nbsp; Tutorial: <strong>{selectedMurid.kelas || '-'}</strong>
          </p>

          <p style={{ fontSize: '14px', color: '#4b5563' }}>
            Telah mencapai prestasi seperti berikut dalam aktiviti kokurikulum:
          </p>

          {/* JADUAL PERINCIAN MARKAH */}
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
              <p style={{ margin: 0, fontSize: '13px', fontWeight: 'bold' }}>PENGARAH / PENGETUA</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#6b7280' }}>Kolej Matrikulasi Kejuruteraan Kedah</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '850px', margin: '30px auto', fontFamily: 'Arial, sans-serif', padding: '0 15px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-
