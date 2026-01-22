import { getAllUserProducts } from '../../actions/products/getAllProducts.action';
import DashboardChild from './DashboardChild';

export default async function Dashboard() {
  const product = await getAllUserProducts();

  return (
    <div className="w-screen h-md  flex flex-col justify-center items-center gap-5 p-3">
      <div className="grid w-full md:grid-cols-2 lg:grid-cols-3 ">
        {product?.data.map((prod) => (
          <DashboardChild key={prod.id} prod={prod} />
        ))}
      </div>
    </div>
  );
}
