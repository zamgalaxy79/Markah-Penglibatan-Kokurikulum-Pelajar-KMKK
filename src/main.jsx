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

  useEffect(() => {
    localStorage.setItem('koko_data', JSON.stringify(muridList));
  }, [muridList]);

  const handleSimpan = (e) => {
    e.preventDefault();
    if (!form.nama) return alert('Sila isi nama murid');
    setMuridList([...muridList, { ...form, id: Date.now().toString() }]);
    setForm({ nama: '', noKp: '', kelas: '', unit: '', markahUnit: '', kelab: '', markahKelab: '', sukan: '', markahSukan: '', ekstra: '' });
  };

  const kiraGred = (m) => {
    const u = Number(m.markahUnit) || 0;
    const k = Number(m.markahKelab) || 0;
    const s = Number(m.markahSukan) || 0;
    const e = Number(m.ekstra) || 0;
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
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto 15px auto', display: 'flex', justifyContent: 'space-between' }}>
          <button onClick={() => setSelectedMurid(null)} style={{ padding: '8px 15px', cursor: 'pointer' }}>Kembali</button>
          <button onClick={() => window.print()} style={{ padding: '8px 15px', background: '#2563eb', color: '#fff', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Cetak Sijil</button>
        </div>
        <div style={{ maxWidth: '800px', margin: '0 auto', background: '#fff', padding: '40px', border: '8px double #b45309', textAlign: 'center' }}>
          <h2 style={{ color: '#1e3a8a', textDecoration: 'underline' }}>SIJIL PENGHARGAAN KOKURIKULUM</h2>
          <p>Dengan ini diperakui bahawa</p>
          <h1 style={{ margin: '15px 0' }}>{selectedMurid.nama.toUpperCase()}</h1>
          <p>No. KP: {selectedMurid.noKp} | Kelas: {selectedMurid.kelas}</p>
          <div style={{ margin: '20px auto', maxWidth: '450px', textAlign: 'left', background: '#f9fafb', padding: '15px', border: '1px solid #ddd' }}>
            <p><strong>Unit Beruniform:</strong> {selectedMurid.unit} ({selectedMurid.markahUnit || 0}m)</p>
            <p><strong>Kelab / Persatuan:</strong> {selectedMurid.kelab} ({selectedMurid.markahKelab || 0}m)</p>
            <p><strong>Sukan / Permainan:</strong> {selectedMurid.sukan} ({selectedMurid.markahSukan || 0}m)</p>
            <p><strong>Ekstra:</strong> +{selectedMurid.ekstra || 0} markah</p>
            <hr />
            <h3 style={{ color: '#1e3a8a' }}>Keputusan: {jumlah}% (Gred {gred})</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '800px', margin: '30px auto', fontFamily: 'Arial, sans-serif', padding: '0 15px' }}>
      <h2>Sistem Markah & Sijil Kokurikulum</h2>
      <form onSubmit={handleSimpan} style={{ background: '#fff', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
        <p><strong>Daftar Murid Baharu:</strong></p>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <input placeholder="Nama Penuh" value={form.nama} onChange={e => setForm({...form, nama: e.target.value})} required style={{ padding: '6px' }} />
          <input placeholder="No. KP (cth: 080101-02-1234)" value={form.noKp} onChange={e => setForm({...form, noKp: e.target.value})} style={{ padding: '6px' }} />
          <input placeholder="Kelas" value={form.kelas} onChange={e => setForm({...form, kelas: e.target.value})} style={{ padding: '6px' }} />
          <input placeholder="Unit Beruniform" value={form.unit} onChange={e => setForm({...form, unit: e.target.value})} style={{ padding: '6px' }} />
          <input type="number" placeholder="Markah Unit (0-100)" value={form.markahUnit} onChange={e => setForm({...form, markahUnit: e.target.value})} style={{ padding: '6px' }} />
          <input placeholder="Kelab/Persatuan" value={form.kelab} onChange={e => setForm({...form, kelab: e.target.value})} style={{ padding: '6px' }} />
          <input type="number" placeholder="Markah Kelab (0-100)" value={form.markahKelab} onChange={e => setForm({...form, markahKelab: e.target.value})} style={{ padding: '6px' }} />
          <input placeholder="Sukan/Permainan" value={form.sukan} onChange={e => setForm({...form, sukan: e.target.value})} style={{ padding: '6px' }} />
          <input type="number" placeholder="Markah Sukan (0-100)" value={form.markahSukan} onChange={e => setForm({...form, markahSukan: e.target.value})} style={{ padding: '6px' }} />
          <input type="number" placeholder="Ekstra (0-10)" value={form.ekstra} onChange={e => setForm({...form, ekstra: e.target.value})} style={{ padding: '6px' }} />
        </div>
        <button type="submit" style={{ marginTop: '10px', padding: '8px 15px', background: '#059669', color: '#fff', border: 'none', cursor: 'pointer' }}>Simpan Rekod</button>
      </form>

      <h3 style={{ marginTop: '25px' }}>Senarai Murid</h3>
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderColor: '#eee' }}>
        <thead>
          <tr style={{ background: '#f8fafc' }}>
            <th>Nama</th>
            <th>No. KP</th>
            <th>Kelas</th>
            <th>Gred</th>
            <th>Tindakan</th>
          </tr>
        </thead>
        <tbody>
          {muridList.map(m => (
            <tr key={m.id}>
              <td>{m.nama}</td>
              <td>{m.noKp}</td>
              <td>{m.kelas}</td>
              <td>{kiraGred(m).gred}</td>
              <td>
                <button onClick={() => setSelectedMurid(m)} style={{ marginRight: '5px', background: '#2563eb', color: '#fff', border: 'none', padding: '4px 8px', cursor: 'pointer' }}>Cetak Sijil</button>
                <button onClick={() => setMuridList(muridList.filter(x => x.id !== m.id))} style={{ background: '#dc2626', color: '#fff', border: 'none', padding: '4px 8px', cursor: 'pointer' }}>Padam</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
