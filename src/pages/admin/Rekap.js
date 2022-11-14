function Rekap() {
  let rekap = localStorage.getItem("rekap") ? JSON.parse(localStorage.getItem("rekap")) : "No Data";

  const totalPrice = () => {
    let count = 0;
    for (let i = 0; i < rekap.length; i++) {
      const total = rekap[i].quantity * rekap[i].price;
        count += total;
    }
    return count.toFixed(2);
  };
    
    return (
      <div className="mt-20">
        <table className="table-auto border-2 border-darkgreen mx-auto">
          <thead className="border-2 border-darkgreen">
            <tr>
              <th className="text-left px-6 py-4 mr-4">Product</th>
              <th className="px-8">Harga</th>
              <th className="px-6">Terjual</th>
              <th className="px-6">Pendapatan</th>
            </tr>
          </thead>
          <tbody>
            {rekap.map((item) => (
              <tr key={item.title}>
                <td className="text-left py-4 px-6 font-semibold">{item.title}</td>
                <td className="p-4 font-semibold">{item.price}</td>
                <td className="p-4 font-semibold">{item.quantity}</td>
                <td className="p-4 font-semibold">{(item.price * item.quantity).toFixed(2)}</td>
              </tr>                  
            ))}
            <tr className="border-2 border-darkgreen">
              <td className="font-bold py-2 text-right">Total Pendapatan</td>
              <td></td>
              <td></td>
              <td className="font-bold py-2">{totalPrice()}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
}

export default Rekap;